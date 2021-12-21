import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalYear from "./ModalYear";
import MovieModal from "./MovieModal";
import React, { useState, useEffect } from "react";
import eye from "../assets/imagens/eye.png";
import back from "../assets/imagens/back.svg";
import { getSortedList } from "../actions/sortedMovies";

function MovieTable() {
  const movies = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [data, setData] = useState();
  const [list, setList] = useState();
  const [showList, setShowList] = useState(false);
  const [showMovies, setShowMovies] = useState(true);
  const [showMoviesYear, setShowMoviesYear] = useState(false);
  const [year, setYear] = useState();
  const [years, setYears] = useState(false);

  const sendYears = (year) => {
    setYear(year);
    setShowYears(false);
    setShowMoviesYear(true);
    setShowMovies(false);
    setShowList(false);
  };

  const filterByYear = (list, yearChoosed) => {
    let moviesYear = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].year === yearChoosed) {
        moviesYear.push(list[i]);
      }
    }
    return moviesYear;
  };

  const handleShow = (data) => {
    setData(data);
    setShow(true);
  };

  const whichList = (n) => {
    if (n === "top10") {
      setShowMovies(false);
      setShowList(true);
      setShowMoviesYear(false);
    } else if (n === "revenue") {
      setShowYears(true);
    } else if (n === "original") {
      setShowMovies(true);
      setShowList(false);
      setShowMoviesYear(false);
    }
  };
  useEffect(() => {
    let listPromise = getSortedList();
    Promise.resolve(listPromise).then((resp) => {
      setList(
        resp.sort(function (a, b) {
          return b.revenue - a.revenue;
        })
      );
      const uniqueYears = [...new Set(resp.map((obj) => obj.year))];
      setYears(
        uniqueYears.sort(function (a, b) {
          return b - a;
        })
      );
    });
  }, []);

  return (
    <>
      {showYears ? (
        <ModalYear
          sendYears={sendYears}
          show={showYears}
          years={years}
        ></ModalYear>
      ) : (
        ""
      )}
      <div className="topRow marginTop">
        <h1 className="">Movie ranking</h1>
      </div>
      <div className="topRow marginTop alignButtons ">
        <button
          className="buttonTop10 buttonStyle"
          onClick={() => {
            whichList("top10");
          }}
        >
          Top 10 Revenue
        </button>
        <button
          className={`buttonRevenue buttonStyle ${
            showYears ? " buttonBlue" : ""
          }`}
          onClick={() => whichList("revenue")}
        >
          Top 10 Revenue per Year
        </button>
        <div>
          <img
            src={back}
            alt="back"
            className="backButton"
            onClick={() => whichList("original")}
          />
        </div>
      </div>
      {show ? (
        <MovieModal
          show={show}
          setShow={setShow}
          handleShow={handleShow}
          data={data}
        ></MovieModal>
      ) : (
        ""
      )}
      <Table hover className="marginTop">
        <thead id="tableHeader">
          <tr>
            <th className="alignCenter">Ranking</th>
            <th className="alignLeft">Tittle</th>
            <th className="alignCenter">Year</th>
            <th className="alignLeft">Revenue</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showList
            ? list.slice(0, 10).map((n) => {
                return (
                  <tr key={n.id} id="tableBody">
                    <td className="alignCenter">{n.rank}</td>
                    <td className="alignLeft">{n.title}</td>
                    <td className="alignCenter">{n.year}</td>
                    <td className="alignLeft">${n.revenue}</td>
                    <td className="alignCenter">
                      <img
                        src={eye}
                        alt="Logo"
                        className="eye"
                        onClick={() => handleShow(n)}
                      />
                    </td>
                  </tr>
                );
              })
            : ""}
          {showMovies
            ? movies.data.map((n) => {
                return (
                  <tr key={n.id} id="tableBody">
                    <td className="alignCenter">{n.rank}</td>
                    <td className="alignLeft">{n.title}</td>
                    <td className="alignCenter">{n.year}</td>
                    <td className="alignLeft">${n.revenue}</td>
                    <td className="alignCenter">
                      <img
                        src={eye}
                        alt="Logo"
                        className="eye"
                        onClick={() => handleShow(n)}
                      />
                    </td>
                  </tr>
                );
              })
            : ""}
          {showMoviesYear
            ? filterByYear(list, year)
                .slice(0, 10)
                .map((n) => {
                  return (
                    <tr key={n.id} id="tableBody">
                      <td className="alignCenter">{n.rank}</td>
                      <td className="alignLeft">{n.title}</td>
                      <td className="alignCenter">{n.year}</td>
                      <td className="alignLeft">${n.revenue}</td>
                      <td className="alignCenter">
                        <img
                          src={eye}
                          alt="Logo"
                          className="eye"
                          onClick={() => handleShow(n)}
                        />
                      </td>
                    </tr>
                  );
                })
            : ""}
        </tbody>
      </Table>
    </>
  );
}

export default MovieTable;
