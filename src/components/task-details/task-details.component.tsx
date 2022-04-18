import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./task-details.styles.scss";

interface Props {
  setIsOpen: (state: boolean) => void;
  task: any;
}

const TaskDetails: React.FC<Props> = (props) => {
  const task = props.task;
  return (
    <div>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton
                style={{ backgroundColor: "transparent", color: "#54279f" }}
                onClick={() => props.setIsOpen(false)}
              >
                Done
              </IonButton>
            </IonButtons>
            <IonTitle>{task.title}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSegment value={"tasks"}>
              <IonSegmentButton value="tasks">
                <IonLabel>Task</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="penalties">
                <IonLabel>Penalties</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="house">
                <IonLabel>House</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <div className="admin">
          {/* {currentTab === "tasks" && <AdminTask />}
          {currentTab === "house" && <AdminHouse />} */}
        </div>
      </IonContent>
      {/* <IonModal isOpen={true}>
        <IonContent>Modal Content</IonContent>
      </IonModal> */}
    </div>
  );
};

export default TaskDetails;
