import "../src/styles/App.css";
import Header from "./components/Header";
import MovieTable from "./components/movieTable";
import "../src/styles/fonts.css";
import { useSelector } from "react-redux";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { GetMovies } from "./actions";

function App() {
  const [size, setSize] = useState(-1);
  const { loading, error, list } = GetMovies(size);
  const loader = useRef(null);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setSize((prev) => prev + 1);
    }
  }, []);

  const movies = useSelector((state) => state);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <>
      <Header />
      <div className="app">
        {Object.keys(movies).length > 0 ? <MovieTable /> : "Waiting for movies"}
        <div ref={loader}></div>
      </div>
    </>
  );
}

export default App;
