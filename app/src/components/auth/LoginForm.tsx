import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { authPageAtom } from "../../stores/authPage";
import {
  handleLoginChangeAtom,
  loginFormAtom,
  signUpFormAtom,
} from "../../stores/authForm";
import { currentUserAtom } from "../../stores/currentUser";
import { login } from "../../services/entity";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const setAuthPage = useSetAtom(authPageAtom);
  const [formValues, setFormValues] = useAtom(loginFormAtom);
  const setSignUpValues = useSetAtom(signUpFormAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const handleInputChange = useSetAtom(handleLoginChangeAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(formValues);
    setCurrentUser(user);
    setFormValues("RESET");
    setSignUpValues("RESET");
    navigate("/public-model-cards", { replace: true });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "75ch",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="email"
        value={formValues.email}
        label="Email"
        variant="outlined"
        onChange={handleInputChange}
      />
      <TextField
        id="password"
        type="password"
        value={formValues.password}
        label="Password"
        variant="outlined"
        onChange={handleInputChange}
      />
      <Link
        onClick={() => {
          setAuthPage("register");
        }}
        sx={{ textAlign: "center", cursor: "pointer" }}
      >
        Haven't got an account? Sign up here!
      </Link>
      <Button
        onClick={handleSubmit}
        sx={{ maxWidth: "30%", height: 60 }}
        variant="contained"
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
