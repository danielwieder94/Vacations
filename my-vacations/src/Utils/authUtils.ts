import { useEffect, useMemo } from "react";
import { vacationlyStore } from "../Components/Redux/VacationlyStore";

// const userLoggedIn = vacationlyStore.getState().users.isLoggedIn;
//   const userIsAdmin = () => {
//     if (userLoggedIn) {
//       const user = vacationlyStore.getState().users.user[0];
//       return user.isAdmin;
//     } else {
//       return false;
//     }
//   };

export const userLoggedIn = () => {
  return vacationlyStore.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  console.log("userIsAdmin called....");
  if (loggedIn) {
    const user = vacationlyStore.getState().users.user[0];
    console.log("user logged in is admin?", user.isAdmin);
    return user.isAdmin;
  } else {
    return false;
  }
}
