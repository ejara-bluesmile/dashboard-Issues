import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UsersTable from "../components/users/userTable";
import Pagination from "../components/common/pagination";
import { getUsers, deleteUser } from "../services/Users/usersService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "../components/common/SearchBox";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import PageTitle from "../components/common/PageTitle";

// import Sidebar from "../sideBar";
// import "../common/common.css";
// import iconCompany from "../../resource/bluesmile.png";
// import ImgIcon from "../../resource/user.png";
import Swal from "sweetalert2";

class Users extends Component {
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
    const { length: count } = this.state.users;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    // const { user } = this.props;

    if (count === 0)
      return (
        <div>
          <div className="container">
            <p>There are no users in the database. Try again later</p>
          </div>
        </div>
      );

    const { totalCount, data: users } = this.getPagedData();

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Users"
            subtitle="User Management"
            className="text-sm-left"
          />
        </Row>
        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Search User</h6>
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <UsersTable
                  users={users}
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
                <p>{totalCount} users</p>
                <Link
                  to="/users/new"
                  className="btn btn-primary text-center"
                  id="btn-newuser"
                  // style={{ marginBottom: 20 }}
                >
                  New User
                </Link>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Users;
