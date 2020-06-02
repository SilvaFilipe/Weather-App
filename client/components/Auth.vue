<template>
  <v-dialog v-model="authDialog" persistent max-width="500">
    <v-card>
      <v-tabs v-model="currentTab" fixed-tabs color="white">
        <v-tab>
          {{ $t("auth.login") }}
        </v-tab>
        <v-tab>
          {{ $t("auth.register") }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <user-auth-form
            :btnLabel="$t('auth.login')"
            :submitForm="loginUser"
            :errorMessage="errorMessage"
        /></v-tab-item>
        <v-tab-item>
          <user-auth-form
            :btnLabel="$t('auth.register')"
            :submitForm="registerUser"
            :errorMessage="errorMessage"
        /></v-tab-item>
      </v-tabs-items>
    </v-card> </v-dialog
></template>

<script>
export default {
  data() {
    return {
      errorMessage: "",
      currentTab: 0,
      authDialog: true
    };
  },
  watch: {
    currentTab(newVal) {
      this.errorMessage = "";
    }
  },
  methods: {
    async loginUser(userData) {
      this.errorMessage = "";
      try {
        await this.$auth.loginWith("local", {
          data: userData
        });
        this.$router.push("/");
      } catch {
        this.errorMessage = this.$t("auth.login_error");
      }
    },
    async registerUser(userData) {
      this.errorMessage = "";
      try {
        await this.$axios.post("/users", userData);
        //If register is successful, login user
        await this.loginUser(userData);
      } catch {
        this.errorMessage = this.$t("auth.register_error");
      }
    }
  },
  components: {
    "user-auth-form": require("@/components/UserAuthForm.vue").default
  }
};
</script>
