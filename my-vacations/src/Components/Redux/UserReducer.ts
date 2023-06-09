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
      const likedVacations = action.payload || [];

      if (likedVacations.length === 0) {
        // Reset likedVacations to an empty array if payload is empty
        updatedUser.likedVacations = [];
      } else {
        const updatedLikedVacations = [...updatedUser.likedVacations];

        likedVacations.forEach((id: number) => {
          if (updatedLikedVacations.includes(id)) {
            // Remove the vacation ID if it already exists
            updatedLikedVacations.splice(updatedLikedVacations.indexOf(id), 1);
          } else {
            // Add the vacation ID if it doesn't exist
            updatedLikedVacations.push(id);
          }
        });

        updatedUser.likedVacations = updatedLikedVacations;
      }

      newState.user = [updatedUser];
      return { ...newState };
    default:
      break;
  }
  return newState;
}
// const updatedUser = { ...newState.user[0] };
// const likedVacations = action.payload || [];
// const updatedLikedVacations = [...updatedUser.likedVacations];
// likedVacations.forEach((id: number) => {
//   if (updatedLikedVacations.includes(id)) {
//     updatedLikedVacations.splice(updatedLikedVacations.indexOf(id), 1);
//   } else {
//     updatedLikedVacations.push(id);
//   }
// });
// updatedUser.likedVacations = updatedLikedVacations;
// newState.user = [updatedUser];
// return { ...newState };
// if (action.payload.length > 0) {
//   console.log("action.payload: ", action.payload);
//   likedVacations.includes(action.payload)
//     ? (updatedUser.likedVacations = updatedUser.likedVacations.filter(
//         (id) => id !== action.payload
//       ))
//     : (updatedUser.likedVacations = [
//         ...updatedUser.likedVacations,
//         ...action.payload,
//       ]);
//   console.log("updatedUser.likedVacations: ", updatedUser.likedVacations);
// } else {
//   updatedUser.likedVacations = [];
// }
// newState.user = [updatedUser];
// return newState;

// const updatedUser = { ...newState.user[0] };
// const likedVacations = JSON.parse(
//   JSON.stringify(updatedUser.likedVacations)
// );
// action.payload.forEach((id: number) => {
//   if (likedVacations.includes(id)) {
//     likedVacations.splice(likedVacations.indexOf(id), 1);
//   } else {
//     likedVacations.push(id);
//   }
// });
// updatedUser.likedVacations = likedVacations;
// newState.user = [updatedUser];
