'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClockLoader } from 'react-spinners';

import { Arrow } from '@/assets/icons/icons';
import {
  createLocalStorageData,
  deserializeData,
  readLocalStorageData,
  removeLocalStorageData,
  serializeData,
} from '@/utils/local-storage-API';
import { contactFormSchema } from '@/utils/schemas/contactForm.validation';
import ContactFormSubmitErrorNotification from '../ContactFormSubmitErrorNotification';
import ContactFormSubmitSuccessNotification from '../ContactFormSubmitSuccessNotification';
import Loader from '../Loader';
import PillButton from '../ui/buttons/PillButton';
import CheckBox from './CheckBox';
import TextInput from './TextInput';

// ✅ залишаємо ЯВНИЙ тип (НЕ через yup)
type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  description: string;
  agree: boolean;
};

type Field = {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  as: 'input' | 'textarea';
};

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  description: '',
  agree: false,
};

const formFields: Field[] = [
  { name: 'name', label: 'name', placeholder: '', as: 'input' },
  { name: 'email', label: 'email', placeholder: '', as: 'input' },
  { name: 'phone', label: 'phone', placeholder: '', as: 'input' },
  { name: 'description', label: 'description', placeholder: '', as: 'textarea' },
];

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations('forms');
  const validationSchema = contactFormSchema(useTranslations('errors'));

  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const [isReady, setIsReady] = useState<boolean>(false);

  const { control, handleSubmit, reset, watch } = useForm<ContactFormValues>({
    defaultValues,
    shouldUnregister: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validationSchema) as any, // ✅ важливий фікс
    mode: 'onSubmit',
  });

  useEffect(() => {
    const tempFormData = readLocalStorageData('contactFormData');
    if (tempFormData) {
      reset(deserializeData(tempFormData));
    } else {
      createLocalStorageData(serializeData(defaultValues), 'contactFormData');
      reset(defaultValues);
    }
    setIsReady(true);
  }, [reset]);

  const isAgree = watch('agree');

  useEffect(() => {
    const debounceData = debounce((data: ContactFormValues) => {
      if (typeof window !== 'undefined') {
        createLocalStorageData(serializeData(data), 'contactFormData');
      }
    }, 500);

    const subscription = watch((data: ContactFormValues) => {
      debounceData(data);
    });

    return () => {
      subscription.unsubscribe();
      debounceData.cancel();
    };
  }, [watch]);

  async function formSubmitHandler(values: ContactFormValues) {
    setStatus('pending');

    const response = await fetch('api/send-contact', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus('error');
      return;
    }

    setStatus('success');

    setTimeout(() => {
      removeLocalStorageData('contactFormData');
      onClose();
    }, 3000);
  }

  const isError = status === 'error';
  const isSuccess = status === 'success';

  return isReady ? (
    <div className="flex flex-col items-center w-[656px]">
      <h2 className="text-[32px] md:text-[36px] font-semibold text-center">
        {t('contact-form.title')}
      </h2>

      <p className="mt-5 text-[18px] text-center">{t('contact-form.info-text')}</p>

      <form onSubmit={handleSubmit(formSubmitHandler)} className="mt-5 w-full flex flex-col">
        <ul className="flex flex-col gap-y-5">
          {formFields.map(({ name, label, placeholder, as }) => (
            <li key={name}>
              <TextInput<ContactFormValues>
                name={name}
                label={t(`contact-form.form-fields.${label}`)}
                placeholder={placeholder}
                as={as}
                control={control}
              />
            </li>
          ))}
        </ul>

        <CheckBox
          className="mt-4"
          control={control}
          name="agree"
          label={t('contact-form.consent-label')}
        />

        <PillButton
          size="l"
          variant="secondary"
          icon={Arrow}
          loader={ClockLoader}
          buttonProps={{ type: 'submit' }}
          className="mt-5"
          disabled={!isAgree || status === 'pending'}
          isLoading={status === 'pending'}
        >
          {t('contact-form.submit-btn-label')}
        </PillButton>
      </form>

      {isError && <ContactFormSubmitErrorNotification onClose={() => setStatus('idle')} />}
      {isSuccess && <ContactFormSubmitSuccessNotification onClose={onClose} />}
    </div>
  ) : (
    <Loader />
  );
}
