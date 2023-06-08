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

export const vacationLikes = (likes: number[]): VacationAction => {
  return { type: VacationActionType.vacationLikes, payload: likes };
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
    // case VacationActionType.vacationLikes:
    //   const updatedVacation = {
    //     ...newState.vacations.find((v) => v.id === action.payload[0]),
    //   };
    //   updatedVacation.likes = action.payload[1];
  }

  return newState;
}
