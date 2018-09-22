import { actionCreatorFactory } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { onceGetUsers } from "../firebase/firestore";

const actionCreator = actionCreatorFactory();

export interface UserItem {
  uid: string;
  email: string;
}

export interface UserItemList extends Array<UserItem> {}

export const userActions = {
  showList: actionCreator<UserItemList>("SHOW_LIST")
};

const initialState: UserItemList = [];

export const userReducer = reducerWithInitialState(initialState).case(
  userActions.showList,
  (state, users) => {
    onceGetUsers().then(snapshot =>
      snapshot.forEach(doc => {
        users.push({ uid: doc.data().uid, email: doc.data().email });
      })
    );

    return { ...state, users };
  }
);
