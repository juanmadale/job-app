

const JobsReducer = (state, action) => {
  switch(action.type) {
    case "UPDATE": 
      return {
        ...state,
        ...action.payload
      }
    case "SWITCH_FULL_TIME":
      if (state.fullTime === "off") return {
        ...state,
        fullTime: "on"
      }
      if (state.fullTime === "on") return {
        ...state,
        fullTime: "off"
      }
    case "HANDLE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default: 
      return state    
  }
}

export default JobsReducer;
