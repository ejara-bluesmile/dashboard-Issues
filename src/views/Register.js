import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/Form";
import * as userService from "../services/registerService";
import * as auth from "../services/authService";
import Swal from "sweetalert2";

import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";

class RegisterForm extends Form {
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
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Register"
            subtitle="Bluesmile"
            className="text-sm-left"
          />
        </Row>
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Register</h6>
              </CardHeader>
              <CardBody className="p-3 pb-3">
                <Col>
                  <form onSubmit={this.handleSubmit}>
                    <label for="">First Name</label>
                    {this.renderInput("name", "Name")}
                    <label for="">Last Name</label>
                    {this.renderInput("lastname", "Lastname")}
                    <label for="">Email</label>
                    {this.renderInput("email", "Email")}
                    <label for="">Password</label>
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Register")}
                  </form>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterForm;
