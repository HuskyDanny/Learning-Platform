const initialState = {
  loggedIn: false,
  signupOpen: false,
  loginOpen: false,
  contactUsOpen: false,
  username: "",
  currentHits: [],
  likes: {}
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
    const likes = {};
    action.hits.map(hit => {
      if (!(hit.objectID in state.likes)) {
        likes[hit.objectID] = hit.likes;
      } else {
        likes[hit.objectID] = state.likes[hit.objectID];
      }
    });
    return {
      ...state,
      likes: likes,
      currentHits: action.hits
    };
  }
  if (action.type === "HANDLELIKE") {
    // return {
    //   ...state,
    //   currentHits: state.currentHits.map(hit => {
    //     if (hit.objectID !== action.id) {
    //       return hit;
    //     }
    //     return {
    //       ...hit,
    //       likes: hit.likes + 1
    //     };
    //   })
    // };

    return {
      ...state,
      likes: { ...state.likes, [action.id]: state.likes[action.id] + 1 }
    };
  }

  return state;
};

export default reducer;
