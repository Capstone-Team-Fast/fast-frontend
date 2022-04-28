import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import RouteService from "../../services/RouteService";
import RecipientService from "../../services/RecipientService";
import DriverService from "../../services/DriverService";
import BingMapsKey from '../BingMapsKey';

const recipientService = new RecipientService();
const routeService = new RouteService();
const driverService = new DriverService();
const BING_MAPS_API_KEY = BingMapsKey.key;

/**
 * This class is used to display a history of all routes
 * created in the system.
 */
class History extends Component {
  /**
   * The constructor method initializes the component's state object and
   * binds the methods of the component to the current instance.
   * @param {Object} props The properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      drivers: [],
      route: {
        itinerary: [],
        total_distance: "",
        total_duration: "",
        total_quantity: "",
        first_name: "",
        last_name: "",
      },
      recipients: [],
      driver: { capacity: "", employee_status: "" },
    };
    this.getDriverName = this.getDriverName.bind(this);
    this.getRecipientName = this.getRecipientName.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.getEmployeeStatus = this.getEmployeeStatus.bind(this);
    this.isEmployee = this.isEmployee.bind(this)
  }

  /**
   * Life cycle hook that is called after the component is first rendered.
   */
  componentDidMount() {
    let params = this.props.match.params;

    recipientService.getRecipients().then((result) => {
      this.setState({
        recipients: result,
      });
    });

    routeService.getRoute(1).then((result) => {
      this.setState({
        route: result,
      });
    });

    routeService.getRoutes().then((result) => {
      this.setState({
        routes: result,
      });
    });

    driverService.getDrivers().then((result) => {
      this.setState({
        drivers: result,
      });
    });

    driverService.getDriver(params.driverId).then((result) => {
      this.setState({
        driver: result,
      });
    });
  }

  /**
   * Function to return full name for individual drivers. Called
   * for each driver in the route list.
   * @param {Object} route Route object from the route list.
   * @returns Driver's full name.
   */
  getDriverName(route) {
    let drivers = this.state.drivers;
    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i].id === route.assigned_to) {
        return drivers[i].first_name + " " + drivers[i].last_name;
      }
    }
    return "";
  }

  /**
   * Function to return full name for individual recipients. Called
   * for each client in the itinerary for each driver's route.
   * @param {Object} recipient Recipient object from the route.
   * @returns Client's full name.
   */
  getRecipientName(recipient) {
    let clients = this.state.recipients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === recipient.id) {
        return clients[i].first_name + " " + clients[i].last_name;
      }
    }
  }

  /**
   * Function that returns the clients comment if present. Called for each client
   * in the itinerary for each driver's route.
   * @param {Object} recipient Recipient object from the route.
   * @returns The clients comment section
   */
  getRecipientComment(recipient) {
    let clients = this.state.recipients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === recipient.id) {
        if (clients[i].comments !== undefined) {
          return clients[i].comments;
        } else {
          return "";
        }
      }
    }
  }

  /**
   * Function that returns the clients room number if present. Called for each client
   * in the itinerary for each driver's route
   * @param {Number} recipient Recipient object from the route
   * @returns The clients room number
   */
  getRecipientRoomNumber(recipient) {
    let clients = this.state.recipients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === recipient.id) {
        if (
          clients[i].location.room_number !== undefined &&
          clients[i].location.room_number !== "N/A"
        ) {
          return clients[i].location.room_number;
        } else {
          return "";
        }
      }
    }
  }

  /**
   * Function to return phone number for individual recipients. Called
   * for each client in the itinerary for the driver's route.
   * @param {Object} recipient Recipient object from the route.
   * @returns Client's phone number.
   */
  getPhone(recipient) {
    let clients = this.state.recipients;
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id === recipient.id) {
        return clients[i].phone;
      }
    }
  }

  /**
   * Function to return employee staus for individual drivers. Called
   * for each driver in the route list.
   * @param {Object} route Route object from the route list.
   * @returns Driver's employee status.
   */
  getEmployeeStatus(route) {
    let drivers = this.state.drivers;
    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i].id === route.assigned_to) {
        return drivers[i].employee_status;
      }
    }
    return "";
  }

  /**
   * Function to return capacity for individual drivers. Called
   * for each driver in the route list.
   * @param {Object} route Route object from the route list.
   * @returns Driver's capacity.
   */
  getCapacity(route) {
    let drivers = this.state.drivers;
    for (let i = 0; i < drivers.length; i++) {
      if (drivers[i].id === route.assigned_to) {
        return drivers[i].capacity;
      }
    }
    return "";
  }

  /**
   * Function to format date each route was generated on
   * for each driver.
   * @param {String} recipient.created_on from the route.
   * @returns formatted string of date of route generated.
   */
  getRouteDate(route_date) {
    let month = route_date.substring(5, 7);
    let day = route_date.substring(8, 10);
    let year = route_date.substring(0, 4);
    return month + "/" + day + "/" + year;
  }

  isEmployee(driver) {
    let empStatus = this.getEmployeeStatus(driver)
    if (empStatus === "Employee") {
        return true
    }
    else {
        return false
    }
}

/**
* Function which returns the array of itinerary information.
* @returns Array of itinerary information.
*/
getItineraryArray(route) {
  let itineraryArray = route.itinerary;
  return itineraryArray;
}

/**
* Function which returns the array of itinerary street addresses
* @returns Array of itinerary street addresses
*/
getItineraryAddresses(route) {
  let itineraryAddresses = [];
  let itineraryArray = this.getItineraryArray(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryAddresses.push(itineraryArray[i].address.address);
  }
  return itineraryAddresses;
}

/**
* Function which returns the array of itinerary cities
* @returns Array of itinerary cities
*/
getItineraryCities(route) {
  let itineraryCities = [];
  let itineraryArray = this.getItineraryArray(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryCities.push(itineraryArray[i].address.city);
  }
  return itineraryCities;
}

/**
* Function which returns the array of itinerary states
* @returns Array of itinerary states
*/
getItineraryStates(route) {
  let itineraryStates = [];
  let itineraryArray = this.getItineraryArray(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryStates.push(itineraryArray[i].address.state);
  }
  return itineraryStates;
}

/**
* Function which returns the array of itinerary locations.
* Utilizes itinerary getter functions.
* @returns Array of itinerary locations
*/
getItineraryLocationsForMap(route) {
  let itineraryLocationsForMap = [];
  let itineraryArray = this.getItineraryArray(route);
  let itineraryAddresses = this.getItineraryAddresses(route);
  let itineraryCities = this.getItineraryCities(route);
  let itineraryStates = this.getItineraryStates(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryLocationsForMap.push(
          itineraryAddresses[i] + "," +
          itineraryCities[i] + "," +
          itineraryStates[i])
  }
  return itineraryLocationsForMap;
}

/** Function that returns a URL string used for a static itinerary map.
* Utilizes the getItineraryLocationsForMap() function.
* Utilizes Microsoft Bing Maps API
* https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-a-static-map
* @returns String of static itinerary map URL
*/
getItineraryMapURL(route) {
  let mapURL = "https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?"
  let locations = this.getItineraryLocationsForMap(route);
  let mapSize = "1280,720";
  let optimize = "distance";
  let pinStyleStart = 64;
  let pinStyleOnward = 66;
  mapURL += "optimize=" + optimize + "&";
  mapURL += "mapSize=" + mapSize + "&";
  for (let i = 0; i < locations.length; i++) {
      if (i === 0) {
          mapURL += "wp." + i + "=" + locations[i] + ";" + pinStyleStart + ";" + (i + 1) + "&";
      } else {
          mapURL += "wp." + i + "=" + locations[i] + ";" + pinStyleOnward + ";" + (i + 1) + "&";
      }
  }
  mapURL += "key=" + BING_MAPS_API_KEY; 
  return mapURL;
}

/**
* Function which returns the array of itinerary information.
* @returns Array of itinerary information.
*/
getItineraryArray(route) {
  let itineraryArray = route.itinerary;
  return itineraryArray;
}

/**
* Function which returns the array of itinerary street addresses
* @returns Array of itinerary street addresses
*/
getItineraryAddresses(route) {
  let itineraryAddresses = [];
  let itineraryArray = this.getItineraryArray(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryAddresses.push(itineraryArray[i].address.address);
  }
  return itineraryAddresses;
}

/**
* Function which returns the array of itinerary cities
* @returns Array of itinerary cities
*/
getItineraryCities(route) {
  let itineraryCities = [];
  let itineraryArray = this.getItineraryArray(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryCities.push(itineraryArray[i].address.city);
  }
  return itineraryCities;
}

/**
* Function which returns the array of itinerary states
* @returns Array of itinerary states
*/
getItineraryStates(route) {
  let itineraryStates = [];
  let itineraryArray = this.getItineraryArray(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryStates.push(itineraryArray[i].address.state);
  }
  return itineraryStates;
}

/**
* Function which returns the array of itinerary locations.
* Utilizes itinerary getter functions.
* @returns Array of itinerary locations
*/
getItineraryLocationsForMap(route) {
  let itineraryLocationsForMap = [];
  let itineraryArray = this.getItineraryArray(route);
  let itineraryAddresses = this.getItineraryAddresses(route);
  let itineraryCities = this.getItineraryCities(route);
  let itineraryStates = this.getItineraryStates(route);
  for (let i = 0; i < itineraryArray.length; i++) {
      itineraryLocationsForMap.push(
          itineraryAddresses[i] + "," +
          itineraryCities[i] + "," +
          itineraryStates[i])
  }
  return itineraryLocationsForMap;
}

/** Function that returns a URL string used for a static itinerary map.
* Utilizes the getItineraryLocationsForMap() function.
* Utilizes Microsoft Bing Maps API
* https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-a-static-map
* @returns String of static itinerary map URL
*/
getItineraryMapURL(route) {
  let mapURL = "https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?"
  let locations = this.getItineraryLocationsForMap(route);
  let mapSize = "1280,720";
  let optimize = "distance";
  let pinStyleStart = 64;
  let pinStyleOnward = 66;
  mapURL += "optimize=" + optimize + "&";
  mapURL += "mapSize=" + mapSize + "&";
  for (let i = 0; i < locations.length; i++) {
      if (i == 0) {
          mapURL += "wp." + i + "=" + locations[i] + ";" + pinStyleStart + ";" + (i + 1) + "&";
      } else {
          mapURL += "wp." + i + "=" + locations[i] + ";" + pinStyleOnward + ";" + (i + 1) + "&";
      }
  }
  mapURL += "key=" + BING_MAPS_API_KEY;
  return mapURL;
}

  /**
   * The render method used to display the component.
   * @returns The HTML to be rendered.
   */
  render() {
    return (
      <Container>
        <div>
          <h1 style={{ textAlign: "center" }}>Route History</h1>
        </div>
        {this.state.routes.reverse().map((r) => (
          <Card>
            <Card.Title className="card-header border-dark bg-grey">
              <Col>
                <Row className="d-flex flex-row">
                  <Col sm={7} className="title">
                    <h6 style={{ paddingLeft: 0 }}>
                      {this.getRouteDate(r.created_on)}
                    </h6>
                    {this.getDriverName(r)}
                  </Col>
                  <Col sm={0} className="justify-content-around d-flex flex-row">
                            <Button href={this.getItineraryMapURL(r)}
                                target="_blank">View Route Map</Button>
                            <Button href={"/routeResults/driverRoute/" 
                                + r.id + "/" + r.assigned_to} 
                                target="_blank">Print Itinerary</Button>
                        </Col>   
                </Row>
              </Col>
            </Card.Title>
            <Card.Header className="pt-1 pl-1 pr-1 pb-1 border-dark bg-grey">
              <Table className="hover table  mb-0">
                <thead>
                  <tr>
                    <th>Capacity</th>
                    <th>Total Quantity</th>
                    <th>Expected Distance Traveled (in Miles)</th>
                    <th>Expected Duration (in Minutes)</th>
                    <th>Employee Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.getCapacity(r)}</td>
                    <td>{r.total_quantity}</td>
                    <td>{Math.round(r.total_distance)}</td>
                    <td>{Math.round(r.total_duration)}</td>
                    <td>{this.getEmployeeStatus(r)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Header>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Apt #</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>{this.isEmployee(r) ? "Phone Number" : ""}</th>
                  <th>Quantity</th>
                  <th>Comments</th>
                </tr>
              </thead>
              {r.itinerary.map((s) => (
                <tbody>
                  <tr>
                    <td>{this.getRecipientName(s)}</td>
                    <td>{s.address.address}</td>
                    <td>
                      {this.getRecipientRoomNumber(s)
                        ? this.getRecipientRoomNumber(s)
                        : ""}
                    </td>
                    <td>{s.address.city}</td>
                    <td>{s.address.state}</td>
                    <td>{s.address.zipcode}</td>
                    <td>{this.isEmployee(r) ? this.getPhone(s) : ""}</td>
                    <td>{s.demand}</td>
                    <td>{this.getRecipientComment(s)}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Card>
        ))}
      </Container>
    );
  }
}
export default History;
