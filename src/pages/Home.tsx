import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import { useEffect } from "react";
import TaskCard from "../components/task-card/task-card.component";
import "./Home.scss";

const Home: React.FC = () => {
  useEffect(() => {
    axios
      .request({
        url: "https://us-central1-bunkies-app.cloudfunctions.net/app/house/9pqaO9JaL852lSgDLm01",
      })
      .then((res) => {
        console.log(res.data.data);
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
            <TaskCard />
          </main>
          <footer>Footer Content — Header.com 2020</footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
