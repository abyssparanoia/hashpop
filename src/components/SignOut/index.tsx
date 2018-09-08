import * as React from "react";
import { auth } from "../../firebase";
import { Button } from "@material-ui/core";

export const SignOutButton = () => (
  <Button variant="outlined" onClick={auth.signOut}>
    Sign Out
  </Button>
);
