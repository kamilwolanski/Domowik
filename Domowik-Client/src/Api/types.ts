export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterBody = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type CreateFamily = {
  name: string;
};

export type EditUser = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type AddUser = {
  email: string;
};

export type UpdateShoppingList = {
  name: string;
  count: number;
};
