import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from "react";
import TaskCard from "../components/task-card/task-card.component";
import "./Home.scss";

// set start of week on monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const Home: React.FC = () => {
  const [schedule, setSchedule] = useState<Array<any>>([]);
  let currentWeek: any = moment(Date.now()).isoWeek(); // now 

  useEffect(() => {
    axios
      .request({
        url: "https://us-central1-bunkies-app.cloudfunctions.net/app/house/9pqaO9JaL852lSgDLm01/schedule",
      })
      .then((res) => {
        setSchedule(res.data.data);
      });


    

  }, []);

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
          </header>
          <main>
            <p>This week</p>
            {schedule.map((task) => {
              { return task.week === currentWeek && 
                <TaskCard key={task.week} week={task.week} firstName={task.name}/>
             }
            })}
            <p>Upcoming</p>
            {schedule.map((task) => {
              { return task.week !== currentWeek && 
                 <TaskCard key={task.week} week={task.week} firstName={task.name}/>
              }
            })}
          </main>
          <footer>Footer Content — Header.com 2020</footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
