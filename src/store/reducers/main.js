import { LOG_IN, LOG_OUT, SEARCH } from "../actions/types/main";

const initialState = {
    user: null,
    searchQuery: "",
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

        case SEARCH: {
            return {
                ...state,
                searchQuery: action.payload,
            };
        }

        default:
            return state;
    }
}
