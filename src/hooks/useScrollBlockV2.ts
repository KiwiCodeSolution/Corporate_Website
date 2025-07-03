import { useCallback } from 'react';

let scrollBlockCounter = 0;

export function useScrollLockV2() {
  const blockScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    if (scrollBlockCounter === 0) {
      html.style.overflow = 'hidden';
      html.style.position = 'relative';
      body.style.overflow = 'hidden';
      body.style.position = 'relative';
      body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
    }

    scrollBlockCounter += 1;
  }, []);

  const unBlockScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    scrollBlockCounter = Math.max(0, scrollBlockCounter - 1);
    if (scrollBlockCounter === 0) {
      const html = document.documentElement;
      const body = document.body;

      html.style.overflow = '';
      html.style.position = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.paddingRight = '';
    }
  }, []);

  return [blockScroll, unBlockScroll];
}

// export function useScrollLockV2(isLocked: boolean) {
//   useEffect(() => {
//     const html = document.documentElement;
//     const body = document.body;

//     if (!body || !html) return;

//     const scrollBarWidth = window.innerWidth - html.clientWidth;
//     const bodyPaddingRight =
//       parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

//     if (isLocked) {
//       html.style.overflow = 'hidden';
//       html.style.position = 'relative';
//       body.style.overflow = 'hidden';
//       body.style.position = 'relative';
//       body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
//     } else {
//       html.style.overflow = '';
//       html.style.position = '';
//       body.style.overflow = '';
//       body.style.position = '';
//       body.style.paddingRight = '';
//     }

//     return () => {
//       html.style.overflow = '';
//       html.style.position = '';
//       body.style.overflow = '';
//       body.style.position = '';
//       body.style.paddingRight = '';
//     };
//   }, [isLocked]);
// }
