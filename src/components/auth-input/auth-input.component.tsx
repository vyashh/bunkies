import { IonContent } from "@ionic/react";
import { useContext, useState } from "react";
import Button from "../button/button.component";
import Input from "../input/input.component";
import "./auth-input.styles.scss";
import { Context } from "../../services/store";
import { login } from "../../providers/AuthProvider";
import { auth } from "../../services/firebase";

interface Props {
  authMethod?: string;
}

const AuthInput: React.FC<Props> = ({ authMethod }) => {
  const { userData } = useContext(Context);
  const [currentUser, setCurrentUser] = userData;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const logInfo = (e: any) => {
    e.preventDefault();
    login(auth, email, password).then((currentUser: any) => {
      setCurrentUser(currentUser);
    });
  };

  return (
    <IonContent>
      <div className="auth-input">
        <div className="auth-input__header">
          Bunkies<span style={{ color: "#A066FF" }}>.</span>
        </div>
        <div className="auth-input__input">
          {authMethod === "login" && <h2>Login</h2>}
          <br />
          <Input
            type="email"
            label="E-mail"
            placeholder="Your e-mail"
            setValue={setEmail}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Your password"
            setValue={setPassword}
          />
          <p className="auth-input__input--recover">Forgot password?</p>
          <Button text="Login" submit={logInfo} />
          <p className="auth-input__input--register">
            Don&#8217;t have an account? <strong>Sign up</strong>
          </p>
        </div>
      </div>
    </IonContent>
  );
};

export default AuthInput;
