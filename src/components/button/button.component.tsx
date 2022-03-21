import { useContext } from "react";
import { Context } from "../../services/store";
import Loading from "../loading/loading.component";
import "./button.styles.scss";

interface Props {
  text: string;
  submit?: any;
  disabled?: boolean;
}
const Button: React.FC<Props> = ({ text, submit, disabled = false }) => {
  const { loadingIndicator } = useContext(Context);
  const [loading] = loadingIndicator;
  return (
    <div className="button" onClick={disabled ? null : submit}>
      {loading ? <Loading /> : <h2>{text}</h2>}
    </div>
  );
};

export default Button;
