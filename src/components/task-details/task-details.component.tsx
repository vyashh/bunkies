import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { collection, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useContext, useState } from "react";
import { db, useAuth } from "../../services/firebase";
import { addToHistory, updateSchedule } from "../../services/schedule";
import { Context } from "../../services/store";
import Button from "../button/button.component";
import "./task-details.styles.scss";

interface Props {
  setIsOpen: (state: boolean) => void;
  task: any;
}

const TaskDetails: React.FC<Props> = (props) => {
  const { scheduleData, houseData } = useContext(Context);
  const [schedule, setSchedule] = scheduleData;
  const [house, setHouse] = houseData;
  const [present] = useIonAlert();
  const task = props.task;
  const currentUser = useAuth();

  const handleSubmit = async () => {
    const weekIndex = schedule.findIndex(
      (scheduledItem: any) => scheduledItem.id === task.scheduleId
    );

    const { date, id } = schedule[weekIndex];
    const now = moment().format("D MMMM YYYY HH:mm:ss");

    const taskInSchedule = schedule[weekIndex].tasks.filter(
      (scheduledTask: any) => scheduledTask.taskId === task.id
    );

    const toHistory = { date: date, id: id, tasks: taskInSchedule };

    const newScheduledTasks = schedule[weekIndex].tasks.filter(
      (scheduledTask: any) => scheduledTask.taskId !== task.id
    );

    const newSchedule = schedule;

    newSchedule[weekIndex].tasks = newScheduledTasks;
    taskInSchedule[0].doneAt = now;

    const docRef = doc(db, "houses", house.id, "history", task.scheduleId);
    const docSnap = await getDoc(docRef);

    console.log(taskInSchedule);

    if (docSnap.exists()) {
      console.log("week already exists");
      addToHistory(house.id, { id: id, task: taskInSchedule[0] }, true).then(
        () => {
          updateSchedule(house.id, newSchedule);
          setSchedule(newSchedule);
          props.setIsOpen(false);
        }
      );
    } else {
      addToHistory(house.id, toHistory).then(() => {
        updateSchedule(house.id, newSchedule);
        setSchedule(newSchedule);
        props.setIsOpen(false);
      });
    }
  };

  return (
    <div>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                style={{ backgroundColor: "transparent", color: "#54279f" }}
                onClick={() => props.setIsOpen(false)}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                style={{ backgroundColor: "transparent", color: "#54279f" }}
                onClick={() =>
                  present({
                    cssClass: "my-css",
                    header: "Finishing up!",
                    message: "Are you done with the todo list?",
                    buttons: [
                      "No",
                      {
                        text: "Yes",
                        handler: (d) => handleSubmit(),
                      },
                    ],
                    onDidDismiss: (e) => console.log("did dismiss"),
                  })
                }
                // onClick={() => props.setIsOpen(false)}
              >
                Done
              </IonButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>{task.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="task-details">
          <IonList>
            <IonListHeader>Todo</IonListHeader>
            <IonItem> Penalty: None</IonItem>
            {task.todo.map((item: any) => {
              return (
                <IonItem>
                  <IonCheckbox color="tertiary" slot="start" />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </div>
      </IonContent>
    </div>
  );
};

export default TaskDetails;
