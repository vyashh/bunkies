import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

interface User {
  displayName: string;
  id: string;
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
  });

  // update houseId field
  const userRef = doc(db, "users", user!.id);
  await updateDoc(userRef, {
    displayName: user?.displayName,
    houseId: houseRef.id,
    isAdmin: true,
  });
};
