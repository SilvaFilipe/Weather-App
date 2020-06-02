<template>
  <v-layout column align-center row class="full-height" :class="mainBackground">
    <!-- Weather search -->
    <v-slide-y-transition>
      <div v-show="pageMounted" class="pa-6">
        <div class="d-flex search-top-margin" style="margin-top:20%">
          <h1>Weather App</h1>
          <v-progress-circular
            v-show="showSpinner"
            class="spinner"
            :size="20"
            :width="1"
            color="white"
            indeterminate
          ></v-progress-circular>
        </div>

        <h3 class="font-weight-light">
          {{ $t("search.please_type") }}
        </h3>

        <v-text-field
          filled
          class="pt-4"
          color="white"
          :placeholder="$t('search.placeholder')"
          spellcheck="false"
          v-model="search"
        >
          <template v-slot:append-outer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" @click="getUserCoords"
                  >mdi-crosshairs-gps</v-icon
                >
              </template>
              {{ $t("search.find_location") }}
            </v-tooltip>
          </template></v-text-field
        >
      </div>
    </v-slide-y-transition>

    <!-- Weather data -->
    <v-slide-y-transition>
      <div v-if="weatherData" class="text-center">
        <div>
          <h1 class="font-weight-light">{{ weatherData.name }}</h1>
        </div>
        <div class="d-inline-flex">
          <h1>
            {{ Math.round(weatherData.main.temp)
            }}<span class="font-weight-light">&deg;C</span>
          </h1>
          <weather-icon
            :weatherInfo="weatherData.weather[0].description"
            :isNight="weatherDataIsNight"
          />
        </div>
        <p class="font-weight-light caption">
          {{
            $t("search.search_qtty", {
              placeName: weatherData.name,
              searchQtty: placeSearchQuantity
            })
          }}
        </p>
      </div>
      <div v-if="weatherDataError" class="text-center">
        <p>{{ $t("search.not_found") }}</p>
      </div>
    </v-slide-y-transition>

    <!-- Real time searches -->
    <v-slide-y-transition>
      <p v-show="socketSearch" class="socket-search">{{ socketSearch }}</p>
    </v-slide-y-transition>
  </v-layout>
</template>

<script>
import io from "socket.io-client";
export default {
  created() {
    //Establish connection to socket.io to get real time information about searches being made
    this.socket = io("http://localhost:5000");
    this.socket.on("connectionEstablished", data => {
      console.log("socket.io: connection established");
    });
  },
  mounted() {
    this.pageMounted = true;

    this.socket.on("newSearch", searchData => {
      //When a new search is made, display the place name
      this.socketSearch = searchData.placeName;
    });
  },
  data() {
    return {
      search: "",
      pageMounted: false,
      weatherData: null,
      weatherDataError: false,
      placeSearchQuantity: 0,
      userCoords: {},
      apiUrl:
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather",
      searchTimeout: null,
      showSpinner: false,
      socket: {},
      socketSearch: ""
    };
  },
  computed: {
    mainBackground() {
      //If it is night time in the searched place display black background
      return this.weatherDataIsNight ? "main-background-night" : "";
    },
    weatherDataIsNight() {
      return this.weatherData && this.weatherData.weather[0].icon.endsWith("n");
    }
  },
  watch: {
    search(newVal) {
      this.weatherDataError = false;

      //Search delay, only search after user stops typing for X milliseconds
      if (this.searchTimeout != null) clearTimeout(this.searchTimeout);

      if (!newVal) return;

      var _this = this;
      this.searchTimeout = setTimeout(function() {
        this.searchTimeout = null;
        _this.getWeatherByTextSearch();
      }, 1500);
    },
    socketSearch(newVal) {
      //Clear socket search place after X seconds
      var _this = this;
      setTimeout(function() {
        _this.socketSearch = "";
      }, 6000);
    }
  },
  methods: {
    getUserCoords() {
      navigator.geolocation.getCurrentPosition(position => {
        this.userCoords.lat = position.coords.latitude;
        this.userCoords.lon = position.coords.longitude;

        this.getWeatherByCoords();
      });
    },
    getWeatherByCoords() {
      let openWeatherApiKey = require("../config/keys").openWeatherApiKey;
      this.getWeatherInfo(
        `${this.apiUrl}?lat=${this.userCoords.lat}&lon=${this.userCoords.lon}&appid=${openWeatherApiKey}&units=metric`
      );
    },
    getWeatherByTextSearch() {
      let openWeatherApiKey = require("../config/keys").openWeatherApiKey;
      this.getWeatherInfo(
        `${this.apiUrl}?q=${this.search}&appid=${openWeatherApiKey}&units=metric`
      );
    },
    async getWeatherInfo(url) {
      this.showSpinner = true;

      try {
        let response = await this.$axios(url);
        this.weatherData = response.data;
        this.createHistory(response.data);
      } catch (error) {
        console.error(error);
        this.weatherData = null;
        this.weatherDataError = true;
      }

      this.showSpinner = false;
    },
    async createHistory(placeData) {
      let resp = await this.savePlace(placeData);
      let place = resp.result;
      this.placeSearchQuantity = resp.searchQtty;

      //Create new search
      let userId = null;
      if (this.$store.$auth.$state.user) {
        userId = this.$store.$auth.$state.user._id;
      }

      let search = {
        user: userId,
        place: place._id,
        placeName: place.name,
        celsiusDegrees: Math.round(this.weatherData.main.temp),
        weather: this.weatherData.weather[0].description
      };

      //Create search history
      await this.$axios.post("/searches", search);
    },
    async savePlace(placeData) {
      //Save place, in case it is the first time it is searched
      let resp = await this.$axios.post("/places", placeData);
      return resp.data;
    }
  },
  components: {
    "weather-icon": require("@/components/WeatherIcon.vue").default
  }
};
</script>

<style lang="sass">
.full-height
  height:100%

.v-content
  background: linear-gradient(to top, #78ffd6, #007991)

.main-background-night
  background: linear-gradient(to bottom, #2C5364, #203A43, #0F2027)

.spinner
  margin-top: 16px
  margin-left: 10px

.search-top-margin
  margin-top:20%

.weather-icon-margin
  margin-left: 10px

.socket-search
  position: absolute
  bottom: 10%
</style>
