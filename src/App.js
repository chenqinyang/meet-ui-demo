import './App.css';
import { Button, Table, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useLayoutEffect } from 'react';
import PdfReader from './PdfReader'

function requestApi() {
  return fetch('https://investments.personal-banking.hsbc.com.cn/group-fhc-gateway-war/gateway/sfp/financial-simulators/wealth?jsonData=%7B%22serviceContext%22%3A%7B%22businessLine%22%3A%22PFS%22%2C%22businessOpUnit%22%3A%22%22%2C%22channelId%22%3A%22OHI%22%2C%22countryCode%22%3A%22CN%22%2C%22deviceId%22%3A%22%22%2C%22groupMember%22%3A%22HSBC%22%2C%22hubUserId%22%3A%22%22%2C%22hubWorkstationId%22%3A%22%22%7D%2C%22localeCode%22%3A%22zh_CN%22%2C%22projectionType%22%3A%22D%22%2C%22projection%22%3A%5B%7B%22goalType%22%3A%22GROW_WLTH%22%2C%22goalSubtype%22%3A%22L%22%2C%22simulationCode%22%3A%22I%22%2C%22currency%22%3A%22CNY%22%2C%22investmentPeriod%22%3A1%2C%22riskLevel%22%3A%220%22%2C%22targetAmount%22%3A1000%2C%22fundAmount%22%3A0%2C%22regularContributionAmount%22%3A0%2C%22contributionFrequencyCode%22%3A%22ANNL%22%2C%22returnRateTypeCode%22%3A%22NOML%22%2C%22applyInflationIndicator%22%3A%22Y%22%2C%22fundAlreadySetAmount%22%3A2000%7D%5D%7D', {
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

  const pdfDocs = [
    {name: 'pdf document 1', value: 'pdf00001', number: 1, type: 'UT'},
    {name: 'pdf document 2', value: 'pdf00002', number: 2, type: 'QDII'},
    {name: 'pdf document 3', value: 'pdf00003', number: 3, type: 'INS'}
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
    <>
      {/* Table content with button and click simple js function */}

      <section>
        <h2>request api result</h2>
        <p>{dataStr}</p>
      </section>
      <ul>

      </ul>
      <PdfReader docid={docid} width={1200} height={800} />

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Product Type</th>
            <th>Sign</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pdfDocs.map(doc => 
          <>
            <tr>
              <td><span>{doc.number}</span></td>
              <td><span>{doc.name}</span></td>
              <td><span>{doc.type}</span></td>
              <td><Button variant="danger" onClick={() => setModalShow(true)}>Sign</Button></td>
              <td><Button variant="danger" onClick={() => setDocid(doc.value)}>Open PDF</Button></td>
            </tr>
          </>
          )}
      </tbody>
      </Table>
      <UpdateSuccessPopup show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}
 
function App() {

  

  return (
    <div className="App">
      <Container>
        <RmOperationBoard />
      </Container>
    </div>
  );
}

export default App;
