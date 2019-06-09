const initialState = {
  loggedIn: false,
  signupOpen: false,
  loginOpen: false,
  contactUsOpen: false,
  username: "",
  currentHits: [],
  currentBlog: {}
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      loggedIn: true,
      username: action.username
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      loggedIn: false,
      username: ""
    };
  }
  if (action.type === "SIGNUPMODAL") {
    return {
      ...state,
      signupOpen: !state.signupOpen
    };
  }
  if (action.type === "LOGINMODAL") {
    return {
      ...state,
      loginOpen: !state.loginOpen
    };
  }
  if (action.type === "CONTACTMODAL") {
    return {
      ...state,
      contactUsOpen: !state.contactUsOpen
    };
  }
  if (action.type === "GETHITS") {
    return {
      ...state,
      currentHits: action.hits
    };
  }

  return state;
};

export default reducer;
