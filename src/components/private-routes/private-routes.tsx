import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import calendar from "../../assets/calendar.svg";
import avatar from "../../assets/avatar.svg";
import history from "../../assets/history.svg";
import { Redirect, Route } from "react-router";
import Home from "../../pages/Home/Home";
import { useAuth } from "../../providers/AuthProvider_old";
import Login from "../../pages/Login/Login";

const PrivateRoute: React.FC = () => {
  // if current user is not logged in user will be redirected to /login
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/calendar">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/calendar" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="calendar" href="/calendar">
          <IonIcon icon={calendar}></IonIcon>
        </IonTabButton>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={history}></IonIcon>
        </IonTabButton>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={avatar}></IonIcon>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default PrivateRoute;