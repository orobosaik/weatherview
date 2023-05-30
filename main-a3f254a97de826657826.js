(()=>{"use strict";async function e(e){const n=document.querySelector("body > div");let t=await async function(e){try{const n=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=da317d0d5f7b41e1b8a191925231104&q=${e}`,{mode:"cors"}),t=await n.json();return t.error?{status:"not_found",message:t.error.message}:{status:"found",date:t.location.localtime.split(" ")[0],time:t.location.localtime.split(" ")[1],name:t.location.name,region:t.location.region,country:t.location.country,condition_text:t.current.condition.text,condition_icon:t.current.condition.icon,feelslike:t.current.feelslike_c,humidity:t.current.humidity,pressure_in:t.current.pressure_in,temp_c:t.current.temp_c,wind_kph:t.current.wind_kph,maxtemp_c:t.forecast.forecastday[0].day.maxtemp_c,mintemp_c:t.forecast.forecastday[0].day.mintemp_c}}catch(e){return"failed to fetch"===e.message.toLowerCase()?{status:"error",message:"No Internet Connection"}:{status:"error",message:e.message}}}(e);n.innerHTML='<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',t&&"found"==t.status?n.innerHTML=function(e){return console.log(e),`\n    <div class="weathercard">\n      <div>\n      <div class="weathercard__condition-text">${e.condition_text}</div>\n      <div class="weathercard__name">${e.name}, ${e.region}, <span>${e.country}</span></div>\n      <div class="weathercard__time">${e.time}</div>\n      </div>\n\n      <div>\n        <div class="weathercard__condition-icon">\n          <img src="${e.condition_icon}" alt="Weather Icon">\n        </div>\n        <div class="div_wrapper">\n          <div class="weathercard__temp">${e.temp_c}<sup>oC</sup></div>\n          <div></div>\n          <div>\n            <div class="weathercard__humidity">Humidity: <span>${e.humidity}</span></div>\n            <div class="weathercard__wind">Wind: <span>${e.wind_kph}kph</span></div>\n            <div class="weathercard__pressure">Pressure: <span>${e.pressure_in} in</span></div>\n            <div class="weathercard__feelslike">Feels like <span>${e.feelslike} deg</span></div>\n          </div>\n        </div>\n      </div>\n\n      <div class="weathercard__footer">\n      <div class="weathercard__maxtemp">Max Temp: <span>${e.maxtemp_c}</span></div>\n      <div class="weathercard__mintemp">Min Temp: <span>${e.mintemp_c}</span></div>\n      <div class="weathercard__date">Date: <span>${e.date}</span></div>\n      </div>\n\n    </div>\n    `}(t):t&&"not_found"!==t.status&&(n.innerHTML=`<div class="error_info">${t.message}</div>`)}!async function(){const e=document.querySelector("body");let n=document.createElement("input");n.classList="search-bar",n.setAttribute("type","search"),n.setAttribute("placeholder","Search");let t=document.createElement("div");e.append(n,t)}(),window.addEventListener("load",(n=>{const t=document.querySelector('input[type="search"]');t.addEventListener("search",(function(n){e(t.value)})),e("lagos")}))})();