import "./Register.scss";
import { IonContent, IonPage, IonSlide, IonSlides } from "@ionic/react";
import { useAuth } from "../../services/firebase";

const Welcome: React.FC = () => {
  const currentUser = useAuth();



  return (
    <IonPage>
      <IonContent fullscreen>
        
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
