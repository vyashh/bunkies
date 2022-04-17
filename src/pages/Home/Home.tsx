import { IonContent, IonPage, IonModal } from "@ionic/react";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { Redirect } from "react-router";
import AdminPage from "../../components/admin-page/admin-page.component";
import TaskCard from "../../components/task-card/task-card.component";
import HouseSettingsImage from "../../assets/house-settings.svg";
import Welcome from "../../components/welcome/welcome.component";
import { logout, useAuth } from "../../services/firebase";
import { createHouse, joinHouse } from "../../services/house";
import { Context } from "../../services/store";
import "./Home.scss";
import { createSchedule } from "../../services/schedule";
import TaskCardSmall from "../../components/task-card-small/task-card-small.component";

// set start of week on monday
moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

const Home: React.FC = () => {
  const {
    userData,
    loadingIndicator,
    showIntroduction,
    scheduleData,
    tasksData,
  } = useContext(Context);
  const [schedule, setSchedule] = scheduleData;
  const [tasks, setTasks] = tasksData;
  const [currentUserData, setCurrentUserData] = userData;
  const [loading, setLoading] = loadingIndicator;
  const [openAdminSettings, setOpenAdminSettings] = useState(false);
  const [userHasNoHouse, setUserHasNoHouse] = showIntroduction;
  let currentWeek: any = moment(Date.now()).isoWeek(); // now

  const signOut = () => {
    logout();
  };

  useEffect(() => {}, [schedule]);

  // voor elke maandag moet een taak gedaan worden
  // taak moet automatisch genereren wanneer je op meer klikt of naar beneden scrollt.
  // taak wordt toegevoegd aan een array [{dateTime: date, task:{id: , uid:}}]

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
      <IonContent fullscreen>
        <div className="home">
          <header className="home__date">
            <h4 className="home__date--label">Today</h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="home__date--day">
                {moment().format("D MMMM YYYY")}
              </p>
              <img
                src={HouseSettingsImage}
                alt="house settings"
                onClick={() => setOpenAdminSettings(true)}
              />
            </div>
            <button onClick={signOut}>Signout</button>
          </header>
          <main>
            <IonModal isOpen={userHasNoHouse}>
              <Welcome />
            </IonModal>

            <IonModal isOpen={openAdminSettings}>
              <AdminPage setOpenAdminSettings={setOpenAdminSettings} />
            </IonModal>

            {schedule &&
              schedule.map((scheduledTask: any) => {
                const week = moment(scheduledTask.date, "DDMMYYYY").isoWeek();

                return scheduledTask.tasks.map((item: any) => {
                  const task = tasks.find(
                    (task: any) => task.id === item.taskId
                  );
                  return (
                    <div>
                      {currentWeek === week ? (
                        <TaskCard
                          member={
                            currentUserData.uid === item.member.uid
                              ? "You"
                              : item.member.displayName
                          }
                          color={task.color}
                          title={task.title}
                          week={week}
                        />
                      ) : (
                        <TaskCardSmall
                          color={task.color}
                          member={item.member.displayName}
                          week={week}
                        />
                      )}
                    </div>
                  );
                });
              })}
          </main>
          <footer></footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
