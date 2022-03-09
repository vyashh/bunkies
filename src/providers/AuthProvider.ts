import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (auth: any, email: any, password: any) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const register = async (auth: any, email: any, password: any) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const logout = async (auth: any) => {
  await signOut(auth);
};
