type GenderCheckboxProps = {
  onCheckboxChange: (gender: string) => void;
  selectedGender: string;
};

const GenderCheckbox = ({
  onCheckboxChange,
  selectedGender,
}: GenderCheckboxProps) => {
  return (
    <div className="flex gap-4">
      {/* Male Checkbox */}
      <div className="form-control">
        <label
          className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border ${
            selectedGender === "male"
              ? "bg-blue-500 text-white border-blue-500"
              : "border-indigo-400"
          }`}
        >
          <input
            type="checkbox"
            className="hidden"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className="w-4 h-4 flex items-center justify-center border-2 border-white rounded-full">
            {selectedGender === "male" && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          <span className="label-text">Male</span>
        </label>
      </div>

      {/* Female Checkbox */}
      <div className="form-control">
        <label
          className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border ${
            selectedGender === "female"
              ? "bg-pink-500 text-white border-pink-500"
              : "border-indigo-400"
          }`}
        >
          <input
            type="checkbox"
            className="hidden"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className="w-4 h-4 flex items-center justify-center border-2 border-white rounded-full">
            {selectedGender === "female" && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          <span className="label-text">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
