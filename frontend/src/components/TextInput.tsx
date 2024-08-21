import React, { forwardRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="text-p">{label}</label>}
      <input
        ref={ref}
        {...props}
        className="placeholder:px-2 placeholder:text-slate-400 w-full outline-none px-4 py-3 rounded-xl border border-slate-300"
      />
    </div>
  )
);

TextInput.displayName = "TextInput";

export default TextInput;
