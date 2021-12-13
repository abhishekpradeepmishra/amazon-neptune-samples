import './vacations.css';
import Layout, { siteTitle } from './layout'
import {
  Navbar, Nav, NavDropdown, Form, FormControl, Button, Card, Container
  , Row, Col, ListGroup, Dropdown, FloatingLabel, Image
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  Redirect,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";


import FileUpload from './fileupload';


function Schemas() {


  const history = useHistory();
  const [connections, setConnections] = useState([]);
  const [pageRefresh, setPageReferesh] = useState(false);
  // const { initVacations } = useVacations();

  useEffect(() => {
    // initVacations().then(res => {
    //   //console.log(res.length);
    //   setVacation(vacations => {
    //     return res;
    //   });
    // });
    var connectionsNew = [
      {
        id: "37dabab5-1693-4bbc-bbc3-1a4abdb93f76",
        title: "Connection2",
        type: "MySQL",
        description: "Connection1",
        sqlEndpoint: "ecommerce.cy3md3b35fci.us-west-2.rds.amazonaws.com",
        sqlPort: 3306
      }
    ];

    setConnections(connectionsNew);

  }, [pageRefresh]);

  var con = null;

  function loadSchemas(e) {
  }

  return (

    <Layout home>
      {/* <Head>
        <title>{siteTitle}</title>
      </Head> */}
      <Container fluid="md">
        {/* {connections.map((connection, index) => (
          <Row>
            <Col>
              <Card className="card">
                
                <Card.Body>
                  <Card.Title>{connection.title} | {connection.type}</Card.Title>
                  <Card.Text>
                    Endpoint: {connection.sqlEndpoint}
                  </Card.Text>
                  <Card.Text>
                    Port: {connection.sqlPort}
                  </Card.Text>
                  <Button variant="outline-secondary" connectionId={connection.id} onClick={e => loadSchemas(e)} >Load Schemas</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))} */}
        <Row>
          <Col>
            <div>
              <FileUpload></FileUpload>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Schemas;
