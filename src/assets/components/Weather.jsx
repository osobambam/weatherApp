import React, { useState } from "react";
import clear from "../images/clear.png"
import cloud from "../images/cloud.png"
import drizzle from "../images/drizzle.png"
import humidity from "../images/humidity.png"
import rain from "../images/rain.png"
import search from "../images/search.png"
import snow from "../images/snow.png"
import wind from "../images/wind.png"

export default function Weather(){
    let api_key = "e46ce744eff56a8c1d4c8228a7db0c30"
    const [wicon, setwicon] = useState(cloud)

    const find = async () => {
        const entry = document.getElementsByClassName("input")
        if(entry[0].value===""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${entry[0].value}&appid=${api_key}&units=metric`
        let response = await fetch(url);
        let dat = await response.json();
        const humi = document.getElementsByClassName("humidity-percent");
        const windS = document.getElementsByClassName("wind-speed");
        const temp = document.getElementsByClassName("temperature");
        const loc = document.getElementsByClassName("location");
        humi[0].innerHTML = dat.main.humidity + " %";
        windS[0].innerHTML = Math.floor(dat.wind.speed) + " km/h";
        temp[0].innerHTML = Math.floor(dat.main.temp) + "°C";
        loc[0].innerHTML= dat.name;

        if(dat.weather[0].icon==="01d" || dat.weather[0].icon==="01n"){
            setwicon(clear)
        }
        else if (dat.weather[0].icon==="02d" || dat.weather[0].icon==="02n"){
            setwicon(cloud)
        }
        else if (dat.weather[0].icon==="03d" || dat.weather[0].icon==="03n"){
            setwicon(drizzle)
        }
        else if (dat.weather[0].icon==="04d" || dat.weather[0].icon==="04n"){
            setwicon(drizzle)
        }
        else if (dat.weather[0].icon==="09d" || dat.weather[0].icon==="09n"){
            setwicon(rain)
        }
        else if (dat.weather[0].icon==="10d" || dat.weather[0].icon==="10n"){
            setwicon(rain)
        }
        else if (dat.weather[0].icon==="13d" || dat.weather[0].icon==="13n"){
            setwicon(snow)
        }
        else{
            setwicon(clear)
        }
    }
    return(
        <div className="container">
            <div className="top-part">
                <input type="text" className="input" placeholder="Search" />
                <div className="search-icon" onClick={()=>{find()}}>
                <img src={search} alt="search" />
                </div>
            </div>
            <div className="weather-icon"><img src={wicon} alt="cloud" width="150px" height="150px"/></div>
            <div className="temperature">24°C</div>
            <div className="location">London</div>
            <div className="data">
            <div className="key-facts">
                <img src={humidity} alt="humidity" />
                <div className="figures">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="key-facts">
                <img src={wind} alt="wind" />
                <div className="figures">
                    <div className="wind-speed">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
            </div>
        </div>
    )
}