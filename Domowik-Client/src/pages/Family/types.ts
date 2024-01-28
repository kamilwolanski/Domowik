export type FamilyMember = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  roleId: number;
};

export enum Role {
  User = 1,
  FamilyMember = 2,
  Head = 3,
}
