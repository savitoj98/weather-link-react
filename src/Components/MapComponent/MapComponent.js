import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

const markStyle = {
    backgroundColor: "#e74c3c",
    borderRadius: "50%",
    width:"20px",
    height:"20px",
    border:"4px solid #eaa29b",
    cursor: "pointer"
}

class MapComponent extends Component {


    render(){
        
        const Map = ReactMapboxGl({
            accessToken: this.props.accessToken
        });

        return (
            <Map
                style="mapbox://styles/mapbox/streets-v8"
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
                }} 
                zoom={[(this.props.selected)?(this.props.selected.zoom):(this.props.zoom)]}
                center={[
                    (this.props.selected)?(this.props.selected.coords.long):(this.props.coords.long),
                    (this.props.selected)?(this.props.selected.coords.lat):(this.props.coords.lat)
                ]}
            >
                {this.props.selected && (
                    <Marker 
                        coordinates={[this.props.selected.coords.long, this.props.selected.coords.lat]} 
                        onClick={this.props.openModel}
                        >
                        <div style={markStyle} ></div>
                    </Marker>
                )}
            </Map>
            
        )
    }
    
}

export default MapComponent;