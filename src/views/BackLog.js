import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "shards-react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import Pagination from "../components/common/pagination";
import {
  getBacklogs,
  deleteBacklog
} from "../services/Backlog/backlogsService";
import BacklogTable from "../components/backlogTable.jsx";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "../components/common/SearchBox";
import PageTitle from "../components/common/PageTitle";
// import Editor from "../components/add-new-post/Editor";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";
// import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import Swal from "sweetalert2";

class BackLog extends React.Component {
  // states = [
  //   {
  //     title: 0,
  //     project: "Reportado"
  //   },
  //   {
  //     title: 1,
  //     project: "En progreso"
  //   },
  //   {
  //     title: 2,
  //     project: "Resuelto"
  //   },
  //   {
  //     title: 3,
  //     project: "Eliminado"
  //   }
  // ];
  state = {
    backlogs: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    backlog: {}
  };

  async componentDidMount() {
    const { data: backlogs } = await getBacklogs();
    this.setState({ backlogs });
  }

  handleDelete = async backlog => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const originalBacklog = this.state.backlogs;
        const backlogs = originalBacklog.filter(b => b.id !== backlog.id);
        this.setState({ backlogs });

        try {
          return deleteBacklog(backlog.id);
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            toast.error("The Backlog was deleted.");

          this.setState({ backlogs: originalBacklog });
        }
      }
    });
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
      backlogs: allBacklogs
    } = this.state;

    let filtered = allBacklogs;
    if (searchQuery)
      filtered = allBacklogs.filter(m =>
        m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const backlogs = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: backlogs };
  };

  render() {
    const { length: count } = this.state.backlogs;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    // const { user } = this.props;

    if (count === 0)
      return (
        <div>
          <div className="container">
            <p>There are no backlogs in the database. Try again later</p>
          </div>
        </div>
      );

    const { totalCount, data: backlogs } = this.getPagedData();
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="BackLogs"
            subtitle="BackLogs Management"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Search Backlog</h6>
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <BacklogTable
                  backlogs={backlogs}
                  sortColumn={sortColumn}
                  onLike={this.handleLike}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
                <div className="m-3">
                  <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                    className="pagination"
                  />
                </div>

                {/* {user && ( */}
              </CardBody>
              <CardFooter>
                <p>{totalCount} Backlogs</p>
                <Link
                  to="/backlogs/new"
                  id="btn-newBacklog"
                  className="btn btn-primary text-center"

                  // style={{ marginBottom: 20 }}
                >
                  New Backlog
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">BackLogs list</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Title
                      </th>
                      <th scope="col" className="border-0">
                        Project
                      </th>
                      <th scope="col" className="border-0" />
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(this.states)}
                    {this.states.map(item => (
                      <tr key={item.id}>
                        <td key={item.id}>{item.title}</td>
                        <td key={item.id}>{item.project}</td>

                        <td>
                          <Link
                            to={`/backlogsForm/${item.title}`}
                            id="btn-newBacklog"
                          >
                            <Button size="sm" theme="info">
                              edit
                            </Button>
                          </Link>
                        </td>
                        <td>
                          <Button size="sm" theme="warning">
                            delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
              <div className="float-right">
                <Link to="/backlogsForm/new" id="btn-newBacklog">
                  <Button className="float-right mb-2 mr-1">Add new</Button>
                </Link>

              </div>
            </Card>
          </Col>
        </Row> */}
      </Container>
    );
  }
}
export default BackLog;
