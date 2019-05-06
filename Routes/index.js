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
import PersonalityQa from "../Views/Customers/PersonalityQa";
import Dashboard from "../Views/Dashboard";
import WorkingHours from "../Views/Options/WorkingHours";
import Gallery from "../Views/Profile/Gallery";
import Ticket from "../Views/Support/containers/Ticket";
import CreateYourTicket from "../Views/Support/containers/CreateYourTicket";
import TicketMessage from "../Views/Support/containers/TicketMessage";
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
        CheckRoute: CheckRoute,
        PersonalityQa: PersonalityQa,
        Dashboard: Dashboard,
        WorkingHours: WorkingHours,
        Gallery: Gallery,
        Ticket: Ticket,
        CreateYourTicket: CreateYourTicket,
        TicketMessage: TicketMessage
      },
      {
        initialRouteName: "TicketMessage",
        defaultNavigationOptions: {
          gesturesEnabled: false
        },
      }
);


const Router = createAppContainer(AppNavigator);

export default Router