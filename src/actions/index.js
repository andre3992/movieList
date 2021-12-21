import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SET_MOVIES, ADD_MOVIES, SORTED_MOVIES } from "./types";
import { useDispatch, useSelector } from "react-redux";

export function GetMovies(size) {
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state);

  useEffect(() => {}, [movies]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res =
        size !== -1
          ? await axios.get(
              `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${size}&size=20 `
            )
          : "";
      await dispatch({
        type: send ? ADD_MOVIES : SET_MOVIES,
        payload: res.data.content,
      });
      setSend(true);
    } catch (err) {
      setError(err);
    }
  }, [size]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, size]);

  return { error };
}

export const getMovieDetails = (id) => {
  return axios
    .get(
      `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${id}`,
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
