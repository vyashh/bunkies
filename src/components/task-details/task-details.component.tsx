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
import { useState } from "react";
import Button from "../button/button.component";
import "./task-details.styles.scss";

interface Props {
  setIsOpen: (state: boolean) => void;
  task: any;
}

const TaskDetails: React.FC<Props> = (props) => {
  const [present] = useIonAlert();
  const task = props.task;
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
                        handler: (d) => console.log("ok pressed"),
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
            <IonListHeader>Todo:</IonListHeader>
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
