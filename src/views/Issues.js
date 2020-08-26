import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import UsersTable from "../components/users/userTable";
import Pagination from "../components/common/pagination";
import { getUsers, deleteUser } from "../services/Users/usersService";
import {
  getIssues,
  deleteIssues,
  saveIssues
} from "../services/Issues/issuesService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "../components/common/SearchBox";
import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import Swal from "sweetalert2";

class Issues extends React.Component {
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
  state = {
    issues: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    user: {}
  };

  async componentDidMount() {
    const { data: issues } = await getIssues();
    console.log("por aquí ", issues);
    this.setState({ issues });
  }

  handleDelete = async issue => {
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
        const originalUsers = this.state.issues;
        const issues = originalUsers.filter(u => u.id !== issue.id);
        this.setState({ issues });

        try {
          return deleteIssues(issue.id);
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            toast.error("The issue was deleted.");

          this.setState({ issues: originalUsers });
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
      issues: allUsers
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(m =>
        m.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const issues = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: issues };
  };

  render() {
    const { length: count } = this.state.issues;
    // const { user } = this.props;

    if (count === 0)
      return (
        <div>
          <div className="container">
            <p>There are no users in the database. Try again later</p>
          </div>
          <Link to="/issuesForm/new" id="btn-newuser">
            <Button className="float-right mb-2 mr-1">Add new</Button>
          </Link>
        </div>
      );
    const { totalCount, data: issues } = this.getPagedData();

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Issues"
            subtitle="Blog Posts"
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Issues list</h6>
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
                      <th scope="col" className="border-0">
                        State
                      </th>
                      <th scope="col" className="border-0" />
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {console.log("Issues ", this.state)}
                    {issues.map(item => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.project}</td>
                        <td>{this.states[item.estado].name}</td>
                        <td>
                          <Link to={`/issuesForm/${item.id}`} id="btn-newuser">
                            <Button size="sm" theme="info">
                              edit
                            </Button>
                          </Link>
                        </td>
                        <td>
                          <Button
                            onClick={() => this.handleDelete(item)}
                            size="sm"
                            theme="warning"
                          >
                            delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
              <div className="float-right">
                <Link to="/issuesForm/new" id="btn-newuser">
                  <Button className="float-right mb-2 mr-1">Add new</Button>
                </Link>
                {/* <Button
                      theme="danger"
                      className=" float-right mb-2 mr-1 ml-2"
                    >
                      cancel
                    </Button> */}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Issues;
