import React, { Component } from "react";
// import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
// import "../common/common.css";

class BacklogTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: backlog => (
        <Link to={`/backlogs/${backlog.id}`}>{backlog.title}</Link>
      )
    },
    { path: "client", label: "Client" },
    {
      label: "Edit",
      key: "edit",
      content: backlog => (
        <Link to={`/backlogs/${backlog.id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    },
    {
      label: "Delete",
      key: "delete",
      content: backlog => (
        <button
          onClick={() => this.props.onDelete(backlog)}
          className="btn btn-warning btn-sm "
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { backlogs, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={backlogs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BacklogTable;
