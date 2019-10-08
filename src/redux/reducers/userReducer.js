import Axios from "axios"

const initialState = {
    user: {}
    // usersPosts:[]
}
//constants

const UPDATE_USER = "UPDATE_USER"
// const USER_POSTS="USER_POSTS"
//action creator

export function updateUser(user) {
    console.log(user)
    return {
        type: UPDATE_USER,
        payload: user
    }
}
// export function userPosts() {
//     console.log('hit-2')
//     return {
//         type: USER_POSTS,
//         payload: Axios.get("/api/user/posts")
//     }
// }
//reducer

export default function reducer(state= initialState, action) {
    // console.log(action)
    switch(action.type) {
        case `${UPDATE_USER}`:
            return {
                ...state,
                user: action.payload
            }
        // case `${USER_POSTS}_FULFILLED`:
        //     console.log('hit')
        //     console.log(action.payload.data)
        //     return {
        //         ...state,
        //         usersPosts: action.payload.data
        //     }
        default: return state;
    }
}
