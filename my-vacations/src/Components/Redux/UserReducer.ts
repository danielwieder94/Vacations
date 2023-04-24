import User from "../../Model/User";

export class UserState {
  public users: User[] = [];
}

export enum UserActionType {
  AddUser = "AddUser",
  DownloadUsers = "DownloadUsers",
  isAdmin = "isAdmin",
}
