export interface UserDTO {
  _id?: string;
  username: string;
  password: string;
  admin: boolean;
  guest?: boolean;
}
