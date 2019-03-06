import { createStackNavigator, createAppContainer } from "react-navigation";
import ForgetPassword from "../Views/Auth/forgetPassword";
import SignIn from "../Views/Auth/signIn";
import Profile from "../Views/Profile";
import Policies from "../Views/Options/Policies";
import TermsConditions from "../Views/Options/termsConditions";
import Notifications from "../Views/Notifications";
import EditPofile from "../Views/EditProfile";
import ChangePassword from "../Views/ChangePassword";
import FooterMain from "../components/Footer";
import Options from "../Views/Options";
import CheckRoute from "../Views/CheckRoute";

const AppNavigator = createStackNavigator(
    {
        SignIn:SignIn,
        ForgetPassword: ForgetPassword,
        Profile: Profile,
        Policies: Policies,
        TermsConditions: TermsConditions,
        Notifications: Notifications,
        EditPofile: EditPofile,
        ChangePassword:ChangePassword,
        FooterMain:FooterMain,
        CheckRoute: CheckRoute
      },
      {
        initialRouteName: "CheckRoute"
      }
);


const Router = createAppContainer(AppNavigator);

export default Router