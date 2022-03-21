import "./Login.scss";
import { IonContent, IonPage } from "@ionic/react";
import AuthInput from "../../components/auth-input/auth-input.component";
import { Redirect } from "react-router";
import { Context } from "../../services/store";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

const Login: React.FC = () => {
  const { userData } = useContext(Context);
  const [currentUser, setCurrentUser] = userData;

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
    console.log(currentUser);
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <AuthInput authMethod="login" />
      </IonContent>
    </IonPage>
  );
};

export default Login;
