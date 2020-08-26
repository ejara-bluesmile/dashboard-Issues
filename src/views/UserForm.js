import React from "react";
import Joi from "joi-browser";
import Forms from "../components/common/Form";
import { getUser, saveUser } from "../services/Users/usersService";

import {
  Container,
  Card,
  // CardBody,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form
  // FormGroup,
  // FormInput,
  // FormSelect,
  // FormTextarea,
  // Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";

class UserForm extends Forms {
  state = {
    data: { email: "", password: "", name: "", lastname: "", createdAt: "" },
    errors: {}
  };

  schema = {
    id: Joi.number(),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(1)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    lastname: Joi.string()
      .required()
      .label("Lastname"),
    createdAt: ""
  };

  async populateUser() {
    try {
      const userId = this.props.match.params.id;
      if (userId === "new") return;

      const { data: user } = await getUser(userId);
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel(user) {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    };
  }

  doSubmit = async () => {
    await saveUser(this.state.data);

    this.props.history.push("/users");
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Edit"
            subtitle="User Management"
            className="text-sm-left"
          />
        </Row>
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Create User</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col md="6" className="form-group">
                              <label for="">First Name</label>
                              {this.renderInput("name", "Name")}
                            </Col>
                            <Col md="6" className="form-group">
                              <label for="">Last Name</label>
                              {this.renderInput("lastname", "lastname")}
                            </Col>

                            <Col md="6" className="form-group">
                              <label for="">Email</label>
                              {this.renderInput("email", "Email", "email")}
                            </Col>

                            <Col md="6" className="form-group">
                              <label for="">Password</label>
                              {this.renderInput(
                                "password",
                                "Password",
                                "password"
                              )}
                            </Col>
                          </Row>
                          <CardFooter> {this.renderButton("Save")}</CardFooter>
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

export default UserForm;
