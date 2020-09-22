import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userDetails: {
      name: null,
      dateOfBirth: null,
      gender: null,
    },
    questionsData: [
      {
        questionName: "Name",
      },
      {
        questionName: "Date of Birth",
      },
      {
        questionName: "Gender",
      },
    ],
    summaryListActive: false,
    allQuestionsAnswered: false,
    currentQuestionInputValue: "",
  },
  getters: {
    allQuestionsAnswered: (state) => state.allQuestionsAnswered,
    formData: (state) => state.formData,
    inputValue: (state) => state.currentQuestionInputValue,
    questionsData: (state) => state.questionsData,
    summaryListActiveStatus: (state) => state.summaryListActive,
    totalQuestions: (state) => state.questionsData.length - 1,
  },
  mutations: {
    setAllQuestionsAnswered: (state, value) =>
      (state.allQuestionsAnswered = value),
    setCurrentQuestionInputValue: (state, value) =>
      (state.currentQuestionInputValue = value),
    setFormDataFirstName: (state, value) => (state.formData["Name"] = value),
    setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
    setSummaryListActive: (state, summaryListActiveState) =>
      (state.summaryListActive = summaryListActiveState),
  },
  actions: {
    updateAllQuestionsAnswered: (context, value) =>
      context.commit("setAllQuestionsAnswered", value),
    updateValidData: (context, value) =>
      context.commit("setCurrentQuestionInputValue", value),
    updateSummaryListActive: (context, value) =>
      context.commit("setSummaryListActive", value),
    updateUserDetails(context, formData) {
      let userDetails = {};
      //Convert keys from sentence case to camelCase
      for (const property in formData) {
        userDetails[
          `${property}`
            .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
              return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "")
        ] = `${formData[property]}\``;
      }
      context.commit("setUserDetails", userDetails);
    },
  },
});
