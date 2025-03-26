import React, { useState } from "react";
import "./styles.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function Movie({ title, year, image, description, className }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const imageUrl = "https://image.tmdb.org/t/p/w300/";

  return (
    <div>
      <div className="movie-title-div">
        <h3>{title}</h3>
      </div>

      <img src={`${imageUrl}${image}`} alt="poster" />

      <h3>
        {year &&
          year
            .split("")
            .splice(0, 4)
            .join("")}
      </h3>

      <Button color="danger" onClick={toggle} className="description-button">
        Description
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered>
        <ModalHeader color="danger" toggle={toggle}>
          {title ? title : 'Title not available :('}
        </ModalHeader>
        <ModalBody>{description ? description : 'Description not available :('}</ModalBody>
      </Modal>
    </div>
  );
}

export default Movie;
