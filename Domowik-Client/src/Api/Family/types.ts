export type CreateFamily = {
  name: string;
};

export type FamilyMember = {
  dateOfBirth: Date;
  firstName: string;
  id: number;
  lastName: string;
  roleId: number;
};

export type Family = {
  headId: number;
  id: number;
  members: FamilyMember[];
  name: string;
};
