import Vacation from "../../Model/Vacation";

export class VacationState {
  public vacations: Vacation[] = [];
}

export enum VacationActionType {
  addVacation = "AddVacation",
  downloadVacations = "DownloadVacations",
  updateVacation = "UpdateVacation",
  deleteVacation = "DeleteVacation",
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export const addVacation = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.addVacation, payload: newVacation };
};

export const downloadVacations = (vacations: Vacation[]): VacationAction => {
  console.log("Trying to download vacations: ", vacations);
  return { type: VacationActionType.downloadVacations, payload: vacations };
};

export const updateVacation = (updatedVacation: Vacation): VacationAction => {
  return { type: VacationActionType.updateVacation, payload: updatedVacation };
};

export const deleteVacation = (id: number): VacationAction => {
  return { type: VacationActionType.deleteVacation, payload: id };
};

export function vacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  console.log(" currentState: " + currentState);
  console.log("action: ", action);
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.addVacation:
      newState.vacations = [...newState.vacations, action.payload];
      break;
    case VacationActionType.downloadVacations:
      console.log("DownloadVacations called with payload: " + action.payload);
      newState.vacations = action.payload;
      break;
    case VacationActionType.updateVacation:
      const index = newState.vacations.findIndex(
        (v) => v.id === action.payload.id
      );
      newState.vacations[index] = action.payload;
      break;
    case VacationActionType.deleteVacation:
      newState.vacations = [...newState.vacations].filter(
        (v) => v.id !== action.payload
      );
      break;
  }

  return newState;
}
