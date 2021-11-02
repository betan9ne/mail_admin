
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { Point } from 'leaflet'
import useDrivers from "hooks/useDrivers";
import { usePosition } from "hooks/usePosition";

function Map() {
  let drivers =  useDrivers().docs
  const{latitude, longitude, error}  = usePosition()
  console.log(drivers)
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Live Driver view</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden", }}
                >
                        <MapContainer style={{ position:"absolute", left:"0", right:"0", bottom:"0", top:"0"}} 
                 center={[-15.3245674, 28.345764 ]} zoom={12} scrollWheelZoom={true}                 
                 >
                 <TileLayer
                   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                     
               </MapContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
