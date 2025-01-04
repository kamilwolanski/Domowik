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

export type EditUser = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type AddTransaction = {
  name: string;
  count: number;
  categoryId: number;
};

export enum TransactionCategoryType {
  Income,
  Expense,
}

export type TransactionCategory = {
  id: number;
  name: string;
  type: TransactionCategoryType;
};
