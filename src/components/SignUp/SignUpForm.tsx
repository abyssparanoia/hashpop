import * as React from "react";
import * as routes from "../../constants/routes";
import { auth, firestore } from "../../firebase";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
  username?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  passwordOne: string;
  passwordTwo: string;
  username: string;
}

export class SignUpForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static initialState = {
    email: "",
    error: null,
    passwordOne: "",
    passwordTwo: "",
    username: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...SignUpForm.initialState };
  }

  public onSubmit(e: any) {
    e.preventDefault();
    const { email, passwordOne, username } = this.state;
    const { history } = this.props;
    auth
      .registerUser(email, passwordOne)
      .then((authUser: any) => {
        firestore
          .createUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...SignUpForm.initialState }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(SignUpForm.propKey("error", error));
          });
      })
      .catch(error => {
        this.setState(SignUpForm.propKey("error", error));
      });
  }

  public render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={e => this.onSubmit(event)}>
        <input
          value={username}
          onChange={e => this.setStateWithEvent(e, "username")}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={e => this.setStateWithEvent(e, "email")}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={e => this.setStateWithEvent(e, "passwordOne")}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={e => this.setStateWithEvent(e, "passwordTwo")}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: any, columnType: string) {
    this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
  }
}
