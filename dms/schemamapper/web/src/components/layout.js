import styles from './layout.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import BannerLogin from './bannerLogin';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

import ChatBot from 'react-simple-chatbot';

const name = 'Kraken3xplorer'
export const siteTitle = 'Kraken3xplorer'
export default function Layout({ children, home, login }) {
    const history = useHistory()
    const [user, setUser] = useState({})

    function SignIn(e) {
        e.preventDefault()
        history.push('/login')
    }

    // useEffect(() => {
    //     Auth.currentAuthenticatedUser()
    //         .then(
    //             newuser => {
    //                 console.log(newuser.attributes.email);
    //                 setUser(user => {
    //                     return newuser.attributes.email
    //                 });
    //             }
    //         ).catch(err => console.log(err));
    // },[]);


    function showDetails(e) {
        window.location.href = "/"
    }
    return (
        <div className={styles.container}>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">
                    <Nav.Link href="/">
                        <Image
                            priority
                            src="/kraken.png"
                            className="borderCircle"
                            height={50}
                            width={50}
                            alt={name}
                        />
                    </Nav.Link>

                </Navbar.Brand>
                <Navbar.Text>
                    <span className="bannerText">Schema mapper</span>
                </Navbar.Text>
                <Navbar.Toggle aria-controls="navbarScroll" />
                {/* <Nav.Link href="#" disabled>
                    Link
                </Nav.Link> */}
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link> */}

                    </Nav>

                    {/* <Form className="d-flex justify-content-end">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}
                    <Nav className="w-100 justify-content-end">

                        {/* {!login && (
                                    <BannerLogin ></BannerLogin>
                            )} */}

                        {/* <BannerLogin ></BannerLogin> */}

                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
            <Container>
                <Row>
                    {/* <Col md={2}>
                        <Card>
                            <Card.Title><label>click to view details</label></Card.Title>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item action onClick={e => showDetails(e)}>Connections</ListGroup.Item>
                                    <ListGroup.Item>Schemas</ListGroup.Item>
                                    <ListGroup.Item>Graphs</ListGroup.Item>
                                    <ListGroup.Item>Datasets</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col> */}
                    <Col>
                        <main>{children}</main>
                    </Col>
                </Row>
            </Container>
            {/* {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )} */}
            {/* <div className="charBotOverlay">
                <ChatBot
                    steps={[
                        {
                            id: '1',
                            message: 'What is your name?',
                            trigger: '2',
                        },
                        {
                            id: '2',
                            user: true,
                            trigger: '3',
                        },
                        {
                            id: '3',
                            message: 'Hi {previousValue}, nice to meet you!',
                            end: true,
                        },
                    ]}
                />
            </div> */}
            <hr />
            <footer class="footer">
                <div class="container">
                    <p> &copy; 2021 Neptune Developer
                        <br />
                        <a href="mailto:neptune-developer-feedbac@amazon.com">neptune-developer-feedback@amazon.com</a>
                    </p>
                </div>
            </footer>

        </div>
    )
}


Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_OWNcr25Bc',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '5bqevntpu9os55uuppkpuupfma',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "strict" | "lax",
        // // OPTIONAL - Cookie secure flag
        // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        //storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'your_cognito_domain',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

// You can get the current config object
const currentConfig = Auth.configure();
