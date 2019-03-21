import React, { Component } from 'react';

//Es5 Syntax - old
import CanvasJS from '../../canvasjs.react';
// var CanvasJSReact = require('../../canvasjs.react');
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const past = (props) => {
    
    //For Temperature
    let dataPointsTemp = []

    props.past.forEach(elem => {
        if(elem.temp_c)
            dataPointsTemp.push({x:elem.date,y:elem.temp_c})
    })

    dataPointsTemp.sort(function (a, b) {
        return new Date(b.x) - new Date(a.x);
    });

    const optionsTemp = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Temperature Variation"
        },
        axisY: {
            title: "Temperature (in "+String.fromCharCode(176)+ "C)",
            suffix: String.fromCharCode(176),
            includeZero: false
        },
        axisX: {
            title:"Date",
            includeZero: false
        },
        data: [{
            type:"line",
            toolTipContent: "Temperature on {x}: {y}" + String.fromCharCode(176) + "C",
            dataPoints:dataPointsTemp
        }]
    }
    
    //For Humidity
    let dataPointsHumidity = []

    props.past.forEach(elem => {
        if (elem.temp_c)
            dataPointsHumidity.push({ x: elem.date, y: elem.humidity })
    })

    dataPointsHumidity.sort(function (a, b) {
        return new Date(b.x) - new Date(a.x);
    });

    const optionsHumidity = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "Humidity Variation"
        },
        axisY: {
            title: "Humidity (in %)",
            suffix: "%",
            includeZero: false
        },
        axisX: {
            title: "Date",
            includeZero: false
        },
        data: [{
            type: "line",
            toolTipContent: "Humidity on {x}: {y}%",
            dataPoints: dataPointsHumidity
        }]
    }


    return (
    <div>
        <h4 style={{ textAlign: "center" }}>Past Weather Change: </h4>
        
        <CanvasJS.CanvasJSChart options={optionsTemp} />
        <CanvasJS.CanvasJSChart options={optionsHumidity} />
    </div>
)};

export default past;