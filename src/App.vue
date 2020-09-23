<template>
  <div id="app">
    <div>
      <GovukHeader />
      <GovukBackLink
        class="pointer-cursor"
        v-if="currentQuestionNumber > 0 || allQuestionsAnswered"
        :link-action="goBackOneStep"
      />
      <div class="govuk-width-container">
        <main class="govuk-main-wrapper" id="main-content">
          <router-view
            ref="formQuestion"
            @input="getQuestionInputValue"
            @continue="navigateToNextRoute"
            :form-data="formInputData"
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
      formInputData: {
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
      "questionsNames",
      "summaryListActive",
      "totalQuestions",
      "changeAnswerActive",
    ]),
    currentQuestionName() {
      if (this.changeAnswerActive) {
        return this.$route.name;
      } else {
        return this.questionsNames[this.currentQuestionNumber];
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
        this.formInputData[
          this.currentQuestionName
        ] = questionPropertiesArray.join(" ");
        //Handle cases where there is a single input
      } else {
        this.formInputData[this.currentQuestionName] = questionInputValues;
      }
    },
    goBackOneStep() {
      if (!this.summaryListActive) {
        this.currentQuestionNumber--;
      }
      if (this.allQuestionsAnswered) {
        this.$store.dispatch("updateSummaryListActive", false);
      }
      this.$router.go(-1);
    },
    runValidator() {
      //TODO remove this.$route.name === "Gender" condition once gender view has been fixed
      if (this.$route.name === "Gender" || this.$route.name === "Summary List") {
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
        this.$store.dispatch("updateChangeAnswerActive", false);
        this.$router.push({ name: "Summary List" });
        this.$store.dispatch("updateAllQuestionsAnswered", true);
        this.$store.dispatch("updateSummaryListActive", true);
      } else {
        this.currentQuestionNumber++;
        this.$router.push({ name: this.currentQuestionName });
      }
    },
    submitFormDataToStore() {
      this.$store.dispatch("updateUserDetails", this.formInputData);
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
.pointer-cursor {
  cursor: pointer;
}
</style>
