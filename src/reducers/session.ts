const initialState = {
  authUser: null
};

const applySetAuthUser = (state: any, action: any) => ({
  ...state,
  authUser: action.authUser
});

export function sessionReducer(state = initialState, action: any) {
  switch (action.type) {
    case "AUTH_USER_SET": {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
}
