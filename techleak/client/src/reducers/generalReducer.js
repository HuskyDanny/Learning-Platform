let initialState = {
  loggedIn: false,
  signupOpen: false,
  loginOpen: false,
  contactUsOpen: false,
  shareOpen: false,
  username: "",
  userID: "",
  likedPosts: [],
  comments: [],
  replies: [],
  myPosts: [],
  menu_class: "",
  avatar: ""
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      loggedIn: true,
      userID: action.userID,
      username: action.username,
      likedPosts: action.likedPosts,
      myPosts: action.myPosts,
      avatar: action.avatar
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      loggedIn: false,
      signupOpen: false,
      loginOpen: false,
      contactUsOpen: false,
      shareOpen: false,
      username: "",
      userID: "",
      likedPosts: [],
      myPosts: [],
      menu_class: ""
    };
  }
  if (action.type === "SIGNUPMODAL") {
    //Here, after submit or even close, we
    //will redirect to login modal

    return {
      ...state,
      loginOpen: state.signupOpen,
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
  if (action.type === "SHAREMODAL") {
    return {
      ...state,
      shareOpen: !state.shareOpen
    };
  }
  if (action.type === "TOGGLEMENUCLASS") {
    return {
      ...state,
      menu_class: state.menu_class === "" ? "toggled" : ""
    };
  }
  if (action.type === "GETBLOG") {
    let tempComments = [];
    let tempReplies = [];
    action.blog.comments.map(comment => {
      const { replies, ...clone } = comment;
      tempComments.push({ ...clone });
      if (replies.length > 0) {
        tempReplies.push({ ...replies[0], commentRef: comment._id });
      }
    });

    return {
      ...state,
      comments: tempComments,
      replies: tempReplies
    };
  }
  if (action.type === "ADDCOMMENT") {
    let temp = [...state.comments];
    temp.push(action.comment);

    return {
      ...state,
      comments: temp
    };
  }

  if (action.type === "ADDREPLY") {
    let temp = [...state.replies];
    temp.push(action.reply);

    return {
      ...state,
      replies: temp
    };
  }
  if (action.type === "HANDLELIKE") {
    //remove duplicates
    let newLikePosts = new Set([...state.likedPosts]);
    action.liked ? newLikePosts.delete(action.id) : newLikePosts.add(action.id);
    return {
      ...state,
      likedPosts: [...newLikePosts]
    };
  }
  if (action.type === "UPDATEAVATAR") {
    return {
      ...state,
      avatar: action.avatar
    };
  }

  if (action.type === "PUBLISHEDNEWPOST") {
    return {
      ...state,
      myPosts: action.myPosts
    };
  }
  if (action.type === "USERLIKEDPOSTSUPDATED") {
    return {
      ...state,
      likedPosts: action.likedPosts
    };
  }

  return state;
};

export default reducer;
