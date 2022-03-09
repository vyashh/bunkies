import { IonContent } from "@ionic/react";
import { useContext, useState } from "react";
import Button from "../button/button.component";
import Input from "../input/input.component";
import "./auth-input.styles.scss";
import { Context } from "../../services/store";
import { login, register } from "../../providers/AuthProvider";
import { auth } from "../../services/firebase";

interface Props {
  authMethod?: string;
}

const AuthInput: React.FC<Props> = ({ authMethod }) => {
  const { userData } = useContext(Context);
  const [currentUser, setCurrentUser] = userData;
  const [email, setEmail] = useState<string>();
  const [checkEmail, setCheckEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [checkPassword, setCheckPassword] = useState<string>();

  const logInfo = (e: any) => {
    e.preventDefault();
    {
      authMethod === "login"
        ? login(auth, email, password).then((currentUser: any) => {
            setCurrentUser(currentUser);
          })
        : register(auth, email, password).then((currentUser: any) => {
            setCurrentUser(currentUser);
          });
    }
  };

  return (
    <IonContent>
      <div className="auth-input">
        <div className="auth-input__header">
          Bunkies<span style={{ color: "#A066FF" }}>.</span>
        </div>
        <div className="auth-input__input">
          <h2>{authMethod === "login" ? "Login" : "Register"}</h2>
          <br />
          <Input
            type="email"
            label="E-mail"
            placeholder="Your E-mail"
            setValue={setEmail}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Your password"
            setValue={setPassword}
          />

          {authMethod === "login" && (
            <p className="auth-input__input--recover">Forgot password?</p>
          )}
          <Button
            text={authMethod === "login" ? "Login" : "Register"}
            submit={logInfo}
          />
          {authMethod === "login" ? (
            <p className="auth-input__input--register">
              Don&#8217;t have an account? <strong>Sign up</strong>
            </p>
          ) : (
            <p className="auth-input__input--register">
              Already have an account? <strong>Login</strong>
            </p>
          )}
        </div>
      </div>
    </IonContent>
  );
};

export default AuthInput;
