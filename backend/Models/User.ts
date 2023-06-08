import Vacation from "./Vacation";

class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  likedVacations: number[];
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    likedVacations: number[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.likedVacations = likedVacations;
  }
}

export default User;
