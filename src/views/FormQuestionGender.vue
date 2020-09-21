<template>
  <fieldset class="govuk-fieldset">
    <GovukFieldsetLegend legend-text="What is your gender?" />
    <GovukErrorMessage v-if="true" error-message="Dummy Message" />
    <div class="govuk-form-group">
      <div>
        <div class="govuk-radios govuk-radios--inline">
          <govukRadios
            inputValue="Male"
            label="Male"
            @input="getQuestionInputValue"
          />
          <govukRadios
            inputValue="Female"
            label="Female"
            @input="getQuestionInputValue"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import GovukErrorMessage from "../components/GovukErrorMessage";
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";
import GovukRadios from "../components/GovukRadios";
export default {
  name: "GovukRadioInput",
  inheritAttrs: false,
  components: {
    GovukErrorMessage,
    GovukFieldsetLegend,
    GovukRadios,
  },
  methods: {
    getQuestionInputValue(questionInputValue) {
      this.$emit("input", questionInputValue);
    },
  },
};
</script>
