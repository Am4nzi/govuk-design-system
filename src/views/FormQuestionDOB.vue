<template>
  <fieldset class="govuk-fieldset">
    <GovukFieldsetLegend legend-text="What is your date of birth?" />
    <GovukErrorMessage v-if="true" error-message="Dummy Message" />
    <div>
      <div id="dob-hint" class="govuk-hint">"For example, 31 3 1980"</div>
      <div class="govuk-date-input">
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label"> Day </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              @change="$emit('input', $event.target.value, 'day')"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              maxlength="2"
              v-bind="$attrs"
            />
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label"> Month </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-2"
              @change="$emit('input', $event.target.value, 'month')"
              type="text"
              autocomplete="on"
              pattern="[0-9]*"
              inputmode="numeric"
              maxlength="2"
              v-bind="$attrs"
            />
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label"> Year </label>
            <input
              class="govuk-input govuk-date-input__input govuk-input--width-4"
              @change="$emit('input', $event.target.value, 'year')"
              type="text"
              autocomplete="on"
              pattern="[0-9]*"
              inputmode="numeric"
              maxlength="4"
              v-bind="$attrs"
            />
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
  name: "FormQuestionDOB",
  components: {
    GovukErrorMessage,
    GovukFieldsetLegend,
  },
  computed: {
    listeners() {
      const { ...listeners } = this.$listeners;
      return listeners;
    },
  },
};
</script>
