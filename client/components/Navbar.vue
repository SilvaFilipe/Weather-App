<template>
  <v-app-bar fixed app>
    <NuxtLink :to="`/?lang=${$i18n.locale}`">
      <v-toolbar-title v-text="title" />
    </NuxtLink>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div>
          <v-btn v-on="on" exact :to="`/?lang=${$i18n.locale}`" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </template>
      <span>{{ $t("navbar.search") }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div>
          <v-btn v-on="on" :to="`/places/?lang=${$i18n.locale}`" exact icon>
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </div>
      </template>
      <span>{{ $t("navbar.hist") }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div>
          <v-btn v-on="on" :to="`/account/?lang=${$i18n.locale}`" exact icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>
      </template>
      <span>{{ $t("navbar.account") }}</span>
    </v-tooltip>

    <language-switcher />

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div>
          <v-btn v-on="on" v-if="$auth.loggedIn" @click="$auth.logout()" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
      <span>{{ $t("navbar.signout") }}</span>
    </v-tooltip>
  </v-app-bar></template
>

<script>
export default {
  data() {
    return {
      title: "MEVN + Nuxt Weather App"
    };
  },
  components: {
    "language-switcher": require("@/components/LanguageSwitcher.vue").default
  }
};
</script>

<style lang="sass" scoped>
.v-toolbar__title
  color: white !important

.v-application a
  text-decoration: none

.v-toolbar
  z-index: 201
</style>
