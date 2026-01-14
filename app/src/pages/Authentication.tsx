import React from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import { useAtomValue } from "jotai";
import { authPageAtom } from "../stores/authPage";

const Authentication: React.FC = () => {
  const authPage = useAtomValue(authPageAtom);

  return authPage === "login" ? <LoginForm /> : <SignUpForm />;
};

export default Authentication;
