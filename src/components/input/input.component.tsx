import "./input.styles.scss";

interface Props {
  label?: string;
  type: string;
  placeholder: string;
  center?: boolean;
  value?: string;
  setValue?: any;
}
const Input: React.FC<Props> = ({
  setValue,
  label,
  type,
  placeholder,
  value,
  center,
}) => {
  return (
    <div className="input">
      <p>{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={`${center && "center"}`}
        onChange={(e: any) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
