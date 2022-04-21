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

const History: React.FC = () => {
  const { taskHistoryData } = useContext(Context);

  const [taskArchive, setTaskArchive] = taskHistoryData;
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Tasks History</IonListHeader>
          {taskArchive.map((task: any) => {})}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default History;
