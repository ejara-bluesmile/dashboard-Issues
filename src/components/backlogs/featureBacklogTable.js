import React, { Component } from "react";
// import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/table";
// import "../common/common.css";

class featureBacklogTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    {
      label: "Edit",
      key: "edit",
      content: feature => (
        <Link to={`/featuresForm/${feature.id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    },
    {
      label: "Delete",
      key: "delete",
      content: feature => (
        <button
          onClick={() => this.props.onDelete(feature)}
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
    console.log(features);
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

export default featureBacklogTable;
