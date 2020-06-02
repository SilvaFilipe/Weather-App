<template>
  <!--Display list of all the searches from the current place-->
  <search-list :searches="currentPlaceSearches" :title="currentPlace.name" />
</template>

<script>
import { mapState } from "vuex";
export default {
  async fetch({ store, params }) {
    await store.dispatch("loadPlace", { placeId: params.id });
    await store.dispatch("loadPlaceSearches", { placeId: params.id });
  },
  computed: {
    ...mapState(["currentPlace", "currentPlaceSearches"])
  },
  head() {
    return { titleTemplate: `${this.currentPlace.name} - %s` };
  },
  components: {
    "search-list": require("@/components/SearchList.vue").default
  }
};
</script>
