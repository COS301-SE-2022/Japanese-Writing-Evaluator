export class SignUp
{
  static username: string;
  static email: string;
  static password: string;

  constructor(username: string, email: string, password: string)
  {
    SignUp.username = username;
    SignUp.email = email;
    SignUp.password = password;
  }

}

