<template>
  <div id="app">
    <div>
      <GovukHeader />
      <GovukBackLink
        v-if="currentQuestionNumber > 0 || allQuestionsAnswered"
        :link-action="goBackOneStep"
      />
      <div class="govuk-width-container">
        <main class="govuk-main-wrapper" id="main-content">
          <router-view
            ref="formQuestion"
            @input="getQuestionInputValue"
            @continue="navigateToNextRoute"
            :form-data="formData"
          />
          <GovukButton
            :button-text="summaryListActive ? 'Submit' : 'Continue'"
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
      formMultipleInputData: {},
      formData: {
        ["Name"]: "",
        ["Date of Birth"]: "",
        ["Gender"]: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "allQuestionsAnswered",
      "inputValue",
      "questionsData",
      "summaryListActive",
      "totalQuestions",
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
    getQuestionInputValue(questionInputValues, multipleInputProperty) {
      //Handle cases where question has more than one input
      //Takes separate inputs and merges into one string
      if (multipleInputProperty) {
        this.formMultipleInputData[multipleInputProperty] = questionInputValues;
        let questionPropertiesArray = Object.values(this.formMultipleInputData);
        this.formData[this.currentQuestionName] = questionPropertiesArray.join(
          " "
        );
        //Handle cases where there is a single input
      } else {
        this.formData[this.currentQuestionName] = questionInputValues;
      }
    },
    goBackOneStep() {
      if (this.allQuestionsAnswered) {
        this.$store.dispatch("updateSummaryListActive", false);
      }
      this.currentQuestionNumber--;
      this.$router.go(-1);
    },
    runValidator() {
      //TODO remove this.$route.name === "Gender" condition once gender view has been fixed
      if (this.$route.name === "Gender" || this.$route.name === "summaryList") {
        this.navigateToNextRoute();
      } else {
        //Triggers validate method in child, which emits navigateToNextRoute() in App.vue if valid
        this.$refs.formQuestion.validateInputValue(this.inputValue);
      }
    },
    navigateToNextRoute() {
      if (this.summaryListActive) {
        this.submitFormDataToStore();
      } else if (
        this.currentQuestionNumber === this.totalQuestions ||
        this.allQuestionsAnswered
      ) {
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
