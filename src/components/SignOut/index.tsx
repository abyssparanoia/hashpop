import * as React from "react";
import { auth } from "../../firebase";

export const SignOutButton = () => (
  <button type="button" onClick={auth.signOut}>
    Sign Out
  </button>
);
