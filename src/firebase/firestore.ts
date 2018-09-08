import { firestore } from "./firebase";

export const createUser = (uid: string, username: string, email: string) =>
  firestore
    .collection("users")
    .add({
      uid,
      email,
      username
    })
    .then(docRef => console.log("Document written with ID: ", docRef.id))
    .catch(error => console.error("Error adding document: ", error));

export const onceGetUsers = () =>
  firestore
    .collection("users")
    .get()
    .then(snapshot =>
      snapshot.forEach(doc => {
        console.log(doc.data());
      })
    );
