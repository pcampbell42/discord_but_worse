import { RECEIVE_CURRENT_USER, RECEIVE_CURRENT_USER_DETAILS } from "../../actions/session_actions";
import { RECEIVE_SERVER_DETAILS } from "../../actions/server_actions";
import { RECEIVE_TEXT_CHANNEL_DETAILS } from "../../actions/text_channel_actions";
import { RECEIVE_DIRECT_MESSAGE_DETAILS } from "../../actions/direct_message_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });

        case RECEIVE_SERVER_DETAILS:
            return Object.assign({}, state, action.details.users);

            // does this get used...
        case RECEIVE_TEXT_CHANNEL_DETAILS:
            return Object.assign({}, state, action.details.users);

            // does this get used...
        case RECEIVE_DIRECT_MESSAGE_DETAILS:
            return Object.assign({}, state, action.details.users);

        case RECEIVE_CURRENT_USER_DETAILS:
            return Object.assign({}, state, action.details.users)
    
        default:
            return state;
    }
}

export default usersReducer;