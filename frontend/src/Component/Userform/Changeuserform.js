import React, { Component } from 'react';
import "../../App.css";
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Changeuserform extends Component {


  state = {
    userliste: [],
    _id: '',
    location: '',
    personsInHouse: '',
    houseSize: '',
    selecteduserliste: ''
  }

  constructor(props) {
    super(props);

    
    var self = this;
   
  
    this.handleChange = this.handleChange.bind(this);
    this.HousehandleChange = this.HousehandleChange.bind(this);
    this.locationhandleChange = this.locationhandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    axios.get('http://localhost:3000/api/user/all')
      .then(function (response) {
        self.setState({ userliste: response.data })
        self.setState({selecteduserliste: response.data[0]._id})
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  handleChange = (event) => {
    this.setState({ selecteduserliste: event.target.value });
  }
  peoplehandleChange = (event) => {
    this.setState({ personsInHouse: event.target.value });
  }
  locationhandleChange = (event) => {
    this.setState({ location: event.target.value });
  }
  HousehandleChange = (event) => {
    this.setState({ houseSize: event.target.value });
  }


  handleSubmit(event) {

    event.preventDefault();

    var requestBody = {
      id: this.state.selecteduserliste,
      location: this.state.location,
      personsInHouse: this.state.personsInHouse,
      houseSize: this.state.houseSize,

    }

    
    axios.put('http://localhost:3000/api/user', requestBody)
      .then(res => {
        console.log(requestBody);
        console.log(res.data);
      }
      )



  }


  render() {
    return (
      <div className="Formulaire">
        <h3>Modifier un User</h3>

        <form onSubmit={this.handleSubmit}>

          <tr>
            <td>

              User à modifier:
                    <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange} style={{ width: "50%" }}>
                {this.state.userliste.map((user) => (
                  <option value={user._id}> {user._id} </option>
                ))}

              </Input>

            </td>
          </tr>
          <tr>
            <td>



              <label>
                People in House :
                    <input type="number" onChange={this.peoplehandleChange} style={{ width: "30%", marginLeft: "1em" }} />
              </label>
              <label>
                Location
                    <input type="Text" onChange={this.locationhandleChange} style={{ width: "50%", marginLeft: "1em" }} />
              </label>
              <label>
                House Size:
                    <input type="Text" onChange={this.HousehandleChange} style={{ width: "50%", marginLeft: "1em" }} />
              </label>


            </td>
          </tr>
          <input type="submit" value="Modifier" />
        </form>
      </div>
    );
  }
}

export default Changeuserform;