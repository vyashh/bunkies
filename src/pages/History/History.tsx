import "./History.scss";
import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import ArrowIcon from "../../assets/icons/chevron.svg";
import { useContext } from "react";
import { Context } from "../../services/store";
import moment from "moment";

const History: React.FC = () => {
  const { taskHistoryData, tasksData } = useContext(Context);
  const [tasks, setTasks] = tasksData;
  const [taskArchive, setTaskArchive] = taskHistoryData;

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Tasks History</IonListHeader>
          {taskArchive.map((archive: any) => {
            return archive.tasks.map((task: any) => {
              const taskDetails = tasks.find(
                (item: any) => item.id === task.taskId
              );
              return (
                <IonItem>
                  <IonAvatar
                    slot="start"
                    style={{ backgroundColor: taskDetails.color }}
                  />
                  <IonLabel>
                    <h2>{taskDetails.title}</h2>
                    <h3>{task.member.displayName}</h3>
                    <p>{moment(task.doneAt).startOf("hour").fromNow()}</p>
                  </IonLabel>
                </IonItem>
              );
            });
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;
