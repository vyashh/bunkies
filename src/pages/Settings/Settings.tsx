import "./Settings.scss";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import AvatarIcon from "../../assets/avatar.svg";
import { useContext } from "react";
import { Context } from "../../services/store";
import { logout, useAuth } from "../../services/firebase";
import Loading from "../../components/loading/loading.component";

const Settings: React.FC = () => {
  const { userData } = useContext(Context);
  const [currentUserData, setCurrentUserData] = userData;
  const currentUser = useAuth();

  if (!currentUserData) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Loading />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="settings">
          <div className="settings__profile">
            <IonAvatar>
              <img src={AvatarIcon} alt="user avatar" />
            </IonAvatar>
            <IonLabel>{currentUserData.displayName}</IonLabel>
            <IonButton size="small" onClick={logout}>
              Logout
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
