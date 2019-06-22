import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from "../Views/Dashboard";


const AppNavigator = createStackNavigator(
    {
      Dashboard: Dashboard
    },
    {
      initialRouteName: "Dashboard",
      defaultNavigationOptions: {
        gesturesEnabled: false
      },
    }
);


const Router = createAppContainer(AppNavigator);

export default Router