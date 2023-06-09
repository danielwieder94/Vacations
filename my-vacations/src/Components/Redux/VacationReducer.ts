import Vacation from "../../Model/Vacation";

export class VacationState {
  public vacations: Vacation[] = [];
}

export enum VacationActionType {
  addVacation = "AddVacation",
  downloadVacations = "DownloadVacations",
  updateVacation = "UpdateVacation",
  deleteVacation = "DeleteVacation",
  vacationLikes = "VacationLikes",
  vacationUnlike = "VacationUnlike",
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export const addVacation = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const downloadVacations = (vacations: Vacation[]): VacationAction => {
  return { type: VacationActionType.downloadVacations, payload: vacations };
};

export const updateVacation = (updatedVacation: Vacation): VacationAction => {
  return { type: VacationActionType.updateVacation, payload: updatedVacation };
};

export const deleteVacation = (id: number): VacationAction => {
  return { type: VacationActionType.deleteVacation, payload: id };
};

export const vacationLikes = (vacationId: number): VacationAction => {
  // console.log("ACTION - trying to like vacationId: ", vacationId);
  return { type: VacationActionType.vacationLikes, payload: vacationId };
};

export const vacationUnlike = (vacationId: number): VacationAction => {
  // console.log("ACTION - trying to unlike vacationId: ", vacationId);
  return { type: VacationActionType.vacationUnlike, payload: vacationId };
};

export function vacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.addVacation:
      return {
        ...currentState,
        vacations: [...newState.vacations, action.payload],
      };
    case VacationActionType.downloadVacations:
      return {
        ...currentState,
        vacations: action.payload,
      };

    case VacationActionType.updateVacation:
      const updatedIndex = newState.vacations.findIndex(
        (v) => v.id === action.payload.id
      );

      if (updatedIndex !== -1) {
        const updatedVacations = [...newState.vacations];
        updatedVacations[updatedIndex] = action.payload;
        newState.vacations = updatedVacations;
      }
      break;
    case VacationActionType.deleteVacation:
      newState.vacations = [...newState.vacations].filter(
        (v) => v.id !== action.payload
      );
      break;
    case VacationActionType.vacationLikes:
      const vacationId = action.payload;
      const updatedVacations = currentState.vacations.map((vacation) => {
        if (vacation.id === vacationId) {
          const updatedLikes = (vacation.likes || 0) + 1;
          return {
            ...vacation,
            likes: updatedLikes, // Increment the likes count
          };
        }
        return vacation;
      });

      return {
        ...currentState,
        vacations: updatedVacations,
      };
    case VacationActionType.vacationUnlike:
      const unlikedVacationId = action.payload;

      const unlikedVacations = currentState.vacations.map((vacation) => {
        if (vacation.id === unlikedVacationId) {
          const updatedLikes = (vacation.likes || 0) - 1;
          return {
            ...vacation,
            likes: updatedLikes, // Decrement the likes count
          };
        }
        return vacation;
      });
      return {
        ...currentState,
        vacations: unlikedVacations,
      };
    default:
      return currentState;
  }

  return newState;
}
