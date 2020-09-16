<template>
  <fieldset class="govuk-fieldset">
    <GovukFieldsetLegend legend-text="What is your name?" />
    <GovukErrorMessage v-if="true" error-message="Dummy Message" />
    <div class="govuk-form-group">
      <GovukLabel form-question-label="Full name" />
      <div>
        <input v-model="inputValue" class="govuk-input" autocomplete="on" />
      </div>
    </div>
  </fieldset>
</template>

<script>
import GovukErrorMessage from "../components/GovukErrorMessage";
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";
import GovukLabel from "../components/GovukLabel";
export default {
  name: "FormQuestionName",
  components: {
    GovukErrorMessage,
    GovukFieldsetLegend,
    GovukLabel,
  },
};
</script>
