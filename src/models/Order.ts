import { Ingredient } from "./Ingredient";

export interface Owner {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  ingredients: Ingredient[];
  _id: string;
  owner: Owner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}
