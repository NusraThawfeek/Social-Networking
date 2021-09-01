export const initialState = null;

export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload
    }
    if (action.type === "CLEAR") {
        return null;
    }
    if (action.type === "UPDATE") {
        return {
            ...state,//spread old state
            followers: action.payload.followers,
            following: action.payload.following
        }

    }
    if (action.type === "PROFILE") {
        return {
            ...state,//spread old state
            profilePic:action.payload.profilePic
        }
    }
    return state
}
//The reducer function receives an action, which is executed by a dispatch function.