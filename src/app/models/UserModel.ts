export class UserModel {
  id: string | undefined;
  username: string | undefined;
  displayName: string | undefined;
  roles: string[] | undefined;
  email: string | undefined;
  password: string | undefined;
  jwtToken: string | undefined;
  createdAt: string | undefined;
  modifiedAt: string | undefined;
}
