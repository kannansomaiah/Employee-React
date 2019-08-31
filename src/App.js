// Import React
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import FormError from './FormError';

class App extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      messageFromServer: '',
      employees: [],
      errorMessage: null,
      isModifyClicked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleModification = this.handleModification.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);

  }

  handleModification(employee) {
    console.log("in modifiction method: " + employee.email)
    this.setState({ isModifyClicked: true, email: employee.email, firstName: employee.firstName, lastName: employee.lastName })
  }


  handleDeletion(employee) {
    console.log("delete delete delete");
    axios.delete('http://localhost:8080/employee', { data: { email: employee.email, firstName: employee.firstName, lastName: employee.lastName } }).then(response => {
      return response.data;
    })
      .then((data) => {
        this.setState({ employees: data })
      })

  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    console.log("submit submit submit");
    // if(!this.state.isModifyClicked){
      var employee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      };
      e.preventDefault();
  
      if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '') {
        this.setState({ errorMessage: 'Please enter all values' });
      } else {
        this.setState({ errorMessage: null });
        axios.post('http://localhost:8080/employee', employee).then(response => response.data)
          .then((data) => {
            this.setState({ employees: data })
          })
      }
      this.state.firstName = '';
      this.state.lastName = '';
      this.state.email = '';

      this.setState({ isModifyClicked: false })
    // }
    // else{
    //   console.log("coming inside right loop for submitting modification");

    //   var employee = {
    //     firstName: this.state.firstName,
    //     lastName: this.state.lastName,
    //     email: this.state.email
    //   };
  
    //   if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '') {
    //     this.setState({ errorMessage: 'Please enter all values' });
    //   } else {
    //     this.setState({ errorMessage: null });
    //     axios.put('http://localhost:8080/employee', employee).then(response => response.data)
    //       .then((data) => {
    //         this.setState({ employees: data })
    //       })
    //   }

    //   e.preventDefault();
    // }
  }

  handleClear(e) {
    console.log("clear clear clear");
      this.state.firstName = '';
      this.state.lastName = '';
      this.state.email = '';

      this.setState({ isModifyClicked: false })
  }

  componentDidMount() {
    axios.get('http://localhost:8080/employee').then(response => response.data)
      .then((data) => {
        this.setState({ employees: data })
      })

  }

  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                    {this.state.errorMessage !== null ? (
                      <FormError
                        theMessage={this.state.errorMessage}
                      />
                    ) : null}

                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                        Display Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        required
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      />
                    </section>
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                        Display Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        required
                        value={this.state.lastName}
                        onChange={this.handleChange}
                      />
                    </section>
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}

                    />
                  </section>
                  <div className="form-group text-right mb-0">
                  {this.state.isModifyClicked && (
                    <button className="btn btn-primary" type="submit" onSubmit={this.handleModification}>
                      Modify
                    </button>
                  )}
                  {!this.state.isModifyClicked && (
                    <button className="btn btn-primary" type="submit" onSubmit={this.handleSubmit}>
                      Register
                    </button>
                  )}
                    &nbsp;&nbsp;&nbsp;<button className="btn btn-primary margin-left" type="button" onClick={this.handleClear}>
                      Clear
                    </button>
                  </div>

                  <div className="container">

                    <h2 className="mt-4">Employees</h2>
                    <p className="lead">Below are the list of employees in this organization</p>

                    <table className="table table-hover table-responsive">
                      <thead><tr><th scope="col">Email</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Modify</th><th scope="col">Delete</th></tr></thead>
                      <tbody>
                        {this.state.employees.map(employee => (
                          <tr><th scope="row">{employee.email}</th><td>{employee.firstName}</td><td>{employee.lastName}</td>
                            <td><button className="btn btn-primary" type="button" onClick={() => this.handleModification(employee)}>Modify</button></td>
                            <td><button className="btn btn-primary" type="button" onClick={() => this.handleDeletion(employee)}>Delete</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default App;
