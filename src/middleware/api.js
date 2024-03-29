import axios from "axios";
import { API } from "../actions/types";
import { accessDenied, apiError } from "../actions/api";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type !== API) return;

    const { url, method, data, accessToken, onSuccess, onFailure, headers } =
      action.payload;
    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    axios
      .request({
        url,
        method,
        headers,
        [dataOrParams]: data,
      })
      .then(({ data }) => {
        dispatch(onSuccess(data));
      })
      .catch((error) => {
        dispatch(apiError(error));
        dispatch(onFailure(error));
        if (error.response && error.response.status === 403) {
          dispatch(accessDenied(window.location.pathname));
        }
      });
  };

export default apiMiddleware;
