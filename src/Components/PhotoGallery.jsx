import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Gallery from 'react-photo-gallery';


function PhotoGallery(props) {

    const photos = [
        {
          src: 'https://precious-ar-engraving-photos.s3.us-east-2.amazonaws.com/IMG-0406.jpg',
          width: 4,
          height: 3
        },
        {
            src: 'https://precious-ar-engraving-photos.s3.us-east-2.amazonaws.com/dove-key-chain-engraving-anime.jpg',
            width: 3,
            height: 4
          },

      ];


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Samples
          </Modal.Title>

     
      </Modal.Header>
      <Modal.Body>
      <Gallery photos={photos} />
      </Modal.Body>
      <Modal.Footer>
 
      </Modal.Footer>
    </Modal>
  );
}

export default PhotoGallery;
