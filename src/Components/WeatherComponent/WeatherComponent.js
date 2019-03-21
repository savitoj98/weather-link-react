import React, { Component } from 'react';
import CurrentComponent from './CurrentComponent';
import ForecastComponent from './ForecastComponent';
import PastComponent from './PastComponent';
import Loader from 'react-loader-spinner';

import axios from 'axios';

const getCurrentWeather = (location, apiKey) => {
    return new Promise((resolve,reject) => {
        axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${location.coords.lat},${location.coords.long}`)
            .then(res => {
                res = res.data
                let current_data = {
                    "temp_c": res.current.temp_c,
                    "condition": res.current.condition.text,
                    "wind_mph": res.current.wind_mph,
                    "precip_mm": res.current.precip_mm,
                    "humidity": res.current.humidity,
                    "pressure_mb": res.current.pressure_mb,
                }

                resolve({
                    name: res.location.name,
                    region: res.location.region,
                    country: res.location.country,
                    lat: res.location.lat,
                    long: res.location.lon,
                    current: current_data
                })

            })
            .catch(e => {
                reject(e)
                console.log(e)
            })
    })
}

const getForecastWeather = (location,apiKey) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://api.apixu.com/v1/forecast.json?key=${apiKey}&q=${location.coords.lat},${location.coords.long}&days=5`)
            .then(res => {
                let forecastArray = res.data.forecast.forecastday
                let forecast_data = []
                forecastArray.forEach((elem, i) => {

                    let forecast_obj = {
                        "date": elem.date,
                        "wind_mph": elem.day.maxwind_mph,
                        "humidity": elem.day.avghumidity,
                        "precip_mm": elem.day.totalprecip_mm,
                        "condition": elem.day.condition.text,
                        "temp_c": elem.day.avgtemp_c,

                    }
                    forecast_data.push(forecast_obj)

                    if (i === forecastArray.length - 1) {
                        resolve(forecast_data)
                    }
                });
            })
            .catch(e => {
                reject(e)
                console.log(e)
            })
    })
}

const getPastWeather = (location,apiKey) => {
    return new Promise((resolve, reject) => {
        let past_data = []
        for (let day = 0; day < 7; day++) {
            let dateStamp = new Date()
            dateStamp.setDate(dateStamp.getDate() - day - 1)

            let dateStampFormated = (dateStamp.getFullYear()) + "-" + (dateStamp.getMonth() + 1) + "-" + (dateStamp.getDate())

            axios.get(`http://api.apixu.com/v1/history.json?key=${apiKey}&q=${location.coords.lat},${location.coords.long}&dt=${dateStampFormated}`)
                .then(res => {
                    let elem = res.data.forecast.forecastday[0]

                    let past_obj = {
                        "date": dateStamp,
                        "wind_mph": (elem) ? (elem.day.maxwind_mph):(null),
                        "humidity": (elem) ? (elem.day.avghumidity):(null),
                        "precip_mm": (elem) ? (elem.day.totalprecip_mm):(null),
                        "condition": (elem) ? (elem.day.condition.text):(null),
                        "temp_c": (elem) ? (elem.day.avgtemp_c):(null),
                    }

                    past_data.push(past_obj)

                    if(past_data.length > 6){
                        resolve(past_data)
                    }

                })
                .catch(e => {
                    reject(e)
                    console.log(e)
                })
        }   
    })
}


class WeatherComponent extends Component {
    
    state = {
        name: "",
        region: "",
        country: "",
        lat: null,
        long: null,
        current: {},
        forecast: [],
        past: [],
        loading: true
    }

    async componentDidMount() {
        if(this.props.location && this.props.apiKey){
            
            //Get Current Weather
            let currentWeather = await getCurrentWeather(this.props.location, this.props.apiKey)
            
            //Get Forecast Weather    
            let forecastWeather = await getForecastWeather(this.props.location, this.props.apiKey)
        
            //Get Past Weather
            let pastWeather = await getPastWeather(this.props.location, this.props.apiKey)
             
            this.setState({
                forecast: forecastWeather,
                past: pastWeather,
                name: currentWeather.name,
                region: currentWeather.region,
                country: currentWeather.country,
                lat: currentWeather.lat,
                long: currentWeather.long,
                current: currentWeather.current,
                loading: false
            })

            
        } 

    }   
    
    formatDate (date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    render(){
        
        return (
            (this.state.loading)?(
                <div style={{ top: "calc(50% - 50px)", left: "calc(50% - 50px)", position: "absolute"}}>
                    <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            ):(<div>
                <div>
                    <h3 style={{ textAlign: "center" }}>{this.state.name}, {this.state.region}, {this.state.country} (Lat: {this.state.lat}, Long: {this.state.long})</h3>
                    <CurrentComponent current={this.state.current} formatDate={this.formatDate}/>
                    <ForecastComponent forecast={this.state.forecast} formatDate={this.formatDate} />
                    <br />
                    <PastComponent past={this.state.past} />
                </div>
            </div>)
        )
    }

}

export default WeatherComponent;