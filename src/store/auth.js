import { create } from "zustand";

export const useAuthStore = create((set) => ({
  username: "",
  password: "",
  setUsernameStore: (newUsername) => set({ username: newUsername }),
  setPasswordStore: (newPassword) => set({ password: newPassword }),
}));



// export const useCategoriesStore = create((set) => ({
//   username: "",
//   password: "",
//   setUsernameStore: (newUsername) => set({ username: newUsername }),
//   setPasswordStore: (newPassword) => set({ password: newPassword }),
// }));
