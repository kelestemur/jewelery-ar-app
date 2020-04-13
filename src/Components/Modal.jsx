import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import S3FileUpload from 'react-s3';
import AnimationsDropdown from './AnimationsDropdown';
import SymbolsDropdown from './SymbolsDropdown';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ReactLoading from 'react-loading';

const mappingOfLinkNames =
{
  "Dove": "https://gift-audio-files.s3.us-east-2.amazonaws.com/pattern-dove-gray+(2).patt",
  "Galatasaray Logo": "https://gift-audio-files.s3.us-east-2.amazonaws.com/galatasary-logo.patt",
  "Music Notes": "https://gift-audio-files.s3.us-east-2.amazonaws.com/scene.gltf",
  "Robin Bird":"https://gift-audio-files.s3.us-east-2.amazonaws.com/robinBird.gltf",

}

const mappingOfImageLinksNames =
{
  "Dove": "https://gift-audio-files.s3.us-east-2.amazonaws.com/MarkerImages/pattern-dove-gray+(2).png",
  "Galatasaray Logo": "https://gift-audio-files.s3.us-east-2.amazonaws.com/MarkerImages/pattern-galatasaray-logo-vector.png",
}

function ModalToMakeSelection(props) {
  const isInitialMount = useRef(true);
  const [file, setFile] = useState({})
  const [link, setLink] = useState({
    Id: uuidv4(),
    AnimationLink: null,
    AudioLink: null,
    PatternLink: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const [invalidFileExtension, setInvalidFileExtension] = useState(false)

  useEffect(() => {
    props.getid(link.Id)
  }, [])

  useEffect(() => {
 
    if(file && file.name && link.AnimationLink && link.PatternLink)  
    {setSaveButtonEnabled(true)}
    else
    {
      setSaveButtonEnabled(false)
    }
  })

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      uploadLink(link)
    }
  }, [link.AudioLink]);

  const constructUploadLinkParameters = (link) => {
    var parameters = {
      Id: link.Id,
      AnimationLink: mappingOfLinkNames[`${link.AnimationLink}`],
      AudioLink: link.AudioLink,
      PatternLink: mappingOfLinkNames[`${link.PatternLink}`]
    }

    return parameters
  }

  const uploadLink = (link) => {
    setLoading(true)
    axios.post(`https://2eyfd024bh.execute-api.us-east-2.amazonaws.com/Stage/patterns`, constructUploadLinkParameters(link))
      .then(res => {
        setLoading(false)
        props.getimagelink(mappingOfImageLinksNames[`${link.PatternLink}`])
        console.log(`Uplaoded the links Successfully ${res}`)
      }).catch(error => {
        console.log(error)
        setError(error)
        setLoading(false)
      })
  }

  const getSelectedAnimationName = (selectedAnimation) => {
    setLink({ ...link, AnimationLink: selectedAnimation })

  }

  const getSelectedPatternName = (selectedPattern) => {
    setLink({ ...link, PatternLink: selectedPattern })
  }

  const getPresignedUrl = (file) => {
    setLoading(true)                                                       
    axios.get(`https://2eyfd024bh.execute-api.us-east-2.amazonaws.com/Stage/preSignedUrl?fileName=${file.name}`)
    .then(data => {
      setLoading(false)
      uploadFileToS3(data.data.fileUploadURL,file)
    }).catch(error => {
      console.log(error)
      setError(error)
      setLoading(false)
    })
  };

  const uploadFileToS3 = (preSignedUrl, file) => {
    setLoading(true)

    axios({
      method: "PUT",
      url: preSignedUrl,
      data: file,
      headers: { "Content-Type": "multipart/form-data" }
  })
      .then(res => {
        var baseAudioUrl = res.config.url.split(/[?#]/)[0] 
        setLink({ ...link, AudioLink: baseAudioUrl })
        setLoading(false)  
        props.onHide() // close the modal
        console.log(res)
      }).catch(error => {
        console.log(error)
        setError(error)
        setLoading(false)
      })
  };
  
  const saveOnClick = (event) => {
   // uploadFile(file, config)
    getPresignedUrl(file) // get presigned url, then upload
  }

  // this validation should be taken care of on the backend
  const fileUploaderOnChange = (event) => {
    let file = event.target.files[0]
    if(file && file.name.slice(-4).toString().toLowerCase() == ".mp3" && file.size < 5000000)
    {
      setInvalidFileExtension(false)
    setFile(event.target.files[0])
    }
    else 
    {
      setInvalidFileExtension(true)
    }

  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Personalization Panel
          </Modal.Title>
          {saveButtonEnabled ?
          <div></div> :
          <Alert key={1} variant={'warning'}>
          Please upload an audio file, pick your symbol, and pick your animation.
         </Alert> }
      </Modal.Header>
      <Modal.Body>
        <Row> <Col md={6}> <input type="file" onChange={(event) => fileUploaderOnChange(event)} ></input> </Col> <Col md={6}><SymbolsDropdown selectedPattern={link.PatternLink} setSelectedPattern={getSelectedPatternName} /></Col> </Row>
        <Row>  <Col md={6}><AnimationsDropdown selectedAnimation={link.AnimationLink} setSelectedAnimation={getSelectedAnimationName} /></Col> <Col md={6}><Image src={mappingOfImageLinksNames[`${link.PatternLink}`]} thumbnail /></Col> </Row>
        <Row>  <Col md={5}></Col> <Col md={6}>  {loading && !error && <ReactLoading type={"spinningBubbles"} color={"#868e96"} height={100} width={100} />} </Col> </Row>
      </Modal.Body>
      <Modal.Footer>
     { invalidFileExtension && <Alert key={2} variant={'danger'}>
          Audio file should be in .mp3 format, and less than 5 MB!
          </Alert> }
          { error && !loading && <Alert key={2} variant={'danger'}>
          Error occured while saving your choices. Please try again. 
          </Alert> }
        <Button variant="primary" onClick={saveOnClick} disabled={!saveButtonEnabled}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalToMakeSelection;
