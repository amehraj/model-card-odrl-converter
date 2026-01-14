import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/entity";
import { currentUserAtom } from "../stores/currentUser";
import { useSetAtom } from "jotai";

const Logout = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    (async () => {
      await logout();
      setCurrentUser(null);
      setTimeout(() => {
        navigate("/public-model-cards", { replace: true });
      }, 0);
    })();
  }, [navigate]);

  return (
    <Typography variant="body1" gutterBottom>
      Logging out...
    </Typography>
  );
};

export default Logout;
