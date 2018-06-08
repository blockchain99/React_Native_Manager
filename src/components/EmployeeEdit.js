import React, { Component } from 'react';
import _ from 'lodash';
// import Communications from 'react-native-communications';
import { text } from 'react-native-communications';
import { connect } from 'react-redux';
// import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import {
  employeeUpdate,
  employeeSave,
  employeeFormClear,
  employeeDelete } from '../actions';
import {
  Card,
  CardSection,
  Button,
  Confirm } from './common';


class EmployeeEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit of Employee !'
    });

    state = { showModal: false };
    // state = { showModal: true };
/*At anytime component is to be loade onto the screen,
I want to look at this.porps.employee, & every single property
that I want to forwad on employee update. Take all the properties
out of emplyee and stuff into the reducers.
*/
//Iterate every property(attribute) on this obj, employee and
//update reducer of every property.
    // componentWillMount() {
    //   _.each(this.props.employee, (value, prop) => {
    //     this.props.employeeUpdate({ prop, value });
    //   });
    // }
    componentWillMount() {
      _.each(this.props.navigation.state.params.employee, (value, prop) => {
        this.props.employeeUpdate({ prop, value });
      });
    }

    componentWillUnmount() {
      //calling the action to delete form data !
      this.props.employeeFormClear();
    }

//Save Changes
    onButtonPress() {
      const { name, phone, shift } = this.props;
      this.props.employeeSave({
        name,
        phone,
        shift,
        uid: this.props.navigation.state.params.employee.uid,
        navi: this.props.navigation
      });
    }
//Text Schedule
    onTextPress() {
        const { phone, shift } = this.props;
        //Communications.text(phone, `Your upcoming shift is on ${shift}`);
        text(phone, `Your Upcoming Shift is on${shift}`);
    }

    onAccept() { //initiate deletion procedure
      const { uid } = this.props.navigation.state.params.employee;
      this.props.employeeDelete({ uid, navi: this.props.navigation });
    }

    onDecline() {
      this.setState({ showModal: false }); //Text not visible
      // this.setState({ showModal: true });
    }

  render() {
    return (
      <Card>
        <EmployeeForm />
          <CardSection>
            <Button
              onPress={this.onButtonPress.bind(this)}
            >
              Save Changes
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onTextPress.bind(this)}>
              Text Schedule
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
              Fire Employee
            </Button>
          </CardSection>

          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are You sure you want to delete this?
          </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};
//we can access action creator with this component.
export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeFormClear,
  employeeDelete
})(EmployeeEdit);
