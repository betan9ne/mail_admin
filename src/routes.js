 
import Dashboard from "views/Dashboard.js";
import Drivers from "views/Drivers";
import Rental from "views/Rental";
import Reports from "views/Reports";
import Rides from "views/Rides";
import User_profile from "views/User_profile";
import Vehicles from "views/Vehicles";
import Map from "views/Map";
import Settings from "views/Settings";
import Login from "views/Login";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/rental",
    name: "Rental",
    rtlName: "",
    icon: "tim-icons icon-atom",
    component: Rental,
    layout: "/admin",
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    icon: "tim-icons icon-pin",
    component: Vehicles,
    layout: "/admin",
  },
  {
    path: "/rides",
    name: "Rides",
    icon: "tim-icons icon-bell-55",
    component: Rides,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Users",
    icon: "tim-icons icon-single-02",
    component: User_profile,
    layout: "/admin",
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "tim-icons icon-puzzle-10",
    component: Drivers,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "tim-icons icon-align-center",
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "tim-icons icon-align-center",
    component: Reports,
    layout: "/admin",
  },

 
 
];
export default routes;
