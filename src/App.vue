<template>
  <div id="app">
    <div>
      <GovukHeader />
      <GovukBackLink
        v-if="currentQuestionNumber > 0"
        :link-action="navigateToPreviousRoute"
      />
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
import Vuelidate from "vuelidate";
import getAndSetFormValues from "./mixins/getAndSetFormValues";
import GovukHeader from "./components/GovukHeader";
import GovukBackLink from "./components/GovukBackLink";
import GovukFooter from "./components/GovukFooter";
import GovukButton from "./components/GovukButton";
const mapGetters = require("vuex")["mapGetters"];

Vue.use(Vuelidate);
Vue.mixin(getAndSetFormValues);

export default {
  name: "App",
  components: {
    GovukHeader,
    GovukBackLink,
    GovukFooter,
    GovukButton,
  },
  data: () => {
    return {
      currentQuestionNumber: 0,
    };
  },
  computed: {
    ...mapGetters(["questionsData", "totalQuestions"]),
    currentQuestionName() {
      return this.questionsData[this.currentQuestionNumber].questionName;
    },
  },
  methods: {
    navigateToPreviousRoute() {
      this.currentQuestionNumber--;
      this.$router.push({ name: this.currentQuestionName });
    },
    navigateToNextRoute() {
      //TODO add conditional here. If Vuex is populated go straight to summary
      if (this.currentQuestionNumber === this.totalQuestions) {
        return;
      } else {
        this.currentQuestionNumber++;
      }
      this.$router.push({ name: this.currentQuestionName });
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