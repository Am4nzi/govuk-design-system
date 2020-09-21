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
            <router-view @input="getQuestionInputValue" :form-data="formData" />
          </div>
          <GovukButton
            :button-text="summaryListActiveStatus ? 'Submit' : 'Continue'"
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
      currentQuestionInputValue: null,
      summaryListActive: false,
      questionProperties: {},
      formData: {
        ["Name"]: null,
        ["Date of Birth"]: null,
        ["Gender"]: null,
      },
    };
  },
  computed: {
    ...mapGetters(["questionsData", "totalQuestions", "summaryListActiveStatus"]),
    currentQuestionName() {
      return this.questionsData[this.currentQuestionNumber].questionName;
    },
  },
  methods: {
    getQuestionInputValue(questionInputValues, questionProperty) {
      if (questionProperty) {
        this.questionProperties[questionProperty] = questionInputValues;
        let questionPropertiesArray = Object.values(this.questionProperties);
        this.formData[this.currentQuestionName] = questionPropertiesArray.join(
          " "
        );
      } else {
        this.formData[this.currentQuestionName] = questionInputValues;
      }
    },
    navigateToPreviousRoute() {
      this.currentQuestionNumber--;
      this.summaryListActive = false;
      this.$router.push({ name: this.currentQuestionName });
    },
    navigateToNextRoute() {
      if (this.summaryListActive) {
        this.submitFormDataToStore();
        return;
      } else if (this.currentQuestionNumber === this.totalQuestions) {
        this.$router.push({ name: "summaryList" });
        this.$store.dispatch("updateSummaryListActive", true);
      } else {
        this.currentQuestionNumber++;
        this.$router.push({ name: this.currentQuestionName });
      }
    },
    submitFormDataToStore() {
      this.$store.dispatch("updateUserDetails", this.formData);
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
