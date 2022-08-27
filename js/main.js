// // main content for weather app goes here

// Using the Open Weather API create a weather application that, at a minimum, displays the High, Low, Current and Feels Like using JavaScript.
// (Creative freedom is encouraged here)
// You will possibly need to change the weather data from Kelvin to Farenheit using this formula (Depending on the api endpoint you are accessing)
// ℉=((K-273.15)*1.8)+32
// You can add a zip code to your project if you wish (not a strict requirement). This is shown in the walkthrough demo video as a possible outcome but again is not mandatory.
// Once the project is complete, commit the project to github and submit the github repository link to the assignment.

console.log('in main.js')

// order of ops:

// user will input a valid US city name 

// form element will capture the submit event of city name

// eventlistener will be created, which will take in the submit event
    
// the main fn: handleSubmit, will grab the event's string value which is the city name input by the user to lowercase?, and ...
    
// pass it through to the getCityData fn, which will fetch an api json response and return all of the weather data for that city name (need fn for fetch promise, and json promise )
    
// having all of the city weather info , will create a for loop which inserts a string of the temperature into the card body of each card specifically into the blank p element, and append the the new innerhtml to the card body
    
    // BONUS: finally, will display a message depending on the weather: put on a sweater , put your bathing suit on , go out for a nice walk etc 
    
    
    
// create scope for the entire process
{
    // form element will capture the submit event of city name
    // grab the form element
    let form = document.getElementById('weatherForm')
    
    // the main fn: handleSubmit, will grab the event's string value which is the city name input by the user to lowercase, and ...
    async function handleSubmit(event){
        event.preventDefault();
        // grab the value (str) of the user city input on the form
        let cityInput = event.target.cityName.value.toLowerCase(); // 'Chicago'
        
        // input that string value into the api fn to get the object
        let cityData = await getCityData(cityInput);
        
        // call the buildCityCard fn to build and insert cityData numbers into html cards
        buildCityCard(cityData);
        
    }
    
    // pass it through to the getCityData fn, which will fetch an api json response and return all of the weather data for that city name (need fn for fetch promise, and json promise )
    async function getCityData(cityInput){
        // fetch data from weather API based on user input
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}&units=imperial`);
        let data = await res.json();
        return data // this should return an object with all the weather data for city... 
    }

    // having all of the city weather data , will create a for loop which inserts a string of the temperature into the card body of each card specifically into the blank p element, and append the the new innerhtml to the card body


    function buildCityCard(cityData, ){

        let cityName = document.createElement('h1');
        cityName.className = 'h1 display-5';
        cityName.innerHTML = cityData.name;
        let location = document.getElementById('br-name');
        location.after(cityName);

        
        let tempItems = [
            cityData.main.temp,
            cityData.main.temp_max,
            cityData.main.temp_min,
            cityData.main.feels_like,
        ]
        
        // WILL NEED A FOR LOOP TO CREATE ELEMENT FOR EACH
        for (let i in tempItems){
            // select the p element that will show weather in degrees F for each card
            let cityTemp = document.querySelectorAll('p')[i];
            cityTemp.className = 'p ms-3';
            // WILL NEED TO PASS IN THE API RESULTS FOR HIGH, LOW, CURRENT, FEELS LIKE HERE...
            cityTemp.innerHTML = tempItems[i] + '°'; // 
            let thisCard = document.getElementsByClassName('card')[i];
            thisCard.append(cityTemp);
            
        }
    }    
    
    console.log(getCityData('chicago'))
    console.log(typeof getCityData('chicago'))


    // eventlistener will be created, which will take in the submit event
    form.addEventListener('submit', handleSubmit)
};


// let cityTemp = document.querySelectorAll('p');
// for (let i in cityTemp){
//     console.log(i, cityTemp[i])
// }