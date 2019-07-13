export class User {
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;

    constructor({ name, lastname, email, username, password }) {
      this.name = name
      this.lastName = lastname
      this.email = email
      this.username = username
      this.password = password
    }
  }
  