import "./task-card.styles.scss";
import ToiletIcon from "../../assets/icons/toilet.svg";
import ChevronIcon from "../../assets/icons/chevron.svg";

interface Props {
  week: string;
  firstName: string;
}

const TaskCard: React.FC<Props> = (props) => {
  const styleOptions = {
    main: {
      backgroundColor: "rgb(4, 52, 141)",
    },
    sides: {
      backgroundColor: "rgb(104, 152, 141)",
    },
  };
  return (
    <div className="card" style={styleOptions.main}>
      <div className="card__week">
        <p>Week {props.week}</p>
      </div>
      <div className="card__task-icon">
        <img src={ToiletIcon} alt="toilet" />
      </div>
      <div className="card__header">
        <h3 className="card__header--title">Toilet boven</h3>
        <p className="card__header--assigned-to">{props.firstName}</p>
      </div>
      <div className="card__description">
        <div className="card__description--task">Task </div>
        <div className="card__description--task-info">0/6</div>
        <div className="card__description--deadline">Deadline</div>
        <div className="card__description--deadline-info">7 days</div>
      </div>
      <div className="card__show">
        <img src={ChevronIcon} alt="go to task" />
      </div>
    </div>
  );
};

export default TaskCard;
