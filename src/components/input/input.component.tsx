import "./input.styles.scss";

interface Props {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  setValue?: any;
}
const Input: React.FC<Props> = ({
  setValue,
  label,
  type,
  placeholder,
  value,
}) => {
  return (
    <div className="input">
      <p>{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
