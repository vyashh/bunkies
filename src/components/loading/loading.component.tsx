import "./loading.styles.scss";
import LoadingIndicator from "../../assets/puff.svg";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <img src={LoadingIndicator} alt="Loading" />
    </div>
  );
};

export default Loading;
