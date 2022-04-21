import "./Login.scss";
import { IonContent, IonPage } from "@ionic/react";
import AuthInput from "../../components/auth-input/auth-input.component";
import { Redirect } from "react-router";
import { loading, useAuth } from "../../services/firebase";
import Loading from "../../components/loading/loading.component";

const Login: React.FC = () => {
  const currentUser = useAuth();

  console.log(loading);

  return (
    <IonPage>
      <IonContent fullscreen>
        <AuthInput />
      </IonContent>
    </IonPage>
  );
};

export default Login;
