import "./Register.scss";
import { IonContent, IonPage } from "@ionic/react";
import AuthInput from "../../components/auth-input/auth-input.component";
import { Redirect } from "react-router";
import { Context } from "../../services/store";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

const Register: React.FC = () => {
  const { userData } = useContext(Context);
  const [currentUser, setCurrentUser] = userData;

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
    console.log(currentUser);
  });

  if (currentUser) {
    <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <AuthInput authMethod="register" />
      </IonContent>
    </IonPage>
  );
};

export default Register;
