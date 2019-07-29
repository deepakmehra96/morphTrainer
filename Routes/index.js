import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../Views/Auth/Login";
import SignUp from "../Views/Auth/Signup";
import ActivationCode from "../Views/Auth/ActivationCode";
import Header from "../components/Header";
import LoggedinTabs from "../Views/FooterTab.js";
import Accounts from "../Views/Accounts";
import Availability from "../Views/Accounts/Availability";
import Payment from '../Views/Accounts/Payment'
import MapMain from "../Views/Map";
import ManageBooking from "../Views/Bookings/ManageBooking";
import CheckRoute from "../Views/CheckRoute";
import Review from "../Views/Accounts/Review";
import Profile from "../Views/Accounts/Profile";
import Location from "../Views/Accounts/Location";
import Calender from "../Views/Main/Calender";

const AppNavigator = createStackNavigator(
  {
    CheckRoute: CheckRoute,
    LoggedinTabs: LoggedinTabs,
    Login: Login,
    SignUp: SignUp,
    ActivationCode: ActivationCode,
    Header: Header,
    Accounts: Accounts,
    Calender: Calender,
    Availability: Availability,
    Review:Review,
    Payment: Payment,
    Location:Location,
    MapMain: MapMain,
    ManageBooking: ManageBooking,
    Profile: Profile,
  },
  {
    initialRouteName: "CheckRoute",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
  }
);

const Router = createAppContainer(AppNavigator);

export default Router