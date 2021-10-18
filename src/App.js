import logo from './logo.svg';
import './App.css';
import { Button, Alert, Table, Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function UpdateSuccessPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reminder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please remind customer</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function RmOperationBoard (props) {
  
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Alert variant={'success'}>
        This is a demo of table.
      </Alert>
        {/* Table content with button and click simple js function */}

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>NA</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td><Button variant="danger" onClick={() => setModalShow(true)}>Sign</Button></td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
              <td><Button variant="danger" onClick={() => setModalShow(true)}>Sign</Button></td>
            </tr>
          </tbody>
        </Table>

        <UpdateSuccessPopup show={modalShow} onHide={() => setModalShow(false)} />
      </>
  )
}
 
function App() {

  const [rmBoardShow, setRmBoardShow] = useState(false);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <>
      <Container>
        <Row>
          <Col sm={10}>
            { rmBoardShow ? 
            <RmOperationBoard />
            :
            <video src="20181229093311.mp4" width="500" height="300" controls></video> 
             }
          </Col>
          <Col sm={2} style={{'background-color': '#8F793A', "border":"1px solid"}}>头像头像头像</Col>
        </Row>
        <Row>
          <Col style={{'background-color': '#8F793A', "border":"1px solid", "height": "50px", "margin-top": "5px"}}>
            操作面板 &nbsp;&nbsp;
            { !rmBoardShow ? <Button variant="danger" onClick={() => setRmBoardShow(true)}>换操作页面</Button>
            : 
            <Button variant="danger" onClick={() => setRmBoardShow(false)}>换投屏</Button>
            }
          </Col>
        </Row>
      </Container>

      
      </>
      
    </div>
  );
}

export default App;
