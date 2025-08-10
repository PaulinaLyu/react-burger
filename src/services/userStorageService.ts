import { UserWithoutPassword } from "../models";

const USER_KEY = "user";

export const userStorageService = {
  getUser() {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setUser(user: UserWithoutPassword) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
};
