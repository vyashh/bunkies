import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

interface User {
  displayName: string;
  uid: string;
}

const houseRef = doc(collection(db, "houses"));

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// create house and user profile via welcome page
export const createHouse = async (houseName: string, user?: User) => {
  await setDoc(houseRef, {
    id: houseRef.id,
    name: houseName,
    code: generateCode(),
    members: arrayUnion({ displayName: user?.displayName, uid: user?.uid }),
  });

  // update houseId field
  const userRef = doc(db, "users", user!.uid);
  await updateDoc(userRef, {
    displayName: user?.displayName,
    houseId: houseRef.id,
    isAdmin: true,
  });
};

export const addTask = async (
  houseId: string,
  taskTitle: string,
  todoList: Array<string>,
  members: Array<any>
) => {
  const taskDocRef = doc(db, "houses", houseId);
  const taskColRef = collection(taskDocRef, "tasks");

  await addDoc(taskColRef, {
    title: taskTitle,
    id: taskColRef.id,
    todo: todoList,
    assignedTo: members,
  });
};
