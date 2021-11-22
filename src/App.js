import './App.css';
import { Button, Table, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useLayoutEffect } from 'react';
import PdfReader from './PdfReader'

function requestApi() {
  return fetch('/test/wealth-common-gateway/finfit/questionnaire', {
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(res => {
    return res.json()
  })
}

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

  const pdfDocs = [
    {name: 'pdf document 1', value: 'pdf00001'},
    {name: 'pdf document 2', value: 'pdf00002'},
    {name: 'pdf document 3', value: 'pdf00003'}
  ];
  const [rmBoardShow, setRmBoardShow] = useState(false);
  const [dataStr, setDataStr] = useState('');
  const [docid, setDocid] = useState('');

  useLayoutEffect(() => {
    async function fetchData() {
      const res = await requestApi();
      setDataStr(JSON.stringify(res));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Container>
        <section>
          <h2>request api result</h2>
          <p>{dataStr}</p>
        </section>
        <ul>
          {pdfDocs.map(doc => <li key={doc.value} onClick={() => setDocid(doc.value)}>{doc.name}</li>)}
        </ul>
        <PdfReader docid={docid} width={1200} height={800}/>
      </Container>
    </div>
  );
}

export default App;
