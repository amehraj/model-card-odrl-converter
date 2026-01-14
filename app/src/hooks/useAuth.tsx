import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { currentUserAtom, initCurrentUserAtom } from "../stores/currentUser";

const useAuth = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const setCurrentUser = useSetAtom(initCurrentUserAtom);

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser();
    }
  }, [currentUser, setCurrentUser]);

  return currentUser;
};

export default useAuth;
