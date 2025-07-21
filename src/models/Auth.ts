export interface User {
  "email": string, 
  "password": string, 
  "name": string, 
}

export type UserWithoutPassword = Omit<User, "password">;
