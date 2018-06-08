import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from '../components/common';

class ListItem extends Component {
/*In EmployeeList,(version 2, navigate to employeeEdit ) 
<ListItem onRowPress={(employee) =>
  this.goToPage(employee) }
  goToPage(employee) {
  this.props.navigation.navigate('employeeEdit', { employee })
  }  */
  onRowPress() {
  // version 1 to navigate employeeCreate
  //this.props.navi.navigate('employeeCreate', { employee: this.props.employee });

  }

  render() {
    const { name } = this.props.employee;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onRowPress(this.props.employee)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              { name }
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 28,
    paddingLeft: 15
  }
};

export default ListItem;
