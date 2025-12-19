const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");

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
               
        } catch (error) {
            console.log(error);    
        }  
    }
    fetchcityDeatils(city)
}else{
    cityName.textContent = "Unkown City"
}