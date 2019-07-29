export function openDisplay() {
  return {
    type: "OPEN_DISPLAY",
    payload: null
  }
}

export function closeDisplay() {
  return {
    type: "CLOSE_DISPLAY",
    payload: null
  }
}

export function addTag(tag) {
  return {
    type: "HANDLE_SELECT",
    payload: tag
  }
}

export function removeTag(tag) {
  return {
    type: "HANDLE_REMOVE",
    payload: tag
  }
}

export function handlePosted() {
  return {
    type: "HANDLE_POSTED",
    payload: null
  }
}