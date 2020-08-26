import React, { useState } from "react";

import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Forms from "../components/common/Form";
import { saveBacklog, getBacklog } from "../services/Backlog/backlogsService";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";
import _ from "lodash";
import SearchBox from "../components/common/SearchBox";
import PageTitle from "../components/common/PageTitle";
import FeatureBacklogTable from "../components/backlogs/featureBacklogTable";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
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
  // Form,
  // FormGroup,
  // FormInput,
  // FormSelect,
  // FormTextarea,
  Button
} from "shards-react";

class BackLogForm extends Forms {
  state = {
    data: {
      title: "",
      description: "",
      project: "",
      client: "",
      features: [{}],
      createdBy: "",
      createdAt: "",
      status: "",
      operation: ""
    },
    features: [],
    errors: {},
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    feature: {}
  };

  schema = {
    title: Joi.string().required(),
    project: Joi.string().required(),
    client: Joi.string().required(),
    createdBy: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.number().required(),
    createdAt: "",
    features: [],
    operation: ""
  };

  async populateBacklog() {
    try {
      const backlogId = this.props.match.params.id;
      if (backlogId === "new") return;

      const { data: backlog } = await getBacklog(backlogId);
      this.setState({ data: this.mapToViewModel(backlog) });
      console.log(backlog);
      this.setState({ features: backlog.features });
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
      features: backlog.features,
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
  //

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
      features: allFeatures
    } = this.state;

    let filtered = allFeatures;
    if (searchQuery)
      filtered = allFeatures.filter(m =>
        m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const features = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: features };
  };

  render() {
    const { length: count } = this.state.features;
    const { pageSize, currentPage, sortColumn } = this.state;

    // if (count === 0)
    //   return (
    //     <div>
    //       <div className="container">
    //         <p>There are no backlogs in the database. Try again later</p>
    //       </div>
    //     </div>
    //   );

    const { totalCount, data: features } = this.getPagedData();

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
                            <label htmlFor="">status</label>
                            {this.renderInput("status", "status")}
                          </Col>
                          <Col lg="6" md="12">
                            <Card small className="mb-2 mt-4 mr-4">
                              <CardHeader className="border-bottom">
                                <h6 className="m-0">Features</h6>
                              </CardHeader>
                              <CardBody className="p-0 pb-3">
                                <FeatureBacklogTable
                                  features={features}
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
                                  id="btn-newfeature"
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
                        {/* <Button
                          theme="info"
                          className="float-right mt-2"
                          type="submit"
                        >
                          Save
                        </Button> */}
                        <Link to={`/backlogs`} id="btn-newfeature">
                          <Button
                            theme="secondary"
                            className="float-right mt-2 mr-2"
                            type="submit"
                          >
                            Cancel
                          </Button>
                        </Link>
                        <CardFooter>{this.renderButton("save")}</CardFooter>
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
