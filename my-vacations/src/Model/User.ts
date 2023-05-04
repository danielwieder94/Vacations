import Vacation from "./Vacation";

class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  vacations: Vacation[];
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    vacations: Vacation[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.vacations = vacations;
  }
}

export default User;
