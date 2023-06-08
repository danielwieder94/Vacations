import User from "../../Model/User";

export class UserState {
  public user: User[] = [];
  public isLoggedIn: boolean = false;
}

export enum UserActionType {
  addUser = "addUser",
  downloadUsers = "downloadUsers",
  isLoggedIn = "isLoggedIn",
  updateLikes = "updateLikes",
}

export interface UserAction {
  type: UserActionType;
  payload?: any;
}

export const addUser = (newUser: User): UserAction => {
  const initials = (
    newUser.firstName.charAt(0) + newUser.lastName.charAt(0)
  ).toUpperCase();
  const userWithInitials = { ...newUser, initials: initials };
  return { type: UserActionType.addUser, payload: userWithInitials };
};

export const downloadUsers = (user: User): UserAction => {
  console.log("Trying to download user: ", user);
  return { type: UserActionType.downloadUsers, payload: user };
};
export const isLoggedIn = (isLoggedIn: boolean): UserAction => {
  return { type: UserActionType.isLoggedIn, payload: isLoggedIn };
};
export const updateLikes = (likes: number[]): UserAction => {
  return { type: UserActionType.updateLikes, payload: likes };
};

export function userReducer(
  currentState: UserState = new UserState(),
  action: UserAction
): UserState {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionType.addUser:
      newState.user = [...newState.user, action.payload];
      break;
    case UserActionType.downloadUsers:
      newState.user = [action.payload];
      console.log("downloadUsers called with payload: ", action.payload);
      break;
    case UserActionType.isLoggedIn:
      newState.isLoggedIn = action.payload;
      if (!action.payload) {
        newState.user = [];
      }
      break;
    case UserActionType.updateLikes:
      const updatedUser = { ...newState.user[0] };
      if (action.payload.length > 0) {
        updatedUser.likedVacations = action.payload;
      } else {
        updatedUser.likedVacations = [];
      }
      return { ...newState, user: [updatedUser] };
    default:
      break;
  }
  return newState;
}
