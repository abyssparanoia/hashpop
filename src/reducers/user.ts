const initialState = {
  users: {}
};

const applySetUsers = (state: any, action: any) => ({
  ...state,
  users: action.users
});

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case "USERS_SET": {
      return applySetUsers(state, action);
    }
    default:
      return state;
  }
}
