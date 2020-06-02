export const state = () => ({
  places: [],
  currentPlace: {},
  currentPlaceSearches: [],
  userSearches: [],
  locale: "en"
});

export const mutations = {
  set_places(state, places) {
    state.places = places;
  },
  set_current_place(state, place) {
    state.currentPlace = place;
  },
  set_current_place_searches(state, searches) {
    state.currentPlaceSearches = searches;
  },
  set_user_searches(state, searches) {
    state.userSearches = searches;
  },
  set_lang(state, locale) {
    state.locale = locale;
  }
};

export const actions = {
  async loadPlace({ commit }, { placeId }) {
    let { result: place } = await loadData(`/places/${placeId}`, this.$axios);
    commit("set_current_place", place);
  },
  async loadPlaceSearches({ commit }, { placeId }) {
    let { result: searches } = await loadData(
      `/searches/place/${placeId}`,
      this.$axios
    );
    commit("set_current_place_searches", searches);
  },
  async loadAllPlaces({ commit }) {
    let { result: places } = await loadData("/places", this.$axios);
    commit("set_places", places);
  },
  async loadUserSearches({ commit }, { userId }) {
    let { result: searches } = await loadData(
      `/searches/user/${userId}`,
      this.$axios
    );
    commit("set_user_searches", searches);
  }
};

async function loadData(url, axios) {
  let response = await axios.get(url);
  return response.data;
}
