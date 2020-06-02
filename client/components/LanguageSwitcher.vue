<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on"> {{ $i18n.locale }} </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(locale, i) in $i18n.availableLocales" :key="i">
        <v-list-item-title @click="changeLang(locale)">{{
          $t("language", locale)
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
    changeLang(locale) {
      this.$store.commit("set_lang", locale);
      //Re-route to the current page but with the selected language
      this.$router.push({
        path: `${this.$router.currentRoute.path}?lang=${locale}`
      });
    }
  }
};
</script>

<style scoped lang="sass">
.v-menu__content
    cursor: pointer
</style>
