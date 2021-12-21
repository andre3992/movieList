import axios from "axios";

export function getSortedList() {
  return axios
    .get("http://movie-challenge-api-xpand.azurewebsites.net/api/movies")
    .then((resp) => {
      return resp.data.content;
    });
}
