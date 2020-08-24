import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Forms from "../components/common/Form";
import { getUser, saveUser } from "../services/Users/usersService";
import Pagination from "../components/common/pagination";
import { getUsers, deleteUser } from "../services/Users/usersService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button,
  FormTextarea
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import FormFeature from "../components/features/FormFeature";
import DevelopersFeatureTable from "../components/features/developersFeatureTable";
import IssuesFeatureTable from "../components/features/IssuesFeatureTable";

class FeaturesForm extends Forms {
  state = {
    data: { email: "", password: "", name: "", lastname: "", createdAt: "" },
    errors: {},
    users: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "email", order: "asc" },
    user: {}
  };
  developers = [
    {
      id: 1,
      name: "pablito"
    },
    {
      id: 2,
      name: "juanito"
    },
    {
      id: 1,
      name: "pepito"
    }
  ];
  issues = [
    {
      id: 1,
      name: "issue 1",
      project: "project 1",
      status: 1,
      user: "user 1",
      description: "jdnafbajd"
    },
    {
      id: 2,
      name: "issue 2",
      project: "project 2",
      status: 0,
      user: "user 2",
      description: "adhhf hf h"
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
      const featureId = this.props.match.params.id;
      if (featureId === "new") return;

      const { data: user } = await getUser(featureId);
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateUser();
    const { data: users } = await getUsers();
    this.setState({ users });
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

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      users: allUsers
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(m =>
        m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { totalCount, data: users } = this.getPagedData();
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="BackLogs"
            subtitle="Blog Posts"
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <Card small>
                <ListGroup flush>
                  <ListGroupItem className="p-3">
                    <Row>
                      <Col>
                        <Form>
                          <form onSubmit={this.handleSubmit}>
                            <Row>
                              <Col lg="6" md="12">
                                <FormGroup>
                                  <label htmlFor="feEmailAddress">Name</label>
                                  {this.renderInput("name", "Name")}
                                </FormGroup>
                              </Col>
                              <Col lg="6" md="12">
                                <FormGroup>
                                  <label htmlFor="fePassword">End Date</label>
                                  {this.renderInput("title", "")}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6" md="12">
                                <FormGroup>
                                  <label htmlFor="feEmailAddress">
                                    Description
                                  </label>
                                  {this.renderTextarea("name", "Name")}
                                </FormGroup>
                              </Col>
                              <Col lg="6" md="12">
                                <FormGroup>
                                  <label htmlFor="fePassword">Start Date</label>
                                  {this.renderInput("title", "")}
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6" md="12">
                                <Card small className="mb-2 mt-4 mr-4">
                                  <CardHeader className="border-bottom">
                                    <h6 className="m-0">Developers</h6>
                                  </CardHeader>
                                  <CardBody className="p-0 pb-3">
                                    <DevelopersFeatureTable
                                      users={this.developers}
                                      sortColumn={sortColumn}
                                      onLike={this.handleLike}
                                      onDelete={this.handleDelete}
                                      onSort={this.handleSort}
                                    ></DevelopersFeatureTable>
                                    <div className="m-3">
                                      <Pagination
                                        itemsCount={totalCount}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={this.handlePageChange}
                                        className="pagination"
                                      />
                                    </div>
                                    <Link
                                      to={`/issuesForm/new`}
                                      id="btn-newuser"
                                    >
                                      <Button
                                        className="float-right rounded-circle mr-2"
                                        size="sm"
                                        theme="success"
                                      >
                                        <i className="fa fa-plus"></i>
                                      </Button>
                                    </Link>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col lg="6" md="12">
                                <Card small className="mb-2 mt-4 mr-4">
                                  <CardHeader className="border-bottom">
                                    <h6 className="m-0">Issues</h6>
                                  </CardHeader>
                                  <CardBody className="p-0 pb-3">
                                    <IssuesFeatureTable
                                      users={this.issues}
                                      sortColumn={sortColumn}
                                      onLike={this.handleLike}
                                      onDelete={this.handleDelete}
                                      onSort={this.handleSort}
                                    ></IssuesFeatureTable>
                                    <div className="m-3">
                                      <Pagination
                                        itemsCount={totalCount}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={this.handlePageChange}
                                        className="pagination"
                                      />
                                    </div>
                                    <Link
                                      to={`/issuesForm/new`}
                                      id="btn-newuser"
                                    >
                                      <Button
                                        className="float-right rounded-circle mr-2"
                                        size="sm"
                                        theme="success"
                                      >
                                        <i className="fa fa-plus"></i>
                                      </Button>
                                    </Link>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                            <Button
                              theme="info"
                              className="float-right mt-2"
                              type="submit"
                            >
                              Save
                            </Button>
                            <Link to={`/backlogsForm/rayos`} id="btn-newuser">
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
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default FeaturesForm;
