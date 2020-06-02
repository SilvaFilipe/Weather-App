<template>
  <v-icon large color="white" class="weather-icon-margin">{{
    weatherIcon
  }}</v-icon></template
>

<script>
export default {
  props: ["weatherInfo", "isNight"],
  computed: {
    weatherIcon() {
      //Display different weather icon depending on the weather information
      switch (this.weatherInfo) {
        case "clear sky":
          return this.isNight ? "mdi-weather-night" : "mdi-weather-sunny";
        case "few clouds":
        case "scattered clouds":
        case "overcast clouds":
        case "broken clouds":
        case "mist":
          return "mdi-weather-cloudy";
        case "moderate rain":
        case "light rain":
        case "shower rain":
          return "mdi-weather-rainy";
        case "rain":
          return "mdi-weather-pouring";
        case "thunderstorm":
          return "mdi-weather-lightning";
        case "snow":
          return "mdi-weather-snowy";
        default:
          return "mdi-weather-rainy";
      }
    }
  }
};
</script>
