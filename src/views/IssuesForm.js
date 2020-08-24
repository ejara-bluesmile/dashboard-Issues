import React from "react";
import Joi from "joi-browser";
import Forms from "../components/common/Form";
import { Link } from "react-router-dom";

import { getUser, saveUser } from "../services/Users/usersService";

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

class IssuesForm extends Forms {
  state = {
    data: { email: "", password: "", name: "", lastname: "", createdAt: "" },
    errors: {}
  };
  states = [
    {
      id: 1,
      title: 0,
      project: "Reportado"
    },
    {
      id: 2,
      title: 1,
      project: "En progreso"
    },
    {
      id: 3,
      title: 2,
      project: "Resuelto"
    },
    {
      id: 4,
      title: 3,
      project: "Eliminado"
    }
  ];
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
                              <label for="">Name</label>
                              {this.renderInput("name", "Name")}
                            </Col>
                            <Col md="6">
                              <label for="">Description</label>
                              {this.renderTextarea("", "Description")}
                            </Col>

                            <Col md="6" className="form-group">
                              {this.renderSelect(
                                "estado",
                                "Status",
                                this.states
                              )}
                            </Col>
                          </Row>
                          <Link to={`/featuresForm/rayos`} id="btn-newuser">
                            <Button
                              theme="info"
                              className="float-right mt-2"
                              type="submit"
                            >
                              Save
                            </Button>
                          </Link>
                          <Link to={`/featuresForm/rayos`} id="btn-newuser">
                            <Button
                              theme="secondary"
                              className="float-right mt-2 mr-2"
                              type="submit"
                            >
                              Cancel
                            </Button>
                          </Link>
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

export default IssuesForm;
