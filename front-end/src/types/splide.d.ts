declare module '@splidejs/react-splide' {
  import { ReactNode, ComponentType } from 'react';

  interface SplideProps {
    options?: Record<string, unknown>;
    className?: string;
    children?: ReactNode;
    [key: string]: unknown; 
  }

  interface SplideSlideProps {
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}