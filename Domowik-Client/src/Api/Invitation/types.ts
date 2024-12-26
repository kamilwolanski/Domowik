export type Invitation = {
  id: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  familyName: string;
  sender: {
    firstName: string;
    lastName: string;
  };
};
