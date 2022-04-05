import { IonContent, IonPage, IonModal } from "@ionic/react";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import AdminPage from "../../components/admin-page/admin-page.component";
import TaskCard from "../../components/task-card/task-card.component";
import Welcome from "../../components/welcome/welcome.component";
import { logout, useAuth } from "../../services/firebase";
import { createHouse } from "../../services/house";
import { Context } from "../../services/store";
import "./Home.scss";

// set start of week on monday
moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

const Home: React.FC = () => {
  const { userData, loadingIndicator, showIntroduction } = useContext(Context);
  const [loading, setLoading] = loadingIndicator;
  const [openAdminSettings, setOpenAdminSettings] = useState(false);
  const [userHasNoHouse, setUserHasNoHouse] = showIntroduction;
  const [schedule, setSchedule] = useState<Array<any>>([]);
  let currentWeek: any = moment(Date.now()).isoWeek(); // now

  const signOut = () => {
    logout();
  };

  useEffect(() => {
    axios
      .request({
        url: "https://us-central1-bunkies-app.cloudfunctions.net/app/house/9pqaO9JaL852lSgDLm01/schedule",
      })
      .then((res) => {
        setSchedule(res.data.data);
      });
  }, []);

  // if (currentUser === null) {
  //   console.log("currentuser is null redirecting to /login");
  //   return <Redirect to="/login" />;
  // }

  // if (currentUserData.houseId === null) {
  //   console.log("currentuser has no houseId redirecting to /welcome");
  //   return <Redirect to="/welcome" />;
  // }

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calendar</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <div className="home">
          <header className="home__date">
            <h4 className="home__date--label">Today</h4>
            <p className="home__date--day">06 September 2021</p>
            <button onClick={signOut}>Signout</button>
          </header>
          <main>
            <p>This week</p>

            <IonModal isOpen={userHasNoHouse}>
              <Welcome />
            </IonModal>

            <IonModal isOpen={false}>
              {/* <AdminPage setOpenAdminSettings={setOpenAdminSettings} /> */}
            </IonModal>
            {/* {schedule.map((task) => {
              {
                return (
                  task.week === currentWeek && (
                    <TaskCard
                      key={task.week}
                      week={task.week}
                      firstName={task.name}
                    />
                  )
                );
              }
            })}
            <p>Upcoming</p>
            {schedule.map((task) => {
              {
                return (
                  task.week !== currentWeek && (
                    <TaskCard
                      key={task.week}
                      week={task.week}
                      firstName={task.name}
                    />
                  )
                );
              }
            })} */}
          </main>
          <footer></footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
