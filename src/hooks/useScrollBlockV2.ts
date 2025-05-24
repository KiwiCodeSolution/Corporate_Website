import { useEffect } from 'react';

export function useScrollLockV2(isLocked: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!body || !html) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    if (isLocked) {
      html.style.overflow = 'hidden';
      html.style.position = 'relative';
      body.style.overflow = 'hidden';
      body.style.position = 'relative';
      body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
    } else {
      html.style.overflow = '';
      html.style.position = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.paddingRight = '';
    }

    return () => {
      html.style.overflow = '';
      html.style.position = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.paddingRight = '';
    };
  }, [isLocked]);
}
