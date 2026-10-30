import * as Yup from 'yup';
import type { useTranslations } from 'next-intl';
import { PHONE_REGEX } from '../constants';

type T = ReturnType<typeof useTranslations>;

// Shared by the form (with `t` for translated messages) and the API route (without `t`).
export function contactFormSchema(t?: T) {
  const msg = (key: string, values?: Record<string, number>) => (t ? t(key, values) : key);

  return Yup.object({
    name: Yup.string()
      .required(msg('validation.required'))
      .min(3, msg('validation.min', { min: 3 }))
      .max(50, msg('validation.max', { max: 50 })),
    email: Yup.string()
      .required(msg('validation.required'))
      .email(msg('validation.email'))
      .max(100, msg('validation.max', { max: 100 })),
    phone: Yup.string()
      .nullable()
      .notRequired()
      .matches(PHONE_REGEX, { message: msg('validation.phone'), excludeEmptyString: true }),
    description: Yup.string()
      .notRequired()
      .max(300, msg('validation.max', { max: 300 })),
    agree: Yup.bool()
      .required(msg('validation.required'))
      .oneOf([true], msg('validation.agreement')),
  });
}

export type ContactFormValues = Yup.InferType<ReturnType<typeof contactFormSchema>>;
