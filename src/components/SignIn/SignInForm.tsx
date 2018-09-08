import * as React from "react";
import * as routes from "../../constants/routes";
import { auth } from "../../firebase";

interface InterfaceProps {
  email?: string;
  error?: any;
  history?: any;
  password?: string;
}

interface InterfaceState {
  email: string;
  error: any;
  password: string;
}

export class SignInForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static initialState = {
    email: "",
    error: null,
    password: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);

    this.state = { ...SignInForm.initialState };
  }

  public onSubmit = (e: any) => {
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .signIn(email, password)
      .then(() => {
        this.setState(() => ({ ...SignInForm.initialState }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(SignInForm.propKey("error", error));
      });
    e.preventDefault();
  };

  public render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input
          value={email}
          onChange={e => this.setStateWithEvent(e, "email")}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={e => this.setStateWithEvent(e, "password")}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
  private setStateWithEvent(e: any, columnType: string): void {
    this.setState(SignInForm.propKey(columnType, (e.target as any).value));
  }
}
