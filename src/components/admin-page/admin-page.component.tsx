import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import AdminHouse from "../admin-house/admin-house.component";
import AdminTask from "../admin-task/admin-task.component";
import "./admin-page.styles.scss";

interface Props {
  setOpenAdminSettings: (active: boolean) => void;
}

const AdminPage: React.FC<Props> = ({ setOpenAdminSettings }) => {
  const [currentTab, setCurrentTab] = useState<string>("tasks");
  return (
    <div>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton
                style={{ backgroundColor: "transparent", color: "#54279f" }}
                onClick={() => setOpenAdminSettings(false)}
              >
                Done
              </IonButton>
            </IonButtons>
            <IonTitle>House Settings</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSegment value={currentTab}>
              <IonSegmentButton
                value="tasks"
                onClick={() => setCurrentTab("tasks")}
              >
                <IonLabel>Tasks</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="penalties"
                onClick={() => setCurrentTab("penalties")}
              >
                <IonLabel>Penalties</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton
                value="house"
                onClick={() => setCurrentTab("house")}
              >
                <IonLabel>House</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <div className="admin">
          {currentTab === "tasks" && <AdminTask />}
          {currentTab === "house" && <AdminHouse />}
        </div>
      </IonContent>
    </div>
  );
};

export default AdminPage;
