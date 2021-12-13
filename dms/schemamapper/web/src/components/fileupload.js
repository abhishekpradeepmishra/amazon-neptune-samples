import axios from 'axios';
import React, { Component, useState } from 'react';
import {
    Navbar, Nav, NavDropdown, Form, FormControl, Button, Card, Container
    , Row, Col, ListGroup, Dropdown, FloatingLabel, Link, Image
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    // return the array
    return arr;
}




function FileUpload() {
    const [state, setState] = useState({
        selectedFile: null,
        root: null
    });

    const [showNewVertex, setShowNewVertex] = useState(false);
    const [showNewEdge, setShowNewEdge] = useState(false);
    const [tableList, setTableList] = useState([]);
    const [columnList, setColumnList] = useState([]);
    const [vertices, setVertices] = useState([]);
    const [edges, setEdges] = useState([]);


    const [pageRefresh, setPageReferesh] = useState(false);




    const [currentVertex, setCurrentVertex] = useState();

    function arrayToTree(array) {
        var root = {
            tables: []
        };

        array.forEach(element => {
            if (element.TABLE_NAME !== undefined && element.TABLE_NAME !== "")
                var refObject = null;
            refObject = root.tables.find(table => table.name === element.TABLE_NAME);

            if (refObject === undefined) {
                root.tables.push({
                    "name": element.TABLE_NAME
                })

                refObject = root.tables.find(table => table.name === element.TABLE_NAME);
                refObject.columns = [];
            }

            if (element.COLUMN_NAME !== undefined && element.COLUMN_NAME !== "") {
                refObject.columns.push(
                    {
                        name: element.COLUMN_NAME,
                        type: element.COLUMN_TYPE,
                        isnullable: element.IS_NULLABLE,
                        ordinal: element.ORDINAL_POSITION
                    }
                )
            }
        });

        console.log(root);
        return root;
    }

    // On file select (from the pop up)
    function onFileChange(e) {
        // Update the state
        setState({ selectedFile: e.target.files[0] });
    };

    // On file upload (click the upload button)
    // function  onFileChange() {

    //     // Create an object of formData
    //     const formData = new FormData();

    //     // Update the formData object
    //     formData.append(
    //         "myFile",
    //         state.selectedFile,
    //         state.selectedFile.name
    //     );

    //     // Details of the uploaded file
    //     console.log(state.selectedFile);

    //     // Request made to the backend api
    //     // Send formData object
    //     axios.post("api/uploadfile", formData);
    // };

    // File content to be displayed after
    // file upload is complete
    function fileData() {

        if (state.selectedFile) {

            const reader = new FileReader();
            reader.readAsText(state.selectedFile);
            reader.onload = function (event) {
                console.log(event.target.result); // the CSV content as string
                //alert(event.target.result);
                var resultArray = csvToArray(event.target.result);

                console.log(resultArray);
                //alert(JSON.stringify(resultArray));

                var resultTree = arrayToTree(resultArray);
                console.log(resultTree)
                //alert(JSON.stringify(resultTree));
                setState({
                    root: resultTree
                });

                setTableList(resultTree.tables);
            };

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {state.selectedFile.name}</p>
                    <p>File Type: {state.selectedFile.type}</p>
                </div>
            );
        }
        // else {
        //     return (
        //         <div>
        //             <br />
        //             <h4>Choose before Pressing the Upload button</h4>
        //         </div>
        //     );
        // }
    };

    function cancelAddNewVertex(){
        setCurrentVertex({});
        setShowNewVertex(false);
    }

    function SaveNewVertexMapping(e) {
        var vertexlabel = document.getElementById("formVLabel").value;
        var formVTables = document.getElementById("formVTables");
        var vertextable = formVTables.options[formVTables.selectedIndex].text;
        var propertyMappings = [];

        currentVertex.attributes.forEach((item, index) => {
            var propertyValueTemplate = document.getElementById(currentVertex.id + "-propertyValueTemplate-" + index);
            var vertexpropertyTemplate= propertyValueTemplate.options[propertyValueTemplate.selectedIndex].text;
            var vertexpropertyType= propertyValueTemplate.options[propertyValueTemplate.selectedIndex].type;

            var vertexpropertyName = document.getElementById(currentVertex.id + "-propertyName-"+ index).value;
            
            propertyMappings.push({
                property_value_template: vertexpropertyTemplate,
                property_name: vertexpropertyName,
                property_value_type: vertexpropertyType
            });

        })

        var propertyId = propertyMappings.find(property => (property.Name === "id"));

        setVertices([{
            "rule_id": uuidv4(),
            "rule_name": "vertex_mapping_rule_from_nodes" + uuidv4(),
            "table_name": vertextable,
            "vertex_definitions": [
                {
                    "vertex_id_template": "{vertex_id}".replace("vertex_id", propertyId),
                    "vertex_label": vertexlabel,
                    "vertex_definition_id": uuidv4(),
                    "vertex_properties": propertyMappings
                }
            ]
        }, ...vertices]);

        setCurrentVertex({});
        setShowNewVertex(false);
    }

    function addNewVertexAttribute(e, vertexid) {
        //var vertex = vertices.find(vertex => (vertex.id === vertexid));
        //vertex.attributes.push({});
        // var vertex = {
        //     label: "",
        //     id: uuidv4(),
        //     attributes: [{},{}]
        // };

        var vertex = JSON.parse(JSON.stringify(currentVertex));
        vertex.attributes.push({ key: "", value: "" })

        setCurrentVertex(vertex);
    }

    function addNewEdge(e) {
        // setShowNewEdge(true)
    }

    function updateColumList(e) {
        var formVTables = document.getElementById("formVTables");
        var tableName = formVTables.options[formVTables.selectedIndex].text;

        var columns = state.root.tables.find(table => (table.name === tableName)).columns;
        setColumnList(columns);

        var vertex = {
            label: "",
            id: uuidv4(),
            attributes: [{ key: "id", value: "" }]
        };

        setCurrentVertex(vertex);
        // setVertices([vertex, ...vertices])
    }

    return (

        <Row>
            <Col>
                <h1>
                    Upload Schema for your database tables as csv
                </h1>
                <div>
                    <input className="primary" type="file" onChange={e => onFileChange(e)} />
                    {/* <button onClick={onFileUpload}>
                        Upload!
                    </button> */}
                </div>
                {fileData()}
                <hr />
                <Row>
                    <Col md={3}>
                        <Card>
                            <Card.Title>
                                SQL Schema
                            </Card.Title>
                            <Card.Body>
                                {state.root?.tables?.map((table, index) => (
                                    <div>
                                        <h3>{table.name}</h3>
                                        <div>
                                            {table.columns?.map((column, index) => (
                                                <div className="tree-depth-1">
                                                    <div><b>{column.name}</b>, {column.type}, {column.isnullable}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Title>
                                Graph Mappings
                            </Card.Title>
                            <Card.Body>
                                <div className="alignRight">
                                    <Button variant="primary" onClick={e => setShowNewVertex(true)}>Add Vertex</Button> &nbsp; <Button variant="primary">Add Edge</Button>
                                </div>

                                <div>
                                    {showNewVertex > 0 &&
                                        <Card>
                                            <Card.Title>
                                                New Vertex
                                            </Card.Title>
                                            <Card.Body>
                                                <div className="NCForm">
                                                    <Form>
                                                        <Form.Group className="mb-3" controlId="formVLabel">
                                                            <Form.Label>Label</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter title" />
                                                            <Form.Text className="text-muted">
                                                                Enter Label as per graph model
                                                            </Form.Text>
                                                        </Form.Group>
                                                        <Form.Group className="mb-1" controlId="formVTables">
                                                            <Form.Label>Column name</Form.Label>
                                                            <Form.Select aria-label="Default select example" onChange={e => updateColumList(e)}>
                                                                <option>Select table</option>
                                                                {tableList.map((table, index) => (
                                                                    <option>{table.name}</option>
                                                                ))}
                                                            </Form.Select>

                                                            <Form.Text className="text-muted">
                                                                Select Table Or Vertex
                                                            </Form.Text>
                                                        </Form.Group>
                                                        {currentVertex !== undefined &&
                                                            <Row>
                                                                <Col class="rightAlign">
                                                                    <Button variant="primary" onClick={e => addNewVertexAttribute(e, currentVertex?.id)}>new attribute</Button>
                                                                </Col>
                                                            </Row>
                                                        }

                                                        {currentVertex?.attributes?.map((attribute, index) => (
                                                            <Row>
                                                                <Col>
                                                                    <Form.Group className="mb-1" controlId={currentVertex?.id + "-propertyValueTemplate-" + index}>
                                                                        <Form.Select aria-label="Default select example">
                                                                            <option>Select Column</option>
                                                                            {columnList?.map((column, columnIndex) => (
                                                                                <option type={column.type}>{column.name}</option>
                                                                            ))}
                                                                        </Form.Select>
                                                                        <Form.Text className="text-muted">
                                                                            Select Column Or Vertex Attribute
                                                                        </Form.Text>
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col>
                                                                    <Form.Control controlId={currentVertex?.id + "-propertyName-" + index} type="text" placeholder="Enter title"></Form.Control>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                        <Button variant="primary" type="button" onClick={e => SaveNewVertexMapping(e)}>
                                                            Add
                                                        </Button>
                                                        &nbsp;
                                                        <Button variant="primary" type="button" onClick={e => cancelAddNewVertex(e)}>
                                                            Cancel
                                                        </Button>
                                                    </Form>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Title>
                                Graph Template
                            </Card.Title>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Col>
        </Row>
    );
}

export default FileUpload;