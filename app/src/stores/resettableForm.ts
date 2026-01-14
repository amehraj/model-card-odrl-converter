import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const resettableFormAtom = <T>(
  initialValue: T,
  locallyStoreKey?: string
) => {
  const baseAtom = locallyStoreKey
    ? atomWithStorage<T>(locallyStoreKey, initialValue)
    : atom<T>(initialValue);

  const resetAtom = atom(
    (get) => get(baseAtom),
    (_get, set, action: T | ((prevState: T) => T) | "RESET") => {
      if (action === "RESET") {
        set(baseAtom, initialValue);
      } else {
        set(baseAtom, action);
      }
    }
  );
  return resetAtom;
};
