<template>
  <div>
    <v-container>
      <v-form ref="form">
        <v-text-field
          color="white"
          spellcheck="false"
          filled
          v-model="userData.email"
          required
          :rules="emailRules"
          :placeholder="$t('auth.email')"
          prepend-icon="mdi-account"
          @keyup.enter="validateForm(userData)"
        ></v-text-field>

        <v-text-field
          color="white"
          filled
          type="password"
          v-model="userData.password"
          required
          :rules="passwordRules"
          :placeholder="$t('auth.password')"
          prepend-icon="mdi-lock"
          @keyup.enter="validateForm(userData)"
        >
        </v-text-field>
      </v-form>
      <v-card-actions>
        <h3 class="font-weight-light error-message">{{ errorMessage }}</h3>
        <v-spacer></v-spacer>
        <v-btn color="cyan darken-2" @click="validateForm(userData)">{{
          btnLabel
        }}</v-btn>
      </v-card-actions>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["btnLabel", "submitForm", "errorMessage"],
  data() {
    return {
      userData: { email: "", password: "" },
      emailRules: [],
      passwordRules: []
    };
  },
  watch: {
    "userData.email"() {
      this.emailRules = [];
    },
    "userData.password"() {
      this.passwordRules = [];
    }
  },
  methods: {
    validateForm(userData) {
      //Validation rules need to be empty before submition,
      //otherwise validation will be checked everytime the user types, even before submition
      this.emailRules = [
        v => !!v || this.$t("auth.email_required"),
        v => /.+@.+\..+/.test(v) || this.$t("auth.email_valid")
      ];
      this.passwordRules = [
        v => !!v || this.$t("auth.password_required"),
        v => (v && v.length >= 6) || this.$t("auth.password_length")
      ];

      let self = this;
      setTimeout(function() {
        if (self.$refs.form.validate()) {
          self.submitForm(userData);
        }
      });
    }
  }
};
</script>

<style scoped lang="sass">
.error-message
    color: red
</style>
