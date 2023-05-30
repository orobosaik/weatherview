// Get search autocomplete suggestion
async function searchSuggestions(searchItem) {
	try {
		const searchData = await fetch(
			`https://api.weatherapi.com/v1/search.json?key=da317d0d5f7b41e1b8a191925231104&q=${searchItem}`,
			{ mode: "cors" }
		);
		const searchJson = await searchData.json();
		console.log(searchJson);
		return searchJson;

	} catch (error) {
		return "No Internet";

	}
}

async function getCurrentWeather(searchItem) {
	try {
		const searchData = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=da317d0d5f7b41e1b8a191925231104&q=${searchItem}`,
			{ mode: "cors" }
		);
		const searchJson = await searchData.json();
		if (searchJson.error) {
			return {
				status: "not_found",
				message: searchJson.error.message,
			};
		} else
			return {
				status: "found",
				date: searchJson.location.localtime.split(" ")[0],
				time: searchJson.location.localtime.split(" ")[1],
				name: searchJson.location.name,
				region: searchJson.location.region,
				country: searchJson.location.country,

				condition_text: searchJson.current.condition.text,
				condition_icon: searchJson.current.condition.icon,
				feelslike: searchJson.current.feelslike_c,
				humidity: searchJson.current.humidity,
				pressure_in: searchJson.current.pressure_in,
				temp_c: searchJson.current.temp_c,
				wind_kph: searchJson.current.wind_kph,

				maxtemp_c: searchJson.forecast.forecastday[0].day.maxtemp_c,
				mintemp_c: searchJson.forecast.forecastday[0].day.mintemp_c,
			};
	} catch (error) {
		if (error.message.toLowerCase() === "failed to fetch") {
			return {
				status: "error",
				message: "No Internet Connection",
			};
		} else
			return {
				status: "error",
				message: error.message,
			};
	}
}

function getSearchSuggestions(place) {
	searchSuggestions(place).then((result) => {
		return result
	})
}
export {getCurrentWeather, getSearchSuggestions}