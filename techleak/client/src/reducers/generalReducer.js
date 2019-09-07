import getReputation from "../utils/getSumFromArray";

const initialState = {
  loggedIn: false,
  signupOpen: false,
  loginOpen: false,
  contactUsOpen: false,
  shareOpen: false,
  username: "",
  userID: "",
  likedPosts: [],
  likedPostsDetail: [],
  comments: [],
  replies: [],
  myPosts: [],
  myPostsDetail: [],
  filterPosts: [],
  postType: "",
  menu_class: "",
  avatar: "",
  likes: {},
  piginationNumber: 1,
  bio: "",
  reputation: 0,
  knowledge: 0
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
      avatar: action.avatar,
      likedPostsDetail: action.likedPostsDetail,
      myPostsDetail: action.myPostsDetail,
      bio: action.bio,
      reputation: getReputation(action.myPostsDetail, "likes"),
      knowledge: action.myPosts.length
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
      menu_class: "",
      likedPostsDetail: [],
      myPostsDetail: [],
      avatar: "",
      comments: [],
      replies: []
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

      for (const reply of replies) {
        if (reply) {
          tempReplies.push({ ...reply, commentRef: comment._id });
        }
      }
      return null;
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

  if (action.type === "REFRESHLIKES") {
    let temp = {};
    return {
      ...state,
      likes: temp
    };
  }

  if (action.type === "HANDLELIKE") {
    let temp = { ...state.likes };
    action.hits.map(hit => {
      if (temp[hit.objectID] === undefined) {
        temp[hit.objectID] = hit.likes;
      }
      return null;
    });
    return {
      ...state,
      likes: temp
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
  if (action.type === "HANDLELIKEPOSTS") {
    let temp = { ...state.likes };
    temp[action.id] += action.liked ? -1 : 1;
    //remove duplicates
    let newLikePosts = new Set([...state.likedPosts]);
    action.liked ? newLikePosts.delete(action.id) : newLikePosts.add(action.id);
    let newLikePostsDetail = new Set([...state.likedPostsDetail]);
    action.liked
      ? newLikePostsDetail.forEach(function(lPostDetail) {
          if (lPostDetail === null) {
            newLikePostsDetail.delete(lPostDetail);
          } else if (lPostDetail._id === action.id) {
            newLikePostsDetail.delete(lPostDetail);
          }
        })
      : newLikePostsDetail.add(action.rawPostData);
    return {
      ...state,
      likedPosts: [...newLikePosts],
      likedPostsDetail: [...newLikePostsDetail],
      likes: temp
    };
  }
  if (action.type === "UPDATEAVATAR") {
    return {
      ...state,
      avatar: action.avatar
    };
  }
  if (action.type === "USERMYPOSTSUPDATED") {
    return {
      ...state,
      myPosts: action.myPosts,
      myPostsDetail: action.myPostsDetail
    };
  }
  if (action.type === "USERLIKEDPOSTSUPDATED") {
    return {
      ...state,
      likedPosts: action.likedPosts,
      likedPostsDetail: action.likedPostsDetail
    };
  }
  if (action.type === "AUTHENTICATION_PASSWORD_RESET_CLEAR")
    if (action.type === "AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE") {
      return {
        ...state,
        isPasswordReset: false
      };
    }
  if (action.type === "AUTHENTICATION_PASSWORD_RESET_HASH_CREATED") {
    return {
      ...state,
      isPasswordReset: true
    };
  }
  if (action.type === "DELETEREPLY") {
    let temp = [...state.replies];
    temp = temp.filter(el => el._id !== action.id);
    return {
      ...state,
      replies: temp
    };
  }
  if (action.type === "DELETECOMMENT") {
    let temp = [...state.comments];
    temp = temp.filter(el => el._id !== action.id);
    return {
      ...state,
      comments: temp
    };
  }
  if (action.type === "UPDATEPOSTTYPE") {
    return {
      ...state,
      postType: action.postType
    };
  }
  if (action.type === "FILTERCHANGE") {
    return {
      ...state,
      filterPosts: action.filteredPostsDetail
    };
  }
  if (action.type === "REMOVELIKES") {
    return {
      ...state,
      likes: {}
    };
  }
  if (action.type === "PIGINATIONNUMBER") {
    return {
      ...state,
      piginationNumber: action.currRefinement
    };
  }
  if (action.type === "UPDATEBIO") {
    return {
      ...state,
      bio: action.bio
    };
  }
  return state;
};

export default reducer;
