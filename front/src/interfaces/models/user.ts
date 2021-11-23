export default interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  user_token?: string;
  roles: enRoles[];

  createdDate?: Date;
  updatedDate?: Date;
}

export enum enRoles {
  sysAdmin = 'sysAdmin',
  admin = 'admin',
  user = 'user'
}
