import React, { useState } from "react";
import "../styles/styles.css"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function Movie({ title, year, image, description }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const imageUrl = "https://image.tmdb.org/t/p/w300/";
  const formattedYear = year ? new Date(year).getFullYear() : "";
  return (
    <div>
      <div className="movie-title-div">
        <h3>{title}</h3>
      </div>

      <img src={`${imageUrl}${image}`} alt={`${title} poster`} />

      <h3>{formattedYear}</h3>

      <Button color="danger" onClick={toggle} className="description-button">
        Description
      </Button>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader color="danger" toggle={toggle}>
          {title ? title : "Title not available :("}
        </ModalHeader>
        <ModalBody>
          {description ? description : "Description not available :("}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Movie;
