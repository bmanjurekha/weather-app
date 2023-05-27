import axios from "axios";

const getWeather = async (locationName: string) => {
  
  localStorage.setItem("Location", JSON.stringify(locationName));
  let lresp = await axios.get("http://api.openweathermap.org/geo/1.0/direct?appid=0f6c1de1ef8510d3a48b470d96c6bfa6&q="+locationName);
   
  let wresp = await axios.get("https://api.openweathermap.org/data/2.5/weather?appid=0f6c1de1ef8510d3a48b470d96c6bfa6&units=metric&lat="+lresp.data[0].lat+"&lon="+lresp.data[0].lon);
  console.log(wresp.data);
  return wresp.data;
}


const weatherService = { getWeather };
export default weatherService;