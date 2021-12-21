import {
  SET_MOVIES,
  ADD_MOVIES,
  API_START,
  API_END,
  FETCH_MOVIES,
  SORTED_MOVIES,
} from "../actions/types";

export default function rootreducer(state = {}, action) {
  switch (action.type) {
    case SET_MOVIES:
      return {
        data: action.payload,
      };
    case ADD_MOVIES:
      return {
        ...state,
        data: [...state.data.concat(action.payload)],
      };
    case SORTED_MOVIES:
      return {
        sorteData: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_MOVIES) {
        return {
          ...state,
        };
      }
      break;
    case API_END:
      if (action.payload === FETCH_MOVIES) {
        return {
          ...state,
        };
      }
      break;

    default:
      return state;
  }
}
