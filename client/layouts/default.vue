<template>
  <v-app dark>
    <navbar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    navbar: require("@/components/Navbar.vue").default
  }
};
</script>
