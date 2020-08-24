import React, { Component } from "react";
// import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
// import "../common/common.css";

class IssuesFeatureTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    {
      label: "Edit",
      key: "edit",
      content: user => (
        <Link to={`/issuesForm/${user.id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    },
    {
      label: "Delete",
      key: "delete",
      content: user => (
        <button
          onClick={() => this.props.onDelete(user)}
          className="btn btn-warning btn-sm "
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

export default IssuesFeatureTable;
