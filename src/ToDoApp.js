import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import ModalUpdateToDo from "./components/modal.updateToDo.js";
import ModalToDo from "./components/modal.todo.js";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
} from "./utils/Handle.Api.js";

function TodoApp() {
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="Modal text-center">
          <ModalToDo onSave={addToDo} setToDo={setToDo} />
        </div>

        <div className="list" style={{ gap: "10px" }}>
          <Row>
            {toDo.map((todo) => (
              <Col xs={12} md={3} key={todo._id}>
                <Card
                  border="dark"
                  style={{
                    backgroundColor: "#F9FAF4",
                    marginBottom: "10px",
                    width: "270px",
                    height: "300px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Title: {todo.Title}</Card.Title>
                    <Card.Text style={{ fontSize: "13px" }}>
                      Description: {todo.Description}
                    </Card.Text>
                    <Card.Text>Priority: {todo.Priority}</Card.Text>
                    <Card.Text>
                      Date:{" "}
                      {new Date(todo.Date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Card.Text>
                    <Card.Text>Repeat: {todo.Reapeat}</Card.Text>
                    <Card.Text>Status: {todo.Status}</Card.Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <ModalUpdateToDo
                        onUpdate={updateToDo}
                        setToDo={setToDo}
                        todo={todo}
                      />
                      <Button
                        variant="danger"
                        onClick={() => deleteToDo(todo, setToDo)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
