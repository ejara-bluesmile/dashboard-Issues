import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  FormCheckbox,
  FormSelect,
  Button,
  FormTextarea
} from "shards-react";

import { Link } from "react-router-dom";

class FormFeature extends React.Component {
  states = [
    {
      id: 1,
      title: 0,
      project: "Reportado"
    },
    {
      id: 2,
      title: 1,
      project: "En progreso"
    },
    {
      id: 3,
      title: 2,
      project: "Resuelto"
    },
    {
      id: 4,
      title: 3,
      project: "Eliminado"
    }
  ];

  hello = async () => {
    console.log("holsss");
    // console.log("aqui 2", this.state)
    // await saveIssues(this.state.data);
    // this.props.history.push("/issues");
  };

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <form onSubmit={this.hello}>
                <Row>
                  <Col lg="6" md="12">
                    <FormGroup>
                      <label htmlFor="feEmailAddress">Name</label>
                      <FormInput
                        id="feEmailAddress"
                        type="email"
                        placeholder="Title"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup>
                      <label htmlFor="fePassword">End Date</label>
                      <FormTextarea placeholder="Words can be like X-rays if you use them properly..." />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6" md="12">
                    <FormGroup>
                      <label htmlFor="feEmailAddress">Description</label>
                      <FormInput
                        id="feEmailAddress"
                        type="email"
                        placeholder="Title"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6" md="12">
                    <FormGroup>
                      <label htmlFor="fePassword">Start Date</label>
                      <FormTextarea placeholder="Words can be like X-rays if you use them properly..." />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="6" md="12">
                    <Card small className="mb-2 mt-4 mr-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0">Developers</h6>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <tbody>
                            {console.log(this.states)}
                            {this.states.map(item => (
                              <tr key={item.id}>
                                <td key={item.id}>{item.project}</td>

                                <td>
                                  <Button size="sm" theme="warning">
                                    delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <Button
                          className="float-right rounded-circle mr-2"
                          size="sm"
                          theme="success"
                        >
                          <i className="fa fa-plus"></i>
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" md="12">
                    <Card small className="mb-2 mt-4 mr-4">
                      <CardHeader className="border-bottom">
                        <h6 className="m-0">Issues</h6>
                      </CardHeader>
                      <CardBody className="p-0 pb-3">
                        <table className="table mb-0">
                          <tbody>
                            {console.log(this.states)}
                            {this.states.map(item => (
                              <tr key={item.id}>
                                <td key={item.id}>{item.project}</td>

                                <td>
                                  <Link
                                    to={`/issuesForm/${item.id}`}
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
                        <Button
                          className="float-right rounded-circle mr-2"
                          size="sm"
                          theme="success"
                        >
                          <i className="fa fa-plus"></i>
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Button theme="info" className="float-right mt-2" type="submit">
                  Save
                </Button>
                <Button
                  theme="secondary"
                  className="float-right mt-2 mr-2"
                  type="submit"
                >
                  Cancel
                </Button>
              </form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default FormFeature;
