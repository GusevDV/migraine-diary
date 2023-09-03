import { PropsWithChildren } from 'react';

export type CardGroupProps = {
  title: string;
  description?: string;
  formTemplateColumns: string; // Adjusted type for Tailwind
  className?: string;
};

const CardGroup = ({
  title,
  description,
  formTemplateColumns,
  children,
}: PropsWithChildren<CardGroupProps>) => {
  return (
    <div className={`bg-white border rounded-md p-4 shadow-sm`}>
      <h4 className={`text-md py-2 font-medium`}>{title}</h4>
      <div className="border-t my-2"></div>
      {description && <p className={`py-2 text-sm`}>{description}</p>}
      <div className={`grid gap-6 ${formTemplateColumns}`}>{children}</div>
    </div>
  );
};

export default CardGroup;
