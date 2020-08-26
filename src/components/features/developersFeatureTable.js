import React, { Component } from "react";
// import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
// import "../common/common.css";

class DevelopersFeatureTable extends Component {
  columns = [
    { path: "name", label: "Name" },
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
    const { features, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={features}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DevelopersFeatureTable;
