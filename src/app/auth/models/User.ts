export class User {
  userName: string;
  userSecondName: string;
  email: string;
  password: string;
  role;

  constructor(email: string, password: string,
              name: string = null, secondName: string = null, role = null) {
    this.userName = name;
    this.userSecondName = secondName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
