import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { firestore } from "../../firebase";
import { withAuthorization } from "../Session/withAuthorization";
import { UserList } from "./UserList";

class HomeComponent extends React.Component {
  public componentDidMount() {
    const { onSetUsers }: any = this.props;
    firestore.onceGetUsers().then(snapshot => onSetUsers(snapshot));
  }

  public render() {
    const { users }: any = this.props;
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        {!!users && <UserList users={users} />}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  ...state,
  users: state.userState.users
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetUsers: (users: any) => dispatch({ type: "USERS_SET", users })
});

const authCondition = (authUser: any) => !!authUser;

export const Home = compose(
  withAuthorization(authCondition),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomeComponent);
