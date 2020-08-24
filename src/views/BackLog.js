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
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "../components/common/SearchBox";
import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import Swal from "sweetalert2";

class BackLog extends React.Component {
  states = [
    {
      title: 0,
      project: "Reportado"
    },
    {
      title: 1,
      project: "En progreso"
    },
    {
      title: 2,
      project: "Resuelto"
    },
    {
      title: 3,
      project: "Eliminado"
    }
  ];
  state = {
    users: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "email", order: "asc" },
    user: {}
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  handleDelete = async user => {
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
        const originalUsers = this.state.users;
        const users = originalUsers.filter(u => u.id !== user.id);
        this.setState({ users });

        try {
          return deleteUser(user.id);
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            toast.error("The user was deleted.");

          this.setState({ users: originalUsers });
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
                            id="btn-newuser"
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
                <Link to="/backlogsForm/new" id="btn-newuser">
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
export default BackLog;
