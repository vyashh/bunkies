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
    <div className="card-sm">
      <div className="card-sm__week" style={{ backgroundColor: props.color }}>
        <p>
          <span style={{ fontSize: "2em", fontWeight: "bold" }}>
            {props.week}
          </span>
        </p>
      </div>
      <div className="card-sm__member">
        <div>
          <img src={AvatarIcon} alt="avatar icon" />
          <br />
          <span style={{ fontWeight: "bold" }}>{props.member}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCardSmall;
