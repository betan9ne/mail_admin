 
import Dashboard from "views/Dashboard.js";
import Drivers from "views/Drivers";
import Rental from "views/Rental";
import Reports from "views/Reports";
import Rides from "views/Rides";
import User_profile from "views/User_profile";
import Vehicles from "views/Vehicles";

var detail_routes = [ 
  {
    path: "/reports",
    name: "Reports",
    icon: "tim-icons icon-align-center",
    component: Reports,
    layout: "/details",
  },
 
 
];
export default detail_routes;
