import React, { Component } from 'react';
import "../../App.css";
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Deleteuserform extends Component {
   
   
    state = {
        userliste:[],
        _id:'',
        location:'',
        personsInHouse:'',
        houseSize:'',
        selecteduserliste:''
    
     
    }
    
    
    
constructor(props) {
super(props);
    
var self=this;

this._idhandleChange = this._idhandleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);

axios.get('http://localhost:3000/api/user/all')
.then(function (response) {
    self.setState({userliste: response.data})
    self.setState({selecteduserliste:response.data[0]._id})
})
.catch(function (error) {
    console.log(error);
});


}
   
   
    _idhandleChange(event) {
        this.setState({selecteduserliste: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();

        var requestBody = {
            _id: this.state.selecteduserliste,
           }

            axios.delete('http://localhost:3000/api/user', {
                params: {
                  userId: this.state.selecteduserliste
                }
              } )
            .then(res => {
            console.log(requestBody);
            console.log(res.data);
            }
            )

      }
   
    render() {
        return (
            <div className="Formulaire">
            <h3>Supprimer un User</h3>

                    <form onSubmit={this.handleSubmit}>
            <tr> 
            <td>     

            User:
                    <Input type="select" name="select" id="exampleSelect" onChange={this._idhandleChange}>                  
                  {this.state.userliste.map((user) => (
                     <option value={user._id}> {user._id} </option>
                ))}
         
                 </Input>

                 


            </td>
            </tr>     
                    <input type="submit" value="Supprimer" />
                    </form>
            </div>
        );
    }
}

export default Deleteuserform;
