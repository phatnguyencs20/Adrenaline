import { createStore, combineReducers } from 'redux';

export interface UserState {
    _id: string;
    firstName: string;
    adafruitIOUsername: string;
    adafruitIOKey: string;
}

interface AppState {
    isLoggedIn: boolean;
    user: UserState | null;
}

const initialAppState: AppState = {
    isLoggedIn: false,
    user: null,
};

export const login = (user: UserState) => {
    return {
        type: 'LOGIN',
        payload: user,
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};

// Define the reducer function for updating the app state
function appReducer(state: AppState = initialAppState, action: any): AppState {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

// Combine the app reducer with any other reducers you might have
const rootReducer = combineReducers({
    app: appReducer,
});

// Define the store type and create the store
export type AppStore = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
