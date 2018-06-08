import React, { Component } from 'react';
import _ from 'lodash';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { ListView, View, FlatList } from 'react-native';
import { Button } from './common/Button';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'List of All Employees !',
    headerLeft: null,
    headerRight: (
    <Button
      onPress={() => {
        navigation.navigate('employeeCreate');
      }}
    >
      Add
    </Button>)
    });

    componentWillMount() {
      this.props.employeesFetch(); //async action,(fetch a list of employee)
      //*** option1 ***
      this.createDatasource(this.props);
      //*** option2 : render individual row, create datasource ***
      //const ds = new ListView.DataSource({
      // rowHasChanged: (r1, r2) => r1 != r2
      // });
      //
      // this.dataSource = ds.cloneWithRows(this.props.employees);
    }

    componentWillReceiveProps(nextProps) {
  //nextProps are the next set of props that this compnent
  //wil be rendered with
  // and this.props is still the old set of props
  this.createDatasource(nextProps); //option2
    }
//*** optioin2 ***
  createDatasource({ employees }) {
    const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

    goToPage(employee) {
      console.log('go to page');
      console.log(employee);
      this.props.navigation.navigate('employeeEdit', { employee });
    }

  render() {
    return (
      <View style={{ flex: 1 }}>
       <FlatList
          data={this.props.employees}
          renderItem={
              ({ item }) => (
              <ListItem
                employee={item}
                navi={this.props.navigation}
                onRowPress={(employee) => this.goToPage(employee)}
              />)
          }
          keyExtractor={(item, index) => item.uid}
       />
      </View>
    );
  }
}
/*collection, employees : convert from obj to array.
As for obj, state.employees(has many key value pair),
for every element in the obj,every key value pair,
1. I will take user model: val(value),for example, name
property,  shift property and uid(key fo the employee).
2. Create new obj, push all the value(name, phone, shift)
from the user model, also thorw id on top of it
=> { shift: 'Monday, name: 'S', id: '1j2j3k'}; */
const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
});
//get the array of employees inside our component as this.props.employees
  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
