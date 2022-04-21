import "./History.scss";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
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
          <IonListHeader>
            Tasks History
            <IonButtons slot="end">
              <IonButton
                style={{ backgroundColor: "transparent", color: "#54279f" }}
              >
                Cancel
              </IonButton>
            </IonButtons>
          </IonListHeader>

          <IonItem style={{ fontSize: ".8em" }}>
            <IonAvatar slot="end">Score</IonAvatar>
          </IonItem>
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
                  <IonAvatar slot="end">TBD</IonAvatar>
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
