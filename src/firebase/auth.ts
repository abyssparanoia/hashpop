import { auth } from "./firebase";

export const registerUser = (email: string, password: string) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signIn = (email: string, password: string) =>
  auth.signInAndRetrieveDataWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();

export const passwordReset = (email: string) =>
  auth.sendPasswordResetEmail(email);

export const passwordChange = async (password: string) => {
  if (auth.currentUser) {
    await auth.currentUser.updatePassword(password);
  }
  throw Error("No authenticated");
};
