import Vacation from "./Vacation";

class User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  vacations: Vacation[];
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    vacations: Vacation[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.vacations = vacations;
  }
}

export default User;
