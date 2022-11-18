export interface User {
  id: string;
  avatar?: string;
  disabled: boolean;
  email: string;
  firstName: string;
  gender?: "F" | "M" | "NC";
  lastName: string;
  role: string;
}


export interface Collaborator {
  name: string;
  email: string;
  mobile: string;
  cpf: string;
}