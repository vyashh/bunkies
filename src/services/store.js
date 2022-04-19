import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { db, useAuth } from "./firebase";
import { addToHistory } from "./schedule";

export const Context = React.createContext();

const Store = ({ children }) => {
  const currentUser = useAuth();
  const [errorLogin, setErrorLogin] = useState("");
  const [userData, setUserData] = useState(null);
  const [houseData, setHouseData] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  const [scheduleData, setScheduleData] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(false);

  const getHouseData = async (houseId) => {
    const docRef = doc(db, "houses", houseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setHouseData(docSnap.data());
    }

    getHouseTasks(houseId);
    getHouseSchedule(houseId);
  };

  const getHouseTasks = async (houseId) => {
    const tasksRef = await getDocs(collection(db, "houses", houseId, "tasks"));
    const tasks = [];

    if (!tasksRef.empty) {
      tasksRef.forEach((doc) => {
        tasks.push(doc.data());
      });
      setTasksData(tasks);
    }
  };

  const getHouseSchedule = async (houseId) => {
    const docRef = doc(db, "houses", houseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      data.schedule && checkCleanSchedule(houseId, data.schedule);
      // setScheduleData(data.schedule);
    }
  };

  const checkCleanSchedule = (houseId, data) => {
    const newSchedule = data;

    data.map((scheduledTask, index) => {
      const taskDate = moment(scheduledTask.date, "DD/MM/YYYY");
      const currentDate = moment();
      const deadline = taskDate.diff(currentDate, "days");

      if (deadline < 0) {
        newSchedule.splice(index, 1);
        addToHistory(houseId, scheduledTask);
      }
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser && !userData) {
        setLoadingIndicator(true);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          !data.houseId
            ? setShowIntroduction(true)
            : getHouseData(data.houseId);
        }
        setLoadingIndicator(false);
      }
    };
    getUserData();
    console.log("useEffect();");
  }, [currentUser, setUserData, userData]);

  return (
    <Context.Provider
      value={{
        errorState: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        userData: [userData, setUserData],
        houseData: [houseData, setHouseData],
        tasksData: [tasksData, setTasksData],
        scheduleData: [scheduleData, setScheduleData],
        showIntroduction: [showIntroduction, setShowIntroduction],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
