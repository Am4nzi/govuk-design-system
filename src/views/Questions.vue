<template>
  <div class="govuk-width-container">
    <main class="govuk-main-wrapper" id="main-content" role="main">
      <div
        :class="{
          'govuk-form-group': formErrorIsActive,
          'govuk-form-group--error': formErrorIsActive,
        }"
      >
        <router-view
          :legend-text="fieldSetLegend"
          :form-question-properties="formQuestionProperties"
        />
      </div>
      <GovukButton
        button-text="Continue"
        :button-action="navigateToNextRoute"
      />
    </main>
  </div>
</template>

<script>
import GovukButton from "../components/GovukButton";

export default {
  name: "Questions",
  components: {
    GovukButton,
  },
  methods: {
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
    navigateToNextRoute() {
      this.$router.push({ name: this.getNextRoute() });
    },
  },
};
</script>
