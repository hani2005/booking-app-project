export const actionType = {
  SET_USER: "SET_USER",
  SET_PLACES: "SET_PLACES",
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user
      }

      case actionType.SET_PLACES:
      return {
        ...state,
        places: action.places
      }
  }
}

export default reducer
