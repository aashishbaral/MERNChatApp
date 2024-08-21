const InputWithLabel = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full ">
      <label className="text-indigo-500 block text-base font-semibold mb-1 ">
        {label}
      </label>
      {children}
    </div>
  );
};
export default InputWithLabel;
