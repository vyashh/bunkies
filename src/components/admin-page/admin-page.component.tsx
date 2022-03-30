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
import { useContext } from "react";
import { Context } from "../../services/store";
import AdminTask from "../admin-task/admin-task.component";
import "./admin-page.styles.scss";

const AdminPage: React.FC = () => {
  return (
    <div>
      <IonContent fullscreen>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton style={{ backgroundColor: "transparent" }}>
                Done
              </IonButton>
            </IonButtons>
            <IonTitle>House Settings</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSegment value="tasks">
              <IonSegmentButton value="tasks">
                <IonLabel>Tasks</IonLabel>
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
          <AdminTask />
        </div>
      </IonContent>
    </div>
  );
};

export default AdminPage;
