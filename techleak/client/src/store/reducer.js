const initialState = {
  loggedIn: false,
  signupOpen: false,
  loginOpen: false,
  contactUsOpen: false,
  username: "",
  userID: "",
  likes: {},
  likedPosts: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      loggedIn: true,
      userID: action.userID,
      username: action.username,
      likedPosts: action.likedPosts
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
    let temp = { ...state.likes };
    action.hits.map(hit => {
      if (!(hit.objectID in temp)) {
        temp[hit.objectID] = hit.likes;
      }
    });
    return {
      ...state,
      likes: temp
    };
  }
  if (action.type === "HANDLELIKE") {
    const delta = action.liked ? -1 : 1;
    let newLikePosts = [...state.likedPosts];
    action.liked
      ? (newLikePosts = newLikePosts.filter(post => post !== action.id))
      : newLikePosts.push(action.id);

    return {
      ...state,
      likes: { ...state.likes, [action.id]: state.likes[action.id] + delta },
      likedPosts: newLikePosts
    };
  }

  return state;
};

export default reducer;
