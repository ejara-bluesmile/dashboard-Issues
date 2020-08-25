import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Forms from "../components/common/Form";
import { saveBacklog, getBacklogs } from "../services/Backlog/backlogsService";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";
import _ from "lodash";
import SearchBox from "../components/common/SearchBox";
import PageTitle from "../components/common/PageTitle";
import FeatureBacklogTable from "../components/backlogs/featureBacklogTable";
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

class BackLogForm extends Forms {
  state = {
    data: {
      title: "",
      description: "",
      project: "",
      client: "",
      feacture: [],
      createdBy: "",
      createdAt: "",
      status: "",
      operation: ""
    },
    errors: {}
    // features: [],
    // currentPage: 1,
    // pageSize: 4,
    // searchQuery: "",
    // sortColumn: { path: "email", order: "asc" },
    // feature: {}
  };

  // features = [
  //   {
  //     id: 2,
  //     name: "feature 2",
  //     description: "Reportado",
  //     startDate: "",
  //     endDate: "",
  //     developers: [
  //       {
  //         id: 1,
  //         name: "pablito"
  //       },
  //       {
  //         id: 2,
  //         name: "juanito"
  //       },
  //       {
  //         id: 1,
  //         name: "pepito"
  //       }
  //     ],
  //     issues: [
  //       {
  //         id: 1,
  //         name: "issue 1",
  //         project: "project 1",
  //         status: 1,
  //         user: "user 1",
  //         description: "jdnafbajd"
  //       },
  //       {
  //         id: 2,
  //         name: "issue 2",
  //         project: "project 2",
  //         status: 0,
  //         user: "user 2",
  //         description: "adhhf hf h"
  //       }
  //     ]
  //   }
  //   {
  //     id: 1,
  //     name: "feature 1",
  //     description: "Reportado",
  //     startDate: "",
  //     endDate: "",
  //     developers: [
  //       {
  //         id: 1,
  //         name: "pablito"
  //       },
  //       {
  //         id: 2,
  //         name: "juanito"
  //       },
  //       {
  //         id: 1,
  //         name: "pepito"
  //       }
  //     ],
  //     issues: [
  //       {
  //         id: 1,
  //         name: "issue 1",
  //         project: "project 1",
  //         status: 1,
  //         user: "user 1",
  //         description: "jdnafbajd"
  //       },
  //       {
  //         id: 2,
  //         name: "issue 2",
  //         project: "project 2",
  //         status: 0,
  //         user: "user 2",
  //         description: "adhhf hf h"
  //       }
  //     ]
  //   }
  // ];
  schema = {
    // id: Joi.number(),
    title: Joi.string().required(),
    project: Joi.string().required(),
    client: Joi.string().required(),
    createdBy: Joi.string().required(),
    createdAt: ""
  };

  async populateBacklog() {
    try {
      const backlogId = this.props.match.params.id;
      if (backlogId === "new") return;

      const { data: backlog } = await getBacklogs(backlogId);
      this.setState({ data: this.mapToViewModel(backlog) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateBacklog();
    // const features = this.features;
    // this.setState({ features });
  }

  mapToViewModel(backlog) {
    return {
      id: backlog.id,
      title: backlog.title,
      project: backlog.project,
      description: backlog.description,
      client: backlog.client,
      // feacture: backlog.feacture,
      createdBy: backlog.createdBy,
      createdAt: backlog.createdAt,
      status: backlog.status,
      operation: backlog.operation
    };
  }

  doSubmit = async () => {
    await saveBacklog(this.state.data);

    this.props.history.push("/backlogs");
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

  // handlePageChange = page => {
  //   this.setState({ currentPage: page });
  // };

  // handleSearch = query => {
  //   this.setState({ searchQuery: query, currentPage: 1 });
  // };

  // handleSort = sortColumn => {
  //   this.setState({ sortColumn });
  // };

  // getPagedData = () => {
  //   const {
  //     pageSize,
  //     currentPage,
  //     sortColumn,
  //     searchQuery,
  //     features: allFeatures
  //   } = this.state;

  //   let filtered = allFeatures;
  //   if (searchQuery)
  //     filtered = allFeatures.filter(m =>
  //       m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
  //     );

  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  //   const features = paginate(sorted, currentPage, pageSize);

  //   return { totalCount: filtered.length, data: features };
  // };

  render() {
    // const { totalCount, data: features } = this.getPagedData();
    // const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title=" Edit Backlog"
            subtitle="Backlogs Management"
            className="text-sm-left"
          />
        </Row>
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Edit Backlog</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <form onSubmit={this.handleSubmit}>
                        <Row>
                          <Col lg="6" md="12" className="form-group">
                            <label htmlFor="">Title</label>
                            {this.renderInput("title", "Title")}

                            <label htmlFor="">Description</label>
                            {this.renderTextarea("description", "Description")}

                            <label htmlFor="">Project</label>
                            {this.renderInput("project", "Project")}

                            <label htmlFor="">Client</label>
                            {this.renderInput("client", "Client")}
                          </Col>
                          {/* <Col lg="6" md="12">
                            <Card small className="mb-2 mt-4 mr-4">
                              <CardHeader className="border-bottom">
                                <h6 className="m-0">Features</h6>
                              </CardHeader>
                              <CardBody className="p-0 pb-3">
                                <FeatureBacklogTable
                                  feacture={features}
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
                                <Link
                                  to={`/featuresForm/new`}
                                  id="btn-newfeacture"
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
                          </Col> */}
                        </Row>
                        <Button
                          theme="info"
                          className="float-right mt-2"
                          type="submit"
                        >
                          Save
                        </Button>
                        <Link to={`/backlogs`} id="btn-newfeacture">
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
