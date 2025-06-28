import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { PHONE_REGEX } from '../constants';

type T = ReturnType<typeof useTranslations>;

export function contactFormSchema(t: T) {
  return Yup.object({
    name: Yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.min', { min: 3 }))
      .max(50, t('validation.max', { max: 50 })),
    email: Yup.string().required(t('validation.required')).email(t('validation.email')),
    phone: Yup.string()
      .nullable()
      .notRequired()
      .matches(PHONE_REGEX, { message: t('validation.phone'), excludeEmptyString: true }),
    description: Yup.string()
      .notRequired()
      // .transform((value) => (value === '' ? undefined : value))
      // .min(20, t('validation.min', { min: 20 }))
      .max(300, t('validation.max', { max: 300 })),
    agree: Yup.bool().required(t('validation.required')).oneOf([true], t('validation.agreement')),
  });
}
