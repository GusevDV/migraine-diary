import { ElementType, PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export type ButtonLinkProps =
  | {
      to: string;
    }
  | {
      href: string;
    };

function isInternalLinkProps(props: ButtonLinkProps): props is { to: string } {
  return 'to' in props;
}

const ButtonLink = (props: PropsWithChildren<ButtonLinkProps>) => {
  let linkProps: Partial<LinkProps> | { href: string } = {};

  if (isInternalLinkProps(props)) {
    linkProps = { to: props.to };
  } else {
    linkProps = { href: props.href };
  }

  const Component: ElementType = isInternalLinkProps(props) ? Link : 'a';

  return (
    <Component
      className="elative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      {...linkProps}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {props.children}
      </span>
    </Component>
  );
};

export default ButtonLink;
