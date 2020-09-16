<template>
  <div id="app">
    <div>
      <GovukHeader />
      <GovukBackLink :link-action="navigateToPreviousRoute" />
      <div class="govuk-width-container">
        <main class="govuk-main-wrapper" id="main-content" role="main">
          <div
              :class="{
            'govuk-form-group': true,
            'govuk-form-group--error': true,
          }"
          >
            <router-view />
          </div>
          <GovukButton
              button-text="Continue"
              :button-action="navigateToNextRoute"
          />
        </main>
      </div>
      <GovukFooter />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from 'vuelidate'
import getAndSetFormValues from "./mixins/getAndSetFormValues";
import GovukHeader from "./components/GovukHeader";
import GovukBackLink from "./components/GovukBackLink";
import GovukFooter from "./components/GovukFooter";
import GovukButton from "./components/GovukButton";

Vue.use(Vuelidate)
Vue.mixin(getAndSetFormValues);

export default {
  name: "App",
  components: {
    GovukHeader,
    GovukBackLink,
    GovukFooter,
    GovukButton
  },
  methods: {
    getPreviousRoute() {
      const { name } = this.$route;
      switch (name) {
        case "Summary List":
          return "Gender";
        case "Gender":
          return "Date of birth";
        case "Date of birth":
          return "Name";
      }
    },
    getNextRoute() {
      const { name } = this.$route;
      switch (name) {
        case "Name":
          return "Date of birth";
        case "Date of birth":
          return "Gender";
        case "Gender":
          return "Summary List";
      }
    },
    navigateToPreviousRoute() {
      this.$store.dispatch("updateFormErrorIsActive", false);
      this.$router.push({ name: this.getPreviousRoute() });
    },
    navigateToNextRoute() {
      this.$router.push({ name: this.getNextRoute() });
    },
  },
};
</script>

<style lang="scss">
@import "node_modules/govuk-frontend/govuk/all";

body {
  margin: 0 auto;
}

#app {
  -webkit-font-smoothing: antialiased;
}
</style>
