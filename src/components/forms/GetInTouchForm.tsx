'use client';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';

import getInTouchFormSchema from '@/utils/schemas/getInTouchForm.validation';
import { Arrow } from '@/assets/icons/icons';
import Title from '../Title';
import TextInput from './TextInput';
import PillButton from '../ui/buttons/PillButton';
import CheckBox from './CheckBox';

type GetInTouchForm = {
  name: string;
  email: string;
  phone: string;
  description: string;
  agree: boolean;
};

type Field = {
  name: keyof GetInTouchForm;
  label: string;
  placeholder: string;
  as: 'input' | 'textArea';
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
  { name: 'description', label: 'description', placeholder: '', as: 'textarea' },
];

export default function GetInTouchForm() {
  const t = useTranslations('forms');
  const validationSchema = getInTouchFormSchema(useTranslations('errors'));

  const { control, handleSubmit, reset } = useForm<GetInTouchForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });
  const isAgree = useWatch({ control, name: 'agree' });

  function formSubmitHandler(values) {
    console.clear();
    console.log('values :>> ', values);
    reset();
  }

  return (
    <div className="wrapper flex flex-col">
      <Title tag="h2" styles="text-center">
        {t('get-in-touch.title')}
      </Title>
      <p className="mt-8 text-[20px] leading-[1.4] font-medium text-center">
        {t('get-in-touch.info-text')}
      </p>
      <form onSubmit={handleSubmit(formSubmitHandler)} className="mt-8">
        <ul className="flex flex-col gap-y-5 ">
          {formFields.map(({ name, label, placeholder, as }: Field) => (
            <li key={name}>
              <TextInput<GetInTouchForm>
                name={name}
                label={t(`get-in-touch.form-fields.${label}`)}
                placeholder={placeholder}
                as={as}
                control={control}
              />
            </li>
          ))}
        </ul>
        <p className="mt-5">{t('get-in-touch.required-fields-notice')}</p>
        <div>
          <CheckBox
            className="mt-5"
            control={control}
            name="agree"
            label={t('get-in-touch.consent-label')}
          />
        </div>
        <div className="flex w-full">
          <PillButton
            size="l"
            variant="secondary"
            icon={Arrow}
            iconProps={{ l: true }}
            buttonProps={{ type: 'submit' }}
            className="mt-8 mx-auto"
            disabled={!isAgree}
          >
            {t('get-in-touch.submit-btn-label')}
          </PillButton>
        </div>
      </form>
    </div>
  );
}
