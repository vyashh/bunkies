import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthProvider, useAuth } from "./providers/AuthProvider_old";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/private-routes/private-routes";
import { useContext } from "react";
import { Context } from "./services/store";
import Register from "./pages/Register/Register";
import { useAuthState } from "./services/firebase";
import { IonApp } from "@ionic/react";

const App: React.FC = () => {
  const { userData } = useContext(Context);
  const [currentUser, setCurrentUser] = userData;

  // @ts-ignore: Unreachable code error
  const AuthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState();
    return (
      <Route
        {...props}
        render={(routeProps) =>
          isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
        }
      />
    );
  };

  // @ts-ignore: Unreachable code error
  const UnAuthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState();

    return (
      <Route
        {...props}
        render={(routeProps) =>
          !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
        }
      />
    );
  };
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          {/* <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route path="/" component={currentUser ? PrivateRoute : Login} />
          <Route
            path="/register"
            component={currentUser ? PrivateRoute : Register}
          /> */}
          <AuthenticatedRoute exact path="/" component={Home} />
          <UnAuthenticatedRoute exact path="/login" component={Login} />
          <UnAuthenticatedRoute exact path="/register" component={Register} />
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
