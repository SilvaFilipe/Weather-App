<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ $t("error_page.404") }}
    </h1>
    <h1 v-else>
      {{ $t("error_page.error") }}
    </h1>
    <NuxtLink :to="`/?lang=${$i18n.locale}`">
      {{ $t("general.homepage") }}
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? this.$t("error_page.404")
        : this.$t("error_page.error");
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
