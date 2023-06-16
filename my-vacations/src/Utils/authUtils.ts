import { vacationlyStore } from "../Components/Redux/VacationlyStore";

export const userLoggedIn = () => {
  return vacationlyStore.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();
  if (loggedIn) {
    const user = vacationlyStore.getState().users.user[0];
    return user.isAdmin;
  } else {
    return false;
  }
}
