export const ADD_PARENT_USER_START = "ADD_PARENT_USER_START";

export const addParentUser = input => dispatch => {
  console.log("in addParent action!");
  dispatch({ type: ADD_PARENT_USER_START, payload: input });
};
