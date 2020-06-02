<template>
  <div>
    <v-container>
      <h1 class="font-weight-light">{{ title }}</h1>
      <v-data-table
        :headers="headers"
        :items="searches"
        :items-per-page="5"
        class="elevation-1"
        :no-data-text="$t('general.empty')"
        :footer-props="{
          itemsPerPageText: $t('general.rows_per_page'),
          itemsPerPageAllText: $t('general.all')
        }"
      >
        <template v-if="showPlace" v-slot:item.place="{ item }">
          <td>{{ item.placeName }}</td>
        </template>
        <template v-slot:item.date="{ item }">
          <td>{{ item.date | dateFormat }}</td>
        </template>
        <template v-slot:item.celsiusDegrees="{ item }">
          <td>{{ item.celsiusDegrees }}&deg;C</td>
        </template>
        <template v-slot:item.weather="{ item }">
          <weather-icon :weatherInfo="item.weather" />
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["title", "searches", "showPlace"],
  data() {
    return {};
  },
  computed: {
    headers() {
      let headers = [
        { text: this.$t("general.place"), value: "place" },
        { text: this.$t("general.date"), value: "date" },
        {
          text: this.$t("general.degrees"),
          value: "celsiusDegrees",
          sortable: false
        },
        { text: this.$t("general.weather"), value: "weather", sortable: false }
      ];

      //If current page is not account history, remove Place header
      if (!this.showPlace) headers.shift();

      return headers;
    }
  },
  filters: {
    dateFormat(value) {
      //format ex: 31/01/2020
      if (!value) return "";

      var date = new Date(value),
        month = "" + (date.getMonth() + 1),
        day = "" + date.getDate(),
        year = date.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("/");
    }
  },
  components: {
    "weather-icon": require("@/components/WeatherIcon.vue").default
  }
};
</script>
