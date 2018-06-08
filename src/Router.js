import { StackNavigator } from 'react-navigation';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

console.log('Starting router');

const Router = StackNavigator({
  home: { screen: LoginForm,
     navigationOptions: {
         title: 'Login Form',
         headerTitleStyle: {
           textAlign: 'center',
           flex: 1,
           fontSize: 20
         },
         headerTintColor: 'black'
     }
   },
  employees: { screen: EmployeeList },
  employeeCreate: { screen: EmployeeCreate },
  employeeEdit: { screen: EmployeeEdit }
});

export default Router;
