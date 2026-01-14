import { atom } from "jotai";
import { getCurrentEntity } from "../services/entity";

export const currentUserAtom = atom<any>(null);

export const initCurrentUserAtom = atom(null, async (_get, set) => {
  const entity = await getCurrentEntity();
  set(currentUserAtom, entity);
});

// const userCacheAtom = atom<any>(null);

// export const currentUserAtom = atom(
//   async (get) => {
//     const cached = get(userCacheAtom);
//     if (cached) return cached;

//     const fetched = await getCurrentEntity();
//     return fetched;
//   },
//   (_get, set, newUser) => {
//     set(userCacheAtom, newUser);
//   }
// );
