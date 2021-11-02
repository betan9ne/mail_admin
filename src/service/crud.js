import firebase from '../firebase'
const shipments = firebase.firestore().collection("rides")
const users = firebase.firestore().collection("users")
const drivers = firebase.firestore().collection("drivers")
const alerts = firebase.firestore().collection("alerts")
const vehicles =  firebase.firestore().collection("vehicles")
const reviews =  firebase.firestore().collection("reviews")
const rentals =  firebase.firestore().collection("rental")
const settings = firebase.firestore().collection("settings")
const admin = firebase.firestore().collection("admin")

class Crud {

    createShipment(data)
    {
        return rentals.add(data)
    }

    createCustomer(data)
    {
        return users.add(data)
    }

    createDriver(data)
    {
        return drivers.add(data)
    }

    createAdminUser(data){
        return admin.add(data)
    }

    getAdmuinUsers(){
        return admin
    }

    getReviews(){
        return reviews
    }
    getShipments()
    {
        return shipments
    }

    getDrivers()
    {
        return drivers
    }

    getRentals()
    {
        return rentals
    }

    getVehicles()
    {
        return vehicles
    }

    getCustomers()
    {
        return users
    }

    getAlerts()
    {
        return alerts
    }

    addDriverToShipment(id, data){
        return shipments.doc(id).update(data)
    }

    updateCustumerDetails(id, data)
    {
        return users.doc(id).update(data)
    }

    updateDriverDetails(id, data)
    {
        return drivers.doc(id).update(data)
    }

    updateVehiclesDetails(id, data)
    {
        return vehicles.doc(id).update(data)
    }

    updateToken(data){
        return settings.doc("IMPALASETTINGS").update(data)
    }

}
export default new Crud()