import * as React from "react";
import { auth } from "../../firebase";

export class PasswordForgetForm extends React.Component {
  private static initialState = {
    email: "",
    error: null
  };

  private static propKey(propertyName: string, value: string) {
    return { [propertyName]: value };
  }

  constructor(props: any) {
    super(props);
    this.state = { ...PasswordForgetForm.initialState };
  }

  public onSubmit = (e: any) => {
    const { email }: any = this.state;
    auth
      .passwordReset(email)
      .then(() => {
        this.setState(() => ({ ...PasswordForgetForm.initialState }));
      })
      .catch(error => {
        this.setState(PasswordForgetForm.propKey("error", error));
      });

    e.preventDefault();
  };

  public render() {
    const { email, error }: any = this.state;
    const isValid = email === "";
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input
          value={email}
          onChange={e => this.setStateWithEvent(e, "email")}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isValid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
  private setStateWithEvent(e: any, columnType: string): void {
    this.setState(
      PasswordForgetForm.propKey(columnType, (e.target as any).value)
    );
  }
}
