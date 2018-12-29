import React, { Component } from 'react';

import './App.css';
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';


/* Material-UI is used for designing ui of the app */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

/* Dropzone is used for local file selection */
import Dropzone from 'react-dropzone';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

/* superagent is used to handle post/get requests to server */
import axios from 'axios';
var request = require('superagent');


/* Screen for user to edit their information */
class ProfileScreen extends Component {


	/* user information is used here to update user information */
  	constructor(props){

    	super(props);
	  	console.log(props);
    
    	this.state={
			user:this.props.user,
			userid:this.props.user.id,
			username:this.props.user.username,
			password: this.props.user.password,
    	}
  	}


	/* Calls updatePwd in server/controllers/users to update password */
  	handleClickPwd(event) {

		var self = this;
    	//To be done:check for empty values before hitting submit
    	if(this.state.password.length>0) {
      		var payload={
      			"password":this.state.password
      		}
      		axios.post('/api/users/pwd/'+this.state.userid, payload)

     		.then(function (response) {
       			console.log(response);

       			if(response.data.code == 200){
		   			alert("Edit password successfully!");
		   			self.setState({password:""});
       			}
       			else {
         			console.log("some error ocurred",response.data.code);
       			}
     		})
     		.catch(function (error) {
       			console.log(error);
     		});
    	}
    	else{
      		alert("Input field value is missing");
    	}
  	}


	/* Used to udate and chack password validity */
	render() {
	    return (
		    <div className="App">
		        <div className="container">

		        	<p>Welcome {this.state.user.username}</p>
				    <center><h3>Edit Password</h3></center>

					<MuiThemeProvider>
						<div>          
						   	<TextField
								hintText={"Enter your Password"}
								floatingLabelText={"password"}
								floatingLabelText="password"
								type="password"
								onChange = {(event,newValue) => this.setState({password:newValue})}
							/>
						   	<br/>
						   	<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClickPwd(event)}/>
						</div>
					</MuiThemeProvider>

		        </div>
		    </div>
	    );
	}


}

	const style = {
  		margin: 15,
	};


export default ProfileScreen;
