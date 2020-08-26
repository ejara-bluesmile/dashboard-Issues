import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/Form";
// import IconLogin from "../resource/user-icon.png";
import { Link } from "react-router-dom";
// import "./common/common.css";
import { login } from "../services/authService";
import Swal from "sweetalert2";
import iconBlue from "../images/bluesmile.png";

import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
// import PageTitle from "../components/common/PageTitle";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await login(data.email, data.password);

      localStorage.setItem("x-auth-token", response.headers["x-auth-token"]);
      localStorage.setItem("email", data.email);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      // console.log(response);
      window.location = "/users";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      if (ex.response.status === 403) {
        console.log("Contraseña incorrecta");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password Incorrect! Try again"
        });
      }
    }
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        {/* <div className="mb-3 mx-auto">
          <img className="" src={iconBlue} alt="iconblue" width="110" />
        </div> */}
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
            <Card small className="mb-5">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Login</h6>
              </CardHeader>
              <CardBody className="p-3 pb-3">
                <div className="form-input">
                  <form onSubmit={this.handleSubmit}>
                    <Col>
                      <div className="col-12 form-input">
                        <form onSubmit={this.handleSubmit}>
                          <label for="">Email</label>
                          {this.renderInput("email", "Email")}
                          <label for="">Password</label>
                          {this.renderInput("password", "password", "password")}
                          {this.renderButton("Login")}
                        </form>
                      </div>
                      <br />
                      <div className=" forgot">
                        <Link to="/register" className="">
                          Create new user
                        </Link>
                      </div>
                    </Col>
                  </form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
