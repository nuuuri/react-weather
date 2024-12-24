import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', listener, { capture: true });

    return () => {
      document.removeEventListener('mousedown', listener, { capture: true });
    };
  }, [callback]);

  return ref;
};
