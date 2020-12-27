/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import firebase from '../config/fbconfig';
import UserProfileForm from './UserProfileForm';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class UserProfile extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      // users: [{
      //   userClass: '',
      //   userDetails: {
      //     age: '',
      //     email: '',
      //     fullName: '',
      //     imageUrl: '',
      //     phone: '',
      //     userRole: ''
      //   },
      //   userPackages: {
      //     endDate: '',
      //     isActive: '',
      //     packageId: '',
      //     sessions: '',
      //     startDate: ''
      //   }
      // }]
      users: []
    };
  };

  handleChange = (e) =>{
    // this.setState({
    //   ...this.state,
    //   [e.target.id]: e.target.value
    // })
    const id = this.props.match.params.id;
    //this.setState({ users[0].userDetails.fullName: e.target.value}) 
    //console.log(this.state.users[0].user);
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const userRef = firebase.database().ref('Users');
    const id = this.props.match.params.id;
    //userRef.child(id).update(this.state.users[id].userDetailts.fullName: );
    console.log(this.state);
    this.props.history.push('/');
  }

  componentDidMount() {
    const userRef = firebase.database().ref('Users');
    userRef.on('value', (snapshot) => {
      let users = snapshot.val();
      let newState = [];
      const id = this.props.match.params.id;
      newState.push({
        id: id,
        userPackages: users[id].userPackages,
        userDetails: users[id].userDetails,
        userClasses: users[id].userClasses,
      });
      this.setState({
        users: newState
      });
    });
    //console.log(this.state.users[0].userPackage);
  };
  render(){
  return (
    <>
      <div className="content">
      {this.state.users.map((user) => {
        return (
        <Row>
          <Col md="8">
            <UserProfileForm user={user} id={this.props.match.params.id} />
            {/* <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <form onSubmit={this.handleSubmit}>
              <CardBody>
               
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Full Name</label>
                        <Input
                          defaultValue={ user.userDetails.fullName }
                          placeholder="Full Name"
                          type="text"
                          id="fullName"
                          //onChange={(e)=>this.setState({userDetails: { fullName: e.target.value}})}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder={ user.userDetails.email } type="email" id="email"
                          onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Phone (disabled)</label>
                        <Input
                          defaultValue={ user.userDetails.phone }
                          disabled
                          placeholder="phone"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Age</label>
                        <Input
                          defaultValue={ user.userDetails.age }
                          id="age"
                          onChange={this.handleChange}
                          placeholder="Age"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Role</label>
                        <Input
                          defaultValue={ user.userDetails.userRole }
                          placeholder="Role"
                          id="role"
                          onChange={this.handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>Classes</label>
                        <Input
                          defaultValue={ user.userClasses }
                          placeholder="Classes opted"
                          id="classes"
                          onChange={this.handleChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {}
                  <CardHeader>
                  <h5 className="title">Class Packages</h5>
                  </CardHeader>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Start Date</label>
                      <Input
                        defaultValue={ user.userPackages.startDate && user.userPackages.startDate ? user.userPackages.startDate : " "}
                        type="date"
                        id="startDate"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        defaultValue={ user.userPackages.endDate && user.userPackages.endDate ? user.userPackages.endDate : " "}
                        type="date"
                        id="endDate"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Package Id</label>
                      <Input
                        defaultValue={ user.userPackages.packageId && user.userPackages.packageId ? user.userPackages.packageId : "Package Id"}
                        type="text"
                        id="packageId"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Sessions</label>
                      <Input
                        defaultValue={ user.userPackages.sessions && user.userPackages.sessions ? user.userPackages.sessions : "Sessions Req"}
                        type="text"
                        id="sessions"
                          onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  </CardBody>
                
              
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
              </form>
            </Card> */}
          </Col>
        </Row>
        )
      })}
      </div>
    </>
  );
}
}

export default UserProfile;