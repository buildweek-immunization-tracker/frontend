import { ADD_PARENT_USER_START } from "../actions/";

const initialState = {
  user: "Dave",
  message: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PARENT_USER_START:
      console.log("In reducer: ", action.payload);
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
}
