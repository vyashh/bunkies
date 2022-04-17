import "./task-card.styles.scss";
import ChevronIcon from "../../assets/icons/chevron.svg";
import hexToRgba from "hex-to-rgba";

interface Props {
  week: number;
  member: string;
  title: string;
  color: string;
}

const TaskCard: React.FC<Props> = (props) => {
  const color = hexToRgba("#0000", 0.6);

  return (
    <div className="card" style={{ backgroundColor: props.color }}>
      <div className="card__week" style={{ backgroundColor: color }}>
        <p>
          Week <br />
          <span style={{ fontSize: "2em" }}> {props.week}</span>
        </p>
      </div>

      <div className="card__header">
        <h3 className="card__header--title">{props.title}</h3>
        <p className="card__header--assigned-to">{props.member}</p>
      </div>
      <div className="card__description">
        <div className="card__description--deadline">Deadline</div>
        <div className="card__description--deadline-info">7 days</div>
      </div>
    </div>
  );
};

export default TaskCard;
