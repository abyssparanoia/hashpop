import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { PasswordChangeForm } from "../PasswordChange";
import { PasswordForgetForm } from "../PasswordForget/PasswordForgetForm";
import { withAuthorization } from "../Session/withAuthorization";

const AccountComponent = ({ authUser }: any) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordChangeForm />
    <PasswordForgetForm />
  </div>
);

const mapStateToProps = (state: any) => ({
  authUser: state.sessionState.authUser
});

const authCondition = (authUser: any) => !!authUser;

export const Account = compose(
  withAuthorization(authCondition),
  withRouter,
  connect(mapStateToProps)
)(AccountComponent);
