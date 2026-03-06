import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}
const CardWrapper: FC<Props> = ({ children, title }) => {
  return (
    <div className="border rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold p-4 ">{title}</h2>
      <div className="border-t min-h-[500px]">{children}</div>
    </div>
  );
};

export default CardWrapper;
