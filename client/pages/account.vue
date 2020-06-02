<template>
  <div>
    <!--Display list of all the searches from the current user-->
    <search-list
      v-if="$auth.loggedIn"
      :searches="userSearches"
      :title="$t('account.acc_history')"
      :showPlace="true"
    />
    <!--If there is no user logged in, display the authentication form-->
    <auth v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  async fetch({ store }) {
    if (store.$auth.$state.user) {
      let userId = store.$auth.$state.user._id;
      await store.dispatch("loadUserSearches", { userId: userId });
    }
  },
  computed: {
    ...mapState(["userSearches"])
  },
  head() {
    return this.$auth.loggedIn
      ? { titleTemplate: this.$t("account.acc_history") }
      : { titleTemplate: this.$t("auth.title") };
  },
  components: {
    auth: require("@/components/Auth.vue").default,
    "search-list": require("@/components/SearchList.vue").default
  }
};
</script>
