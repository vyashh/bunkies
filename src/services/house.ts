import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
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

export const joinHouse = async (houseCode: any, user?: User) => {
  const housesRef = collection(db, "houses");
  const q = query(housesRef, where("code", "==", parseInt(houseCode)));

  console.log("code", "==", houseCode);

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log("no results");
  } else {
    querySnapshot.forEach(async (item) => {
      const houseRef = doc(db, "houses", item.id);
      const userRef = doc(db, "users", user!.uid);
      const houseData = item.data();

      await updateDoc(houseRef, {
        members: arrayUnion({ displayName: user?.displayName, uid: user?.uid }),
      });

      await updateDoc(userRef, {
        displayName: user?.displayName,
        houseId: houseData.id,
      });
    });
  }

  // await updateDoc(houseRef, {
  //   members: arrayUnion({ displayName: user?.displayName, uid: user?.uid }),
  // });
};

export const addTask = async (
  houseId: string,
  taskTitle: string,
  color: string,
  todoList: Array<any>,
  members: Array<any>
) => {
  const docRef = doc(collection(db, "houses", houseId, "tasks"));

  await setDoc(docRef, {
    title: taskTitle,
    color: color,
    id: docRef.id,
    todo: todoList,
    assignedTo: members,
  });
};
