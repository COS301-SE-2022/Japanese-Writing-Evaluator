export class SignUp
{
  static username: string;
  static email: string;
  static password: string;

  constructor()
  {}

  static getData(username: string, email: string, password: string)
  {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
