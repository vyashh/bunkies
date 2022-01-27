import "./button.styles.scss";

interface Props {
  text: string;
  submit?: any;
}
const Button: React.FC<Props> = ({text, submit}) => {
  return (
    <div className="button" onClick={submit}>
      <h2>{text}</h2>
    </div>
  );
};

export default Button;
