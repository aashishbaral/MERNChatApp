import React from "react";

interface DottedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const DottedButton: React.FC<DottedButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      {...props}
      className="rounded-2xl border-2 border-dashed border-indigo-400 bg-white px-6 py-4 font-semibold uppercase text-indigo-500 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_indigo]  active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
    >
      {children}
    </button>
  );
};

export default DottedButton;
