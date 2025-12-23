const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");

const loading = document.querySelector("#Loading");
const cityInfoBox = document.querySelector("#cityinfo");
const errorBox = document.querySelector("#error");

const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const Country = document.querySelector("#Country");
const state = document.querySelector("#State");
const population = document.querySelector("#Population");

let GEODB_API_KEY = "cdacd2af6dmsh3fc7730e3c565d0p10a616jsn13133fce17fa";
let GEODB_HOST = "wft-geo-db.p.rapidapi.com"

if(city){
    cityName.textContent = city;
    async function fetchcityDeatils(cityName) {
        try {
            let res = await fetch(`https://${GEODB_HOST}/v1/geo/cities?namePrefix=${city}&limit=1`,
                {
                 method:"GET", 
                 headers:{
                    "X-RapidAPI-Key":GEODB_API_KEY,
                    "X-RapidAPI-Host":GEODB_HOST,
                 }
            });
            // console.log(res);

            if(!res.ok) {
                console.log("API Response Not Fetched....");
            } 

            let data =  await res.json();
            console.log(data);
            if (!data.data|| data.data.length===0){
                console.log("city not found ");   
            }
            let cityData = data.data[0]
            console.log(cityData);

            // Display city  Info 

            lat.textContent = cityData.latitude;
            lon.textContent = cityData.longitude;
            Country.textContent=cityData.country;
            state.textContent = cityData.region || "N/A"
            population.textContent = cityData.population ? cityData.population.toLocaleString():"N/A";


            loading.classList.add("hidden");
            cityInfoBox.classList.remove("hidden");   
        } catch (error) {
            console.log(error);
            loading.classList.add("hidden");
            errorBox.classList.remove("hidden")    
        }  
    }
    fetchcityDeatils(city)
}else{
    cityName.textContent = "Unkown City"
    loading.classList.add("hidden");
}