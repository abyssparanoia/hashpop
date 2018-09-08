import * as React from "react";
import { auth } from "../../firebase";

interface InterfaceProps {
  error?: any;
  history?: any;
  passwordOne?: string;
  passwordTwo?: string;
}

interface InterfaceState {
  error?: any;
  passwordOne?: string;
  passwordTwo?: string;
}

export class PasswordChangeForm extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  private static initialState = {
    error: null,
    passwordOne: "",
    passwordTwo: ""
  };

  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value };
  }

  constructor(props: any) {
    super(props);
    this.state = { ...PasswordChangeForm.initialState };
  }

  public onSubmit = (e: any) => {
    const { passwordOne }: any = this.state;

    auth
      .passwordChange(passwordOne)
      .then(() => {
        this.setState(() => ({ ...PasswordChangeForm.initialState }));
      })
      .catch(error => {
        this.setState(PasswordChangeForm.propKey("error", error));
      });
    e.preventDefault();
  };

  public render() {
    const { passwordOne, passwordTwo, error }: any = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input
          value={passwordOne}
          onChange={e => this.setStateWithEvent(e, "passwordOne")}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={e => this.setStateWithEvent(e, "passwordTwo")}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(e: any, columnType: string): void {
    this.setState(
      PasswordChangeForm.propKey(columnType, (e.target as any).value)
    );
  }
}
