'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash/debounce';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ClockLoader } from 'react-spinners';

import { Arrow } from '@/assets/icons/icons';
import {
  createLocalStorageData,
  deserializeData,
  readLocalStorageData,
  removeLocalStorageData,
  serializeData,
} from '@/utils/local-storage-API';
import { ContactFormValues, contactFormSchema } from '@/utils/schemas/contactForm.validation';
import ContactFormSubmitErrorNotification from '../ContactFormSubmitErrorNotification';
import ContactFormSubmitSuccessNotification from '../ContactFormSubmitSuccessNotification';
import PillButton from '../ui/buttons/PillButton';
import CheckBox from './CheckBox';
import TextInput from './TextInput';

type Field = {
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  as: 'input' | 'textarea';
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
};

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  description: '',
  agree: false,
};

// the form only renders inside an opened modal, i.e. on the client
function readDraft(): ContactFormValues {
  const draft = readLocalStorageData('contactFormData');
  // consent must be given again in every session, never restored from storage
  return draft ? { ...defaultValues, ...deserializeData(draft), agree: false } : defaultValues;
}

const formFields: Field[] = [
  { name: 'name', label: 'name', placeholder: '', as: 'input', autoComplete: 'name' },
  {
    name: 'email',
    label: 'email',
    placeholder: '',
    as: 'input',
    type: 'email',
    autoComplete: 'email',
  },
  { name: 'phone', label: 'phone', placeholder: '', as: 'input', type: 'tel', autoComplete: 'tel' },
  { name: 'description', label: 'description', placeholder: '', as: 'textarea' },
];

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations('forms');
  const validationSchema = contactFormSchema(useTranslations('errors'));

  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const [initialValues] = useState(readDraft);

  const { control, handleSubmit, subscribe } = useForm<ContactFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const isAgree = useWatch({ control, name: 'agree' });

  useEffect(() => {
    const saveDraft = debounce((values: Partial<ContactFormValues>) => {
      createLocalStorageData(serializeData({ ...values, agree: false }), 'contactFormData');
    }, 500);

    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => saveDraft(values),
    });

    return () => {
      unsubscribe();
      saveDraft.cancel();
    };
  }, [subscribe]);

  useEffect(() => {
    if (status !== 'success') return;

    removeLocalStorageData('contactFormData');
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [status, onClose]);

  async function formSubmitHandler(values: ContactFormValues) {
    setStatus('pending');

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const isError = status === 'error';
  const isSuccess = status === 'success';

  return (
    <div className="flex flex-col items-center w-full max-w-[656px]">
      <h2 className="text-[32px] md:text-[36px] font-semibold text-center">
        {t('contact-form.title')}
      </h2>

      <p className="mt-5 text-[18px] text-center">{t('contact-form.info-text')}</p>

      <form
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
        className="mt-5 w-full flex flex-col"
      >
        <ul className="flex flex-col gap-y-5">
          {formFields.map(({ name, label, placeholder, as, type, autoComplete }) => (
            <li key={name}>
              <TextInput<ContactFormValues>
                name={name}
                label={t(`contact-form.form-fields.${label}`)}
                placeholder={placeholder}
                as={as}
                type={type}
                autoComplete={autoComplete}
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
  );
}
