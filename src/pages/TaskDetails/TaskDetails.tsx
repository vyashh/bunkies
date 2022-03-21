import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TaskDetails.scss";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Task</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="task-details">
          <header className="task-details__date"></header>
          <main></main>
          <footer>Footer Content — Header.com 2020</footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
