<template>
  <div>
    <v-container>
      <h1 class="font-weight-light">{{ $t("places.title") }}</h1>
      <h3 class="font-weight-light" v-if="places.length > 0">
        {{ $t("places.sub_title") }}
      </h3>
      <h3 class="font-weight-light" v-else>
        {{ $t("places.no_places") }}
      </h3>
      <v-card class="mx-auto mt-4" v-for="place in places" :key="place.id">
        <div>
          <v-img :src="getImageUrl(place.name)" height="200px"></v-img>
          <div class="d-flex">
            <v-card-title class="font-weight-light">
              {{ place.name }}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn
                color="cyan darken-2"
                :to="`/places/${place._id}/?lang=${$i18n.locale}`"
              >
                {{ $t("places.hist") }}</v-btn
              >
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["places"])
  },
  async fetch({ store }) {
    await store.dispatch("loadAllPlaces");
  },
  methods: {
    getImageUrl(placeName) {
      //Get a random picture related with the place name
      return `https://loremflickr.com/1000/200/${placeName},city,architecture/all`;
    }
  },
  head() {
    return { titleTemplate: `${this.$t("places.title")} - %s` };
  }
};
</script>
