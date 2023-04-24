import Vacation from "../../Model/Vacation";

export class VacationState {
  public vacations: Vacation[] = [];
}

export enum VacationActionType {
  AddVacation = "AddVacation",
  DownloadVacations = "DownloadVacations",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
}

export interface VacationAction {
  type: VacationActionType;
  payload?: any;
}

export const addVacation = (newVacation: Vacation): VacationAction => {
  return { type: VacationActionType.AddVacation, payload: newVacation };
};

export const downloadVacations = (vacations: Vacation[]): VacationAction => {
  return { type: VacationActionType.DownloadVacations, payload: vacations };
};

export const updateVacation = (updatedVacation: Vacation): VacationAction => {
  return { type: VacationActionType.UpdateVacation, payload: updatedVacation };
};

export const deleteVacation = (id: number): VacationAction => {
  return { type: VacationActionType.DeleteVacation, payload: id };
};

export function vacationReducer(
  currentState: VacationState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionType.AddVacation:
      newState.vacations = [...newState.vacations, action.payload];
      break;
    case VacationActionType.DownloadVacations:
      newState.vacations = action.payload;
      break;
    case VacationActionType.UpdateVacation:
      const index = newState.vacations.findIndex(
        (v) => v.id === action.payload.id
      );
      newState.vacations[index] = action.payload;
      break;
    case VacationActionType.DeleteVacation:
      newState.vacations = [...newState.vacations].filter(
        (v) => v.id !== action.payload
      );
      break;
  }

  return newState;
}
