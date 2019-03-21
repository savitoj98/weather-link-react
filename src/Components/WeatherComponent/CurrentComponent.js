import React, {Component} from 'react';

const current = (props) => (
    <div>
        <h4 style={{ textAlign: "center" }}>Current Weather: </h4>

        <p>Date: {props.formatDate(new Date())}</p>
        <p>Temperature: {props.current.temp_c} &#8451; - {props.current.condition}</p>
        <p>Wind Speed: {props.current.wind_mph} mph</p>
        <p>Humidity: {props.current.humidity}%</p>
        <p>Precipitation: {props.current.precip_mm} mm</p>
        <p>Pressure: {props.current.pressure_mb} mb</p>
    </div>
);

export default current;