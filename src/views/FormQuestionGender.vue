<template>
  <fieldset class="govuk-fieldset">
    <GovukFieldsetLegend legend-text="What is your name?" />
    <GovukErrorMessage v-if="true" error-message="Dummy Message" />
    <div class="govuk-form-group">
      <div>
        <div class="govuk-radios govuk-radios--inline">
          <div class="govuk-radios__item">
            <input
              v-model="inputValue"
              class="govuk-radios__input"
              type="radio"
              value="Male"
            />
            <label class="govuk-label govuk-radios__label"> Male </label>
          </div>
          <div class="govuk-radios__item">
            <input
              v-model="inputValue"
              class="govuk-radios__input"
              type="radio"
              value="Female"
            />
            <label class="govuk-label govuk-radios__label"> Female </label>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import GovukErrorMessage from "../components/GovukErrorMessage";
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";
export default {
  name: "FormQuestionGender",
  components: {
    GovukErrorMessage,
    GovukFieldsetLegend,
  },
};
</script>
