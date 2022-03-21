import "./Login.scss";
import { IonContent, IonPage } from "@ionic/react";
import AuthInput from "../../components/auth-input/auth-input.component";
import { Redirect } from "react-router";
import { useAuth } from "../../services/firebase";

const Login: React.FC = () => {
  const currentUser = useAuth();

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <AuthInput />
      </IonContent>
    </IonPage>
  );
};

export default Login;
