<script lang="ts">
import type { List } from '@/model/hourlyweather';
import weatherService from '@/service/weatherService';
import hourlyweatherService from '@/service/hourlyweatherService';


export default {
 
  data(){ 
    return { 
      weatherMain: '',
      weatherDescription: '',
      locationName : '',
      weatherIcon:'',
      temperature:'',
      feelslike :'',
      pressure:'',
      humidity:'',
      lname1: '',
      lname2: '',
      lname3: '',
      hWeather : new Array<List>()        
         } 
  },
  created: function () {
      this.getVal()
    },
    methods: {

      setVal(){
        localStorage.setItem('LocationName1',localStorage.getItem('LocationName2')||'')
        localStorage.setItem('LocationName2',localStorage.getItem('LocationName3')||'')
        localStorage.setItem('LocationName3',this.locationName)
        },
      getVal(){
        this.lname1 = localStorage.getItem('LocationName1') || '';
        this.lname2 = localStorage.getItem('LocationName2') || '';
        this.lname3 = localStorage.getItem('LocationName3') || '';        
        },
      getWeatherEvent() {
        weatherService
          .getWeather(this.locationName)
          .then(data => {
          this.weatherMain = data.weather[0].main;
          this.weatherDescription = data.weather[0].description;
          this.weatherIcon = "https://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
          this.temperature = data.main.temp;
          this.feelslike = data.main.feels_like;
          this.pressure = data.main.pressure;
          this.humidity = data.main.humidity;
            })
         .catch(error => {
          console.log(error);
          })          
      },
      getForecastWeatherEvent() {
        hourlyweatherService
          .gethourlyweather(this.locationName)
          .then(data=> 
          {
            this.hWeather = data.list
          })
          .catch(error => {
          console.log(error);
          })          
      }
    }
  }
</script>

<template>
<div>
  <img src="../assets/weather-logo.png">
</div>
<div>
   <h1>City Weather</h1>
</div>
<div></div>
<div>
<label> {{lname1}}  {{lname2}} {{lname3}}</label>
</div>
<div></div>
<div>
      <input type="text" @blur="getWeatherEvent();getForecastWeatherEvent();setVal();getVal();" v-model="locationName" placeholder="Location/ City/ State"/>
</div> 
<div></div>
<div>
    <img :src="weatherIcon">   
</div>
<div>
    <label>{{temperature}}</label>
</div>
<div></div>
<div></div>
<div>
  <h2> Weather description </h2>
</div>
<div></div>
<div>
    <label>Weather : {{weatherMain}} Description : {{weatherDescription}}</label>
 </div>
 <div></div>
 <div>
 <label>Feels like : {{feelslike}} Pressure :{{pressure}} Humidity :{{humidity}}</label>
 </div>
 <div></div>
 <div></div>
 <div></div>

<div>
<h2>Hourly Forecast </h2>
</div>
<div></div>
<table>
    <tr v-for="hw in hWeather">   
      <td><img :src="`https://openweathermap.org/img/wn/{{ hw.weather[0].icon }}.png`"/></td>
      <td></td>
      <td></td>
      <td><label>{{ hw.main.temp }}</label></td>
      <td></td>
      <td></td>
      <td><label >{{ hw.dt_txt }}</label></td>    
    </tr>  
  </table>
 

</template>
