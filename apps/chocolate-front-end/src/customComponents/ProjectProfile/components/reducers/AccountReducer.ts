import type { StateType,ActionType, UnsetS } from "./AccountReducer.types";

// selected or unselected
//  selected: 
//     unset: go back to unselected.
//  unselected:
//     set: set account.



// Default.
export const unselectedState = { state: "unselected", addr: null , keyring: null} as UnsetS;
export function AccountReducer(state: StateType, action: ActionType): StateType{
    switch (action.type) {
        case "set":
            return {state: "selected",addr: action.addr, keyring: action.keyring};
        case "unset":
            return unselectedState;
        default:
            return unselectedState;
            break;
    }
}