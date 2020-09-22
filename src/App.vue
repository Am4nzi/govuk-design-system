<template>
  <div id="app">
    <div>
      <GovukHeader />
      <GovukBackLink
        v-if="currentQuestionNumber > 0 || allQuestionsAnswered"
        :link-action="navigateToPreviousRoute"
      />
      <div class="govuk-width-container">
        <main class="govuk-main-wrapper" id="main-content" role="main">
          <router-view
            ref="formQuestion"
            @input="getQuestionInputValue"
            @continue="navigateToNextRoute"
            :form-data="formData"
          />
          <GovukButton
            :button-text="summaryListActiveStatus ? 'Submit' : 'Continue'"
            :button-action="runValidator"
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
import GovukHeader from "./components/GovukHeader";
import GovukBackLink from "./components/GovukBackLink";
import GovukFooter from "./components/GovukFooter";
import GovukButton from "./components/GovukButton";
const mapGetters = require("vuex")["mapGetters"];

Vue.use(Vuelidate);

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
      summaryListActive: false,
      questionProperties: {},
      formData: {
        ["Name"]: "",
        ["Date of Birth"]: "",
        ["Gender"]: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "questionsData",
      "totalQuestions",
      "summaryListActiveStatus",
      "inputValue",
      "allQuestionsAnswered",
    ]),
    currentQuestionName() {
      if (this.allQuestionsAnswered) {
        return this.$route.name;
      } else {
        return this.questionsData[this.currentQuestionNumber].questionName;
      }
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
      if (this.allQuestionsAnswered) {
        this.$store.dispatch("updateSummaryListActive", false);
      }
      this.currentQuestionNumber--;
      this.$router.go(-1);
    },
    runValidator() {
      //TODO remove this condition once gender view has been fixed
      if (this.$route.name === "Gender") {
        this.navigateToNextRoute();
      } else {
        this.$refs.formQuestion.validateInputValue(this.inputValue);
      }
    },
    navigateToNextRoute() {
      if (this.summaryListActive) {
        this.submitFormDataToStore();
        return;
      } else if (this.currentQuestionNumber === this.totalQuestions || this.allQuestionsAnswered) {
        this.$router.push({ name: "summaryList" });
        this.$store.dispatch("updateAllQuestionsAnswered", true);
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