import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Link, MenuItem } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { authPageAtom } from "../../stores/authPage";
import {
  handleSignUpChangeAtom,
  loginFormAtom,
  signUpFormAtom,
} from "../../stores/authForm";
import { register } from "../../services/entity";
import { currentUserAtom } from "../../stores/currentUser";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const setAuthPage = useSetAtom(authPageAtom);
  const [formValues, setFormValues] = useAtom(signUpFormAtom);
  const setLogInValues = useSetAtom(loginFormAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const handleInputChange = useSetAtom(handleSignUpChangeAtom);
  const navigate = useNavigate();

  console.log(formValues);

  const accountTypes = [
    { value: "personal", label: "Personal" },
    { value: "organization", label: "Organization" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await register(formValues);
    setCurrentUser(user);
    setLogInValues("RESET");
    setFormValues("RESET");
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
        label="Email*"
        variant="outlined"
        onChange={handleInputChange}
      />
      <TextField
        id="password"
        type="password"
        label="Password*"
        value={formValues.password}
        onChange={handleInputChange}
        variant="outlined"
      />
      <TextField
        id="name"
        label="Name*"
        variant="outlined"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <TextField
        id="profilePicture"
        label="Profile Picture"
        value={formValues.profilePicture}
        variant="outlined"
        onChange={handleInputChange}
      />
      <TextField
        id="accountType"
        defaultValue="personal"
        value={formValues.accountType}
        select
        onChange={handleInputChange}
        label="Type of account*"
      >
        {accountTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Link
        onClick={() => {
          setAuthPage("login");
        }}
        sx={{ textAlign: "center", cursor: "pointer" }}
      >
        Already got an account? Log in here!
      </Link>
      <Button
        sx={{ maxWidth: "30%", height: 60 }}
        variant="contained"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUpForm;
