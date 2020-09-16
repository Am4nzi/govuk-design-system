<template>
  <div class="govuk-form-group">
    <GovukLabel :form-question-label="formQuestionProperties.label" />

    <div v-if="formQuestionProperties.hasRadioOptions">
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

    <div v-else>
      <router-view :form-question-label="formQuestionProperties" />
    </div>
  </div>
</template>

<script>
import GovukLabel from "./GovukLabel";
export default {
  name: "GovukFormGroup",
  components: {
    GovukLabel,
  },
  props: {
    legendText: String,
    formQuestionProperties: Object,
  },
};
</script>
