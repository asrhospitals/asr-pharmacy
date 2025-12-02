import Input from "./Input";
import Select from "./Select";

const TextField = ({
  label,
  name,
  required = false,
  message = "",
  type = "text",
  register,
  errors,
  noHeight,
  className,
  noStyle,
  validation = {},
  step,
  min,
  max
}) => {
  const registerOptions = {
    ...validation,
    ...(required && { required: message })
  };

  return (
    <div>
      <label className="block font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        className={`${noHeight ? "" : "h-8"} ${noStyle ? "" : "w-full text-xs"} ${className}`}
        type={type}
        step={step}
        min={min}
        max={max}
        {...register(name, registerOptions)}
      />
      {errors[name] && (
        <span className="text-xs text-red-500">{errors[name]?.message}</span>
      )}
    </div>
  );
};

const SelectField = ({ label, name, options, register, noHeight }) => (
  <div>
    {label && <label className="block font-medium mb-1">{label}</label>}
    <Select
      noPadding
      className={`${noHeight ? "" : "h-8"} w-full text-xs`}
      {...register(name)}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </Select>
  </div>
);

export { TextField, SelectField };
