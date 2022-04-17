import hexToRgba from "hex-to-rgba";
import "./task-card-small.styles.scss";
import AvatarIcon from "../../assets/avatar.svg";

interface Props {
  week: number;
  member: string;
  color: string;
}

const TaskCardSmall: React.FC<Props> = (props) => {
  const color = hexToRgba("#0000", 0.6);

  return (
    <div className="card-sm" style={{ backgroundColor: props.color }}>
      <div className="card-sm__week" style={{ backgroundColor: color }}>
        <p>
          Week <br />
          <span>{props.week}</span>
        </p>
      </div>
      <div className="card-sm__member">
        <div>
          <img style={{ opacity: "0.4" }} src={AvatarIcon} alt="avatar icon" />
          <br />
          {props.member}
        </div>
      </div>
    </div>
  );
};

export default TaskCardSmall;
