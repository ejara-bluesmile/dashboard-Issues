import React from "react";
import Joi from "joi-browser";
import Forms from "../components/common/Form";
import * as userService from "../services/registerService";
import * as auth from "../services/authService";
import Swal from "sweetalert2";
import iconBlue from "../images/bluesmile.png";

import {
  Container,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";

class RegisterForm extends Forms {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      createdAt: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(3)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    lastname: Joi.string()
      .required()
      .label("Lastname"),
    createdAt: ""
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      const { data } = this.state;
      const response = await auth.login(data.email, data.password);

      localStorage.setItem("x-auth-token", response.headers["x-auth-token"]);
      localStorage.setItem("email", data.email);

      window.location = "/users";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <br />
        <a href="/login">
          <h3 className="text-center">BlueSprints App</h3>
        </a>

        <div className="text-center">
          <img className="" src={iconBlue} alt="iconblue" width="110" />
        </div>
        {/* Default Light Table */}
        <Row>
          <Col md="6 offset-3">
            <Card small className="mb-6">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Register</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col md="6">
                              <label for="">First Name</label>
                              {this.renderInput("name", "")}
                            </Col>
                            <Col md="6">
                              <label for="">Last Name</label>
                              {this.renderInput("lastname", "Lastname")}
                            </Col>
                            <Col md="6">
                              <label for="">Email</label>
                              {this.renderInput("email", "Email")}
                            </Col>
                            <Col md="6">
                              <label for="">Password</label>
                              {this.renderInput(
                                "password",
                                "Password",
                                "password"
                              )}
                            </Col>
                          </Row>
                          <div>{this.renderButton("Register")}</div>
                        </form>
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterForm;
