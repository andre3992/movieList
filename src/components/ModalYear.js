import { Modal } from "react-bootstrap";

import { useEffect, useState } from "react";
import close from "../assets/imagens/close.svg";
import line from "../assets/imagens/line.svg";

export default function ModalYear({ years, show, sendYears }) {
  const [movie, setMovie] = useState();

  return (
    <Modal
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      show={show}
    >
      <Modal.Body>
        <div className="year">Select a year</div>
        <div className={"modalHeader"}>
          {years.map((n) => {
            return (
              <div className="yearsList" onClick={() => sendYears(n)}>
                {n}
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
