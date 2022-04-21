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
import { useContext, useState } from "react";
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

  const handleSubmit = () => {
    const toHistory = schedule.find(
      (scheduledItem: any) => scheduledItem.id === task.scheduleId
    );

    const newSchedule = schedule.filter(
      (scheduledItem: any) => scheduledItem.id !== task.scheduleId
    );

    addToHistory(house.id, toHistory);
    updateSchedule(house.id, newSchedule);
    setSchedule(newSchedule);

    props.setIsOpen(false);
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
