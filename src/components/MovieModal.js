import { Modal } from "react-bootstrap";
import { getMovieDetails } from "../actions";
import { useEffect, useState } from "react";
import close from "../assets/imagens/close.svg";
import line from "../assets/imagens/line.svg";

export default function MovieModal({ show, onHide, setShow, data }) {
  const [movie, setMovie] = useState();
  useEffect(() => {
    let moviePromise = getMovieDetails(data.id);
    Promise.resolve(moviePromise).then((resp) => {
      setMovie(resp);
    });
  }, []);

  const handleClose = () => setShow(false);

  return (
    <>
      {movie ? (
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Body>
            <div className={"modalHeader"}>
              <div>{movie.title} </div>

              <div className="closeButton">
                <img src={close} alt="close" onClick={() => handleClose()} />
                <br />
                CLOSE
              </div>
            </div>
            <div>
              <img src={line} alt="line" />
            </div>
            <div>
              <div className="secondTitle">Year</div>
              <div className="information">{movie.year}</div>
            </div>
            <div>
              <div className="secondTitle">Genre</div>
              <div className="information">{movie.genre}</div>
            </div>
            <div>
              <div className="secondTitle">Description</div>
              <div className="information">{movie.description}</div>
            </div>
            <div className="cast">
              <div>
                <div className="secondTitle">Director</div>
                <div className="information textBlue">{movie.director}</div>
              </div>
              <div className="marginActors">
                <div className="secondTitle">Actors</div>
                <div className="information textBlue">{movie.actors}</div>
              </div>
            </div>
            <div>
              <div className="secondTitle">Runtime</div>
              <div className="information">{movie.runtime}</div>
            </div>
            <div>
              <div className="secondTitle">Ratings</div>
              <div className="information">{movie.rating}</div>
            </div>
            <div>
              <div className="secondTitle">Votes</div>
              <div className="information">{movie.votes}</div>
            </div>
            <div>
              <div className="secondTitle">Revenue</div>
              <div className="information">${movie.revenue}</div>
            </div>
            <div>
              <div className="secondTitle">Metascore</div>
              <div className="information">{movie.metascore}</div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
