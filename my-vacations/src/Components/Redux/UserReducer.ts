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
  return { type: UserActionType.downloadUsers, payload: user };
};
export const isLoggedIn = (isLoggedIn: boolean): UserAction => {
  return { type: UserActionType.isLoggedIn, payload: isLoggedIn };
};
export const updateLikes = (likes: number[]): UserAction => {
  console.log("updateLikes called with likes: ", likes);
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
      const user = action.payload;
      const likedVacationsString = user.likedVacations || "[]";
      const likedVacations = JSON.parse(likedVacationsString) as number[];
      const userWithLikedVacations = { ...user, likedVacations };
      newState.user = [userWithLikedVacations];
      break;
    case UserActionType.isLoggedIn:
      newState.isLoggedIn = action.payload;
      if (!action.payload) {
        newState.user = [];
      }
      break;
    case UserActionType.updateLikes:
      const updatedUser = { ...newState.user[0] };
      const likedVacationId = action.payload[0] || 0;
      const updatedLikedVacations = [...updatedUser.likedVacations];

      if (updatedLikedVacations.includes(likedVacationId)) {
        // Remove the vacation ID if it already exists
        updatedLikedVacations.splice(
          updatedLikedVacations.indexOf(likedVacationId),
          1
        );
      } else {
        // Add the vacation ID if it doesn't exist
        updatedLikedVacations.push(likedVacationId);
      }

      updatedUser.likedVacations = updatedLikedVacations;
      newState.user = [updatedUser];
      return { ...newState };
    default:
      break;
  }
  return newState;
}
