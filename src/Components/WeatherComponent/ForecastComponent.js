import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';



const forecast = (props) => {
    
    let forecastRows = props.forecast.map((elem, i) => (
        <tr key={i}>
            <td style={{ textAlign: "center" }}>{props.formatDate(new Date(elem.date))}</td>
            <td style={{ textAlign: "center" }}>{elem.temp_c}</td>
            <td style={{ textAlign: "center" }}>{elem.wind_mph}</td>
            <td style={{ textAlign: "center" }}>{elem.humidity}</td>
            <td style={{ textAlign: "center" }}>{elem.precip_mm}</td>
            <td style={{ textAlign: "center" }}>{elem.condition}</td>
        </tr>
    ))
    
    return (
    <div>
        <h4 style={{ textAlign: "center" }}>Forecast Weather: </h4>

        <Table striped bordered hover responsive size="sm">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temperature (in &#8451;)</th>
                    <th>Wind Speed (in mph)</th>
                    <th>Humidity (in %)</th>
                    <th>Precipitation (in mm)</th>
                    <th>Condition</th>
                </tr>
            </thead>
            <tbody>
                {forecastRows}
            </tbody>
        </Table>
    </div>
)};

export default forecast;