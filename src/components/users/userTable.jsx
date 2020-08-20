import React, { Component } from "react";
// import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
// import "../common/common.css";

class UsersTable extends Component {
  columns = [
    {
      path: "email",
      label: "User",
      content: user => <Link to={`/users/${user.id}`}>{user.email}</Link>
    },
    { path: "name", label: "Name" },
    {
      label: "Action",
      key: "edit",
      content: user => (
        <Link to={`/users/${user.id}`}>
          <button className="btn btn-info btn-sm btn-pill">Edit</button>
        </Link>
      )
    },
    {
      key: "delete",
      content: user => (
        <button
          onClick={() => this.props.onDelete(user)}
          className="btn btn-danger btn-sm btn-pill"
        >
          Delete
        </button>
      )
    }
  ];

  // constructor() {
  //   super();
  //   const user = auth.getCurrentUser();
  //   if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  // }

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
