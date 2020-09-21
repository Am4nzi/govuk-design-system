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
        questionSlug: "name",
        questionId: 1,
      },
      {
        questionName: "Date of Birth",
        questionSlug: "date-of-birth",
        questionId: 2,
      },
      {
        questionName: "Gender",
        questionSlug: "gender",
        questionId: 3,
      },
    ],
    formErrorIsActive: false,
  },
  mutations: {
    setFormErrorIsActive: (state, value) => (state.formErrorIsActive = value),
    setFormDataFirstName: (state, value) => (state.formData["Name"] = value),
    setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
  },
  getters: {
    formErrorIsActive: (state) => state.formErrorIsActive,
    formData: (state) => state.formData,
    nameValue: (state) => state.formData["Name"],
    genderValue: (state) => state.formData["Gender"],
    dateOfBirthDay: (state) => state.dateOfBirthRawValues.day,
    dateOfBirthMonth: (state) => state.dateOfBirthRawValues.month,
    dateOfBirthYear: (state) => state.dateOfBirthRawValues.year,
    questionsData: (state) => state.questionsData,
    totalQuestions: (state) => state.questionsData.length - 1,
  },
  actions: {
    updateFormErrorIsActive: (context, value) =>
      context.commit("setFormErrorIsActive", value),
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
      context.commit("setUserDetails", userDetails)
    },
  },
});
