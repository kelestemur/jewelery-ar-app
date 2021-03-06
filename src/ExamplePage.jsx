import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, Button, Image, Col, Alert, Row } from 'react-bootstrap';
import ModalToMakeSelection from './Components/Modal.jsx';
import PhotoGallery from './Components/PhotoGallery.jsx';
import QRCode from 'qrcode.react';
import YouTube from 'react-youtube';

function ExamplePage() {

    const [modalShow, setModalShow] = React.useState(false);
    const [photoGalleryModalShow, setPhotoGalleryModalShow] = React.useState(false);
    const [id, setId] = React.useState("0ddbed79-a1be-4400-b690-99da7c9d4515")
    const [imageLink, setImageLink] = React.useState(null)

    const getTheId = (id) => {
        setId(id)
    }

    const getTheImageLink = (imageLink) => {
        setImageLink(imageLink)
    }

    const videoOptions = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };

      const onReady = (event) => {
        event.target.playVideo();
      }

    return (
        <>

            <Card >
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>Your Precious</Card.Title>
                    <Card.Text>
                        Enhance your jewelry experience with augmented reality!
           </Card.Text>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Customize
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="primary" onClick={() => setPhotoGalleryModalShow(true)}>
                        Photo Gallery
                  </Button>
                </Card.Body>
            </Card>
            <Row>
                <Col md={4}>
                    <Alert key={1} variant={'info'}>
                        <p>  Please follow the instructions below! </p>
                        <p>   1 - To pick your choices, press the customize button on the top.</p>
                        <p>   2 - Pick a symbol, and animation you'd like from the drop-down menu. (We don't have many choices currently, coming very soon...)</p>
                        <p>   3 - Upload a .mp3 format audio not more than 5MB (Real-time voice recording to upload is coming soon..) </p>
                        <p>   4- Once you are ready, click save, if no error 🤞, you are ready to scan the QR code </p>
                        <p>   5- Once you scan the code, it will take you to our camera web application </p>
                        <p>   6- Allow camera access, enable sound, and scan the symbol you have just picked with the your precious web app. </p>
                        <p>   7- You should be hearing the beutiful sound you have uploaded, and seeing the AR animation you have chosen!! </p>
                        <p>   Have fun !!! 🤗  </p>


                    </Alert>
                </Col>
                <ModalToMakeSelection
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    getid={getTheId}
                    getimagelink={getTheImageLink}

                />
                <PhotoGallery
                    show={photoGalleryModalShow}
                    onHide={() => setPhotoGalleryModalShow(false)}

                />
                <span>
                    <QRCode value={`https://kelestemur.github.io/The-Preciuos-Sound/#/${id}`} />

                    <Image src={imageLink} thumbnail />
                </span>

                <YouTube videoId="nBkXB3qUZgM" opts={videoOptions} onReady={(event) => onReady(event)} />
            </Row>
        </>

    );
}

export default ExamplePage;
