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

const History: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Tasks History</IonListHeader>
          <IonItem>
            <IonAvatar slot="start" style={{ backgroundColor: "red" }} />
            <IonLabel>
              <h2>Task</h2>
              <h3>Date</h3>
              <p>User</p>
            </IonLabel>
            <IonAvatar slot="end" />
            <img src={ArrowIcon} alt="view details" />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;
