import React from "react";
import Joi from "joi-browser";
import Forms from "../components/common/Form";
import { Link } from "react-router-dom";

import { getUser, saveUser } from "../services/Users/usersService";
import {
  getIssue,
  deleteIssues,
  saveIssues
} from "../services/Issues/issuesService";

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
    data: {
      title: "",
      description: "",
      email: "",
      estado: "",
      project: ""
    },
    errors: {}
  };
  states = [
    {
      id: 0,
      name: "Reportado"
    },
    {
      id: 1,
      name: "En progreso"
    },
    {
      id: 2,
      name: "Resuelto"
    },
    {
      id: 3,
      name: "Eliminado"
    }
  ];
  schema = {
    id: Joi.number(),
    title: Joi.string()
      .required()
      .label("Title"),
    project: Joi.string()
      .required()
      .label("Project"),
    email: Joi.string()
      .required()
      .label("User"),
    description: Joi.string()
      .required()
      .label("Description"),
    estado: Joi.label("Status")
  };

  async populateUser() {
    try {
      const issueId = this.props.match.params.id;
      if (issueId === "new") return;

      const { data: issue } = await getIssue(issueId);
      this.setState({ data: this.mapToViewModel(issue) });
      console.log("State issues form: ", this.state);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel(issue) {
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      email: issue.email,
      estado: issue.estado,
      project: issue.project
    };
  }

  doSubmit = async () => {
    console.log("doSubmit",this.state.data )
    await saveIssues(this.state.data);
    
    this.props.history.push("/issues");
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
                      <form onSubmit={this.handleSubmit}>
                        <Row>
                          <Col md="6" className="form-group">
                            <label htmlFor="title">Name</label>
                            {this.renderInput("title", "Name")}
                          </Col>
                          <Col md="6">
                            <label htmlFor="description">Description</label>
                            {this.renderTextarea("description", "Description")}
                          </Col>

                          <Col md="6" className="form-group">
                          <label htmlFor="project">Project</label>
                            {this.renderInput("project", "Project")}
                          </Col>
                          <Col md="6" className="form-group">
                          <label htmlFor="user">User</label>
                            {this.renderInput("email", "User")}
                          </Col>

                          <Col md="6" className="form-group">
                            {this.renderSelect("estado", "Status", this.states)}
                          </Col>
                        </Row>
                        {this.renderButton("Save")}
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
