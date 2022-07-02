import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import {Bar, Doughnut} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import DashboardTotal from './DashboardTotal/DashboardTotal';
 
// import "react-datepicker/dist/react-datepicker.css";



export class Dashboard extends Component {
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props){
    super(props)
    this.state = {
      startDate: new Date(),
      visitSaleData: {},
      visitSaleOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display:false,
              min: 0,
              stepSize: 20,
              max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
          }],
          xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
              padding: 20,
              fontColor: "#9c9fa6",
              autoSkip: true,
            },
            categoryPercentage: 0.5,
            barPercentage: 0.5
        }]
        },
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0
          }
        }
      },
      trafficData: {},
      trafficOptions: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: false,
      },
      todos: [
        {
            id: 1,
            task: 'Pick up kids from school',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Prepare for presentation',
            isCompleted: true
        },
        {
            id: 3,
            task: 'Print Statements',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Create invoice',
            isCompleted: false
        },
        {
            id: 5,
            task: 'Call John',
            isCompleted: true
        },
        {
            id: 6,
            task: 'Meeting with Alisa',
            isCompleted: false
        }
      ],
      inputValue: '',
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  statusChangedHandler(event, id) {

    //const todoIndex = this.state.todos.findIndex( t => t.id === id );
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
  }

  addTodo (event) {
      event.preventDefault();

      const todos = [...this.state.todos];
      todos.unshift({
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          task: this.state.inputValue,
          isCompleted: false
          
      })

      this.setState({
          todos: todos,
          inputValue: ''
      })
  }

  removeTodo (index) {
      const todos = [...this.state.todos];
      todos.splice(index, 1);

      this.setState({
          todos: todos
      })
  }

  inputChangeHandler(event) {
      this.setState({
          inputValue: event.target.value
      });
  }
  
  componentDidMount(){
  }



  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }

  render () {
    return (
      <div>
        <DashboardTotal />
        {/* <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Tickets</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Assignee </th>
                        <th> Subject </th>
                        <th> Status </th>
                        <th> Last Update </th>
                        <th> Tracking ID </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face1.jpg")} className="mr-2" alt="face" /> David Grey </td>
                        <td> Fund is not recieved </td>
                        <td>
                          <label className="badge badge-gradient-success">DONE</label>
                        </td>
                        <td> Dec 5, 2017 </td>
                        <td> WD-12345 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face2.jpg")} className="mr-2" alt="face" /> Stella Johnson </td>
                        <td> High loading time </td>
                        <td>
                          <label className="badge badge-gradient-warning">PROGRESS</label>
                        </td>
                        <td> Dec 12, 2017 </td>
                        <td> WD-12346 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face3.jpg")} className="mr-2" alt="face" /> Marina Michel </td>
                        <td> Website down for one week </td>
                        <td>
                          <label className="badge badge-gradient-info">ON HOLD</label>
                        </td>
                        <td> Dec 16, 2017 </td>
                        <td> WD-12347 </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face4.jpg")} className="mr-2" alt="face" /> John Doe </td>
                        <td> Loosing control on server </td>
                        <td>
                          <label className="badge badge-gradient-danger">REJECTED</label>
                        </td>
                        <td> Dec 3, 2017 </td>
                        <td> WD-12348 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-lg-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body p-0 d-flex">
                <div className="dashboard-custom-date-picker">
                  <DatePicker inline selected={this.state.startDate}  onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Updates</h4>
                <div className="d-flex">
                  <div className="d-flex align-items-center mr-4 text-muted font-weight-light">
                    <i className="mdi mdi-account-outline icon-sm mr-2"></i>
                    <span>jack Menqu</span>
                  </div>
                  <div className="d-flex align-items-center text-muted font-weight-light">
                    <i className="mdi mdi-clock icon-sm mr-2"></i>
                    <span>October 3rd, 2018</span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 pr-1">
                    <img src={require("../../assets/images/dashboard/img_1.jpg")} className="mb-2 mw-100 w-100 rounded" alt="face" />
                    <img src={require("../../assets/images/dashboard/img_4.jpg")} className="mw-100 w-100 rounded" alt="face" />
                  </div>
                  <div className="col-6 pl-1">
                    <img src={require("../../assets/images/dashboard/img_2.jpg")} className="mb-2 mw-100 w-100 rounded" alt="face" />
                    <img src={require("../../assets/images/dashboard/img_3.jpg")} className="mw-100 w-100 rounded" alt="face "/>
                  </div>
                </div>
                <div className="d-flex mt-5 align-items-start">
                  <img src={require("../../assets/images/faces/face3.jpg")} className="img-sm rounded-circle mr-3" alt="face" />
                  <div className="mb-0 flex-grow">
                    <h5 className="mr-2 mb-2">School Website - Authentication Module.</h5>
                    <p className="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the readable content of a page.</p>
                  </div>
                  <div className="ml-auto">
                    <i className="mdi mdi-heart-outline text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-7 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Project Status</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Due Date </th>
                        <th> Progress </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 1 </td>
                        <td> Herman Beck </td>
                        <td> May 15, 2015 </td>
                        <td>
                          <ProgressBar variant="gradient-success" now={25}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 2 </td>
                        <td> Messsy Adam </td>
                        <td> Jul 01, 2015 </td>
                        <td>
                        <ProgressBar variant="gradient-danger" now={75}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 3 </td>
                        <td> John Richards </td>
                        <td> Apr 12, 2015 </td>
                        <td>
                        <ProgressBar variant="gradient-warning" now={90}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 4 </td>
                        <td> Peter Meggik </td>
                        <td> May 15, 2015 </td>
                        <td>
                        <ProgressBar variant="gradient-primary" now={50}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 5 </td>
                        <td> Edward </td>
                        <td> May 03, 2015 </td>
                        <td>
                        <ProgressBar variant="gradient-danger" now={50}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 5 </td>
                        <td> Ronald </td>
                        <td> Jun 05, 2015 </td>
                        <td>
                        <ProgressBar variant="gradient-info" now={65}/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-white">Todo</h4>
                <form  className="add-items d-flex" onSubmit={this.addTodo}>
                  <input 
                      type="text" 
                      className="form-control h-auto" 
                      placeholder="What do you need to do today?" 
                      value={this.state.inputValue} 
                      onChange={this.inputChangeHandler}
                      required />
                  <button type="submit" className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Add</button>
                </form>
                <div className="list-wrapper">
                    <ul className="d-flex flex-column todo-list">
                        {this.state.todos.map((todo, index) =>{
                            return <ListItem 
                            isCompleted={todo.isCompleted}
                            changed={(event) => this.statusChangedHandler(event, index)}
                            key={todo.id}
                            remove={() => this.removeTodo(index) }
                            >{todo.task}</ListItem>
                        })}
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div> 
    );
  }
}
export default Dashboard;