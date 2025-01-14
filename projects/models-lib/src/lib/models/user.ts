export interface User {
  id: string;
  roles: string[] | undefined;
  firstName: string;
  lastName: string;
  email: string;
 
}

export type Users = User[]