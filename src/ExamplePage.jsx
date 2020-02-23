import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Card,Button} from 'react-bootstrap';
import ModalToMakeSelection from './Components/Modal';

function ExamplePage() {

    const [modalShow, setModalShow] = React.useState(false);

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
                </Card.Body>
            </Card>

            <ModalToMakeSelection
                show={modalShow}
                onHide={() => setModalShow(false)}

            />
        </>

    );
}

export default ExamplePage;
