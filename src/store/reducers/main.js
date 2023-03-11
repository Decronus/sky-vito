import { LOG_IN, LOG_OUT } from "../actions/types/main";

const initialState = {
    user: null,
};

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                user: action.payload,
            };
        }

        case LOG_OUT: {
            return {
                ...state,
                user: null,
            };
        }

        default:
            return state;
    }
}
