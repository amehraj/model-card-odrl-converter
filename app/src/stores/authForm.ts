import { atom, type PrimitiveAtom } from "jotai";
import { resettableFormAtom } from "./resettableForm";

export const createFormChangeAtom = <T extends Record<string, any>>(
  formAtom: PrimitiveAtom<T>
) => {
  return atom(
    null,
    (
      get,
      set,
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { id, value } = e.target;
      set(formAtom, {
        ...get(formAtom),
        [id]: value,
      });
    }
  );
};

export const loginFormAtom = resettableFormAtom<{
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});

export const signUpFormAtom = resettableFormAtom<{
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  accountType: "personal" | "organization";
}>({
  email: "",
  password: "",
  name: "",
  profilePicture: "",
  accountType: "personal",
});

export const handleLoginChangeAtom = createFormChangeAtom(loginFormAtom);
export const handleSignUpChangeAtom = createFormChangeAtom(signUpFormAtom);
