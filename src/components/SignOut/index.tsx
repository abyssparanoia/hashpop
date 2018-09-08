import * as React from "react";
import { auth } from "../../firebase";
import styled from "styled-components";

const Button = styled.button`
  background: red;
  border-radius: 8px;
  color: white;
`;

export const SignOutButton = () => (
  <Button onClick={auth.signOut}>Sign Out</Button>
);
