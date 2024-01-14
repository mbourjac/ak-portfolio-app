import { Link } from 'react-router-dom';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import { portableTextValueSchema } from './portable-text.schemas';

type CustomPortableTextProps = {
  element?: keyof JSX.IntrinsicElements;
  value: unknown;
  className?: string;
};

export const CustomPortableText = ({
  element: Wrapper = 'p',
  value,
  className,
}: CustomPortableTextProps) => {
  const parsedValue = portableTextValueSchema.parse(value);

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <Wrapper className={className}>{children}</Wrapper>;
      },
    },
    marks: {
      sup: ({ children }) => <sup>{children}</sup>,
      color: ({
        value,
        children,
      }: PortableTextMarkComponentProps<
        TypedObject & {
          colorData: {
            value: string;
          };
        }
      >) => {
        if (!value?.colorData) return children;

        return <span style={{ color: value.colorData.value }}>{children}</span>;
      },
      externalLink: ({
        value,
        children,
      }: PortableTextMarkComponentProps<
        TypedObject & {
          href: string;
          blank: boolean;
        }
      >) => {
        if (!value?.href) return children;

        return (
          <a
            href={value.href}
            target={`${value?.blank ? '_blank' : '_self'}`}
            className="text-inherit"
          >
            {children}
          </a>
        );
      },
      internalLink: ({
        value,
        children,
      }: PortableTextMarkComponentProps<
        TypedObject & {
          slug: string;
        }
      >) => {
        if (!value?.slug) return children;

        return <Link to={value.slug}>{children}</Link>;
      },
    },
  };

  return <PortableText components={components} value={parsedValue} />;
};
