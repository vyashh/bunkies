import { IonContent } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import Button from "../button/button.component";
import Input from "../input/input.component";
import "./auth-input.styles.scss";
import { Context } from "../../services/store";
import { login, logout, register, useAuth } from "../../services/firebase";
import { Redirect } from "react-router";

const AuthInput: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { userData, loadingIndicator } = useContext(Context);
  const currentUser = useAuth();

  const [loading, setLoading] = loadingIndicator;
  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("clicked");

    isLogin ? handleLogin() : handleregister();
  };

  const handleregister = async () => {
    setLoading(true);
    try {
      await register(email, password);
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await login(email, password);
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  // const handleLogout = async () => {
  //   setLoading(true);
  //   try {
  //     await logout();
  //   } catch {
  //     alert("Error!");
  //   }
  //   setLoading(false);
  // };

  const handleMethodChange = () => {
    setIsLogin(!isLogin);
  };

  
  if (currentUser) {
    console.log("currentuser is detected redirecting to /");
    return <Redirect to="/" />;
  }

  return (
    <IonContent>
      <div className="auth-input">
        <div className="auth-input__header">
          Bunkies<span style={{ color: "#A066FF" }}>.</span>
        </div>
        <div className="auth-input__input">
          <h2 style={{ color: "black" }}>{isLogin ? "Login" : "Register"}</h2>
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

          {isLogin && (
            <p className="auth-input__input--recover">Forgot password?</p>
          )}
          <Button
            // disabled={loading}
            text={isLogin ? "Login" : "Register"}
            submit={handleSubmit}
          />
          {isLogin ? (
            <p className="auth-input__input--register">
              Don&#8217;t have an account?
              <strong onClick={handleMethodChange}>Sign up</strong>
            </p>
          ) : (
            <p className="auth-input__input--register">
              Already have an account?{" "}
              <strong onClick={handleMethodChange}>Login</strong>
            </p>
          )}
        </div>
      </div>
    </IonContent>
  );
};

export default AuthInput;
