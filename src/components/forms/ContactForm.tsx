'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import debounce from 'lodash/debounce';
import { ClockLoader } from 'react-spinners';

import {
  createLocalStorageData,
  readLocalStorageData,
  removeLocalStorageData,
  serializeData,
  deserializeData,
} from '@/utils/local-storage-API';
import { contactFormSchema } from '@/utils/schemas/contactForm.validation';
import { Arrow } from '@/assets/icons/icons';
import TextInput from './TextInput';
import PillButton from '../ui/buttons/PillButton';
import CheckBox from './CheckBox';
import ContactFormSubmitSuccessNotification from '../ContactFormSubmitSuccessNotification';
import ContactFormSubmitErrorNotification from '../ContactFormSubmitErrorNotification';
import Loader from '../Loader';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  description: string;
  agree: boolean;
};

type Field = {
  name: keyof ContactForm;
  label: string;
  placeholder: string;
  as: 'input' | 'textarea';
};

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  description: '',
  agree: false,
};

const formFields = [
  { name: 'name', label: 'name', placeholder: '', as: 'input' },
  { name: 'email', label: 'email', placeholder: '', as: 'input' },
  { name: 'phone', label: 'phone', placeholder: '', as: 'input' },
  { name: 'description', label: 'description', placeholder: '', as: '' },
];

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations('forms');
  const validationSchema = contactFormSchema(useTranslations('errors'));
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const [isReady, setIsReady] = useState<boolean>(false);

  const { control, handleSubmit, reset, watch } = useForm<ContactForm>({
    defaultValues: defaultValues,
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
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
    const debounceData = debounce((data: ContactForm) => {
      if (typeof window !== 'undefined') {
        createLocalStorageData(serializeData(data), 'contactFormData');
      }
    }, 500);

    const subscription = watch((data: ContactForm) => {
      debounceData(data);
    });

    return () => {
      subscription.unsubscribe();
      debounceData.cancel();
    };
  }, [watch]);

  async function formSubmitHandler(values: ContactForm) {
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
    // reset(defaultValues);
    setTimeout(() => {
      removeLocalStorageData('contactFormData');
      onClose();
    }, 3000);
  }

  const isError = status === 'error';
  const isSuccess = status === 'success';

  return isReady ? (
    <div className="flex flex-col items-center w-[656px]">
      <h2 className="text-[32px] md:text-[40px] leading-[1.2] xl:leading-[1.4] font-semibold text-center">
        {t('contact-form.title')}
      </h2>
      <p className="mt-5 md:mt-6 text-[18px] leading-[1.4] font-medium text-center">
        {t('contact-form.info-text')}
      </p>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="mt-5 md:mt-6 w-full flex flex-col"
      >
        <ul className="flex flex-col gap-y-5 ">
          {formFields.map(({ name, label, placeholder, as }: Field) => (
            <li key={name} className="w-full">
              <TextInput<ContactForm>
                name={name}
                label={t(`contact-form.form-fields.${label}`)}
                placeholder={placeholder}
                as={as}
                control={control}
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[16px] leading-[1.35] font-medium">
          {t('contact-form.required-fields-notice')}
        </p>
        <div>
          <CheckBox
            className="mt-4"
            control={control}
            name="agree"
            label={t('contact-form.consent-label')}
          />
        </div>
        <PillButton
          size="l"
          variant="secondary"
          icon={Arrow}
          loader={ClockLoader}
          iconProps={{ l: true }}
          buttonProps={{ type: 'submit' }}
          className="mt-8 md:mx-auto"
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
