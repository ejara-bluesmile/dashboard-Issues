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
import FeatureBacklogTable from "../components/backlogs/featureBacklogTable";

class BackLogForm extends Forms {
  state = {
    data: { email: "", password: "", name: "", lastname: "", createdAt: "" },
    errors: {},
    features: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "email", order: "asc" },
    feature: {}
  };

  features = [
    {
      id: 2,
      name: "feature 2",
      description: "Reportado",
      startDate: "",
      endDate: "",
      developers: [
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
      ],
      issues: [
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
      ]
    },
    {
      id: 1,
      name: "feature 1",
      description: "Reportado",
      startDate: "",
      endDate: "",
      developers: [
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
      ],
      issues: [
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
      ]
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
    //  await this.populateUser();
    //const { data: users } = await getUsers();
    const features = this.features;
    this.setState({ features });
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
  // handleDelete = async user => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then(result => {
  //     if (result.value) {
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       const originalUsers = this.state.users;
  //       const users = originalUsers.filter(u => u.id !== user.id);
  //       this.setState({ users });

  //       try {
  //         return deleteUser(user.id);
  //       } catch (ex) {
  //         if (ex.response && ex.response.status === 404)
  //           toast.error("The user was deleted.");

  //         this.setState({ users: originalUsers });
  //       }
  //     }
  //   });
  // };

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
      features: allUsers
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(m =>
        m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const features = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: features };
  };

  render() {
    const { totalCount, data: features } = this.getPagedData();
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

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
                          <Col lg="6" md="12" className="form-group">
                            <FormGroup>
                              <label htmlFor="">Title</label>
                              {this.renderInput("title", "Title")}
                            </FormGroup>
                            <FormGroup>
                              <label htmlFor="">Description</label>
                              {this.renderTextarea("name", "Name")}
                            </FormGroup>

                            <FormGroup>
                              <label htmlFor="">Project</label>
                              {this.renderInput("", "lastname")}
                            </FormGroup>
                            <FormGroup>
                              <label htmlFor="">Client</label>
                              {this.renderInput("client", "Client")}
                            </FormGroup>
                          </Col>
                          <Col lg="6" md="12">
                            <Card small className="mb-2 mt-4 mr-4">
                              <CardHeader className="border-bottom">
                                <h6 className="m-0">Features</h6>
                              </CardHeader>
                              <CardBody className="p-0 pb-3">
                                <FeatureBacklogTable
                                  users={features}
                                  sortColumn={sortColumn}
                                  onLike={this.handleLike}
                                  onDelete={this.handleDelete}
                                  onSort={this.handleSort}
                                ></FeatureBacklogTable>
                                <div className="m-3">
                                  <Pagination
                                    itemsCount={totalCount}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange}
                                    className="pagination"
                                  />
                                </div>
                                <Link to={`/featuresForm/new`} id="btn-newuser">
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
                        <Link to={`/backlogs`} id="btn-newuser">
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

export default BackLogForm;
