import { PropsWithChildren } from 'react';

export type ButtonProps = {
  onClick?: () => void;
};
const Button = ({ onClick, children }: PropsWithChildren<ButtonProps>) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <button
      type="button"
      className="text-white bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
