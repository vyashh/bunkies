import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { db } from "./firebase";

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

const getTasks = async (houseId: string) => {
  const querySnapshot = await getDocs(
    collection(db, "houses", houseId, "tasks")
  );

  const data: Array<any> = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};

const getEveryMonday = () => {
  let currentDate: any = moment(Date.now()); // now
  var nextDate = moment(new Date(currentDate)).add("1", "year"); // 1 year from now
  var end = moment(nextDate);

  // let timeNow = ;
  var day = 0;

  var result = [];
  var current = currentDate.clone();

  while (current.day(7 + day).isSameOrBefore(end)) {
    result.push(current.clone());
  }

  return result.map((m) => m.format("DD/MM/YYYY"));
};

const generateSchedule = async (houseId: string) => {
  const dates = getEveryMonday();
  let tasks: Array<string> = [];
  let schedule: Array<any> = [];

  await getTasks(houseId).then((data) => (tasks = data));

  tasks.map((task: any) => {
    let memberIndex = 0;

    dates.map((date) => {
      const dateExists = schedule.find((task) => task.date === date);

      if (dateExists) {
        const dateIndex = schedule.findIndex(
          (scheduledTask) => scheduledTask.date === date
        );
        schedule[dateIndex].tasks.push({
          taskId: task.id,
          member: task.assignedTo[memberIndex],
        });
      } else {
        const newId = doc(collection(db, "random")).id;

        schedule.push({
          date: date,
          tasks: [
            {
              taskId: task.id,
              member: task.assignedTo[memberIndex],
            },
          ],
          id: newId,
        });
      }

      memberIndex++;
      if (memberIndex === task.assignedTo.length) {
        memberIndex = 0;
      }
    });
  });
  return schedule;
};

export const createSchedule = (houseId: string) => {
  const docRef = doc(db, "houses", houseId);
  const newSchedule = generateSchedule(houseId);
  newSchedule.then(async (schedule) => {
    await updateDoc(docRef, {
      schedule: schedule,
    });
  });
};

export const addToHistory = async (houseId: string, data: any) => {
  await setDoc(doc(db, "houses", houseId, "history", data.id), data);
};

export const updateSchedule = async (houseId: string, data: any) => {
  const docRef = doc(db, "houses", houseId);
  await updateDoc(docRef, {
    schedule: data,
  });
};
