const initialState = {
  tags: [],
  hitsDisplay: false
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DISPLAY":
      state = {
        ...state,
        hitsDisplay: true
      }
      break;
    case "CLOSE_DISPLAY":
      state = {
        ...state,
        hitsDisplay: false
      }
      break;
    case "HANDLE_SELECT":
      state = {
        ...state,
        tags: [...state.tags, action.payload]
      }
      break;
    case "HANDLE_REMOVE":
      state = {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload)
      }
  }
  return state;
};

export default tagReducer;