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
              :value="inputValueDay"
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
              :value="inputValueMonth"
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
              :value="inputValueYear"
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
  data: () => {
    return {
      inputValueDay: "",
      inputValueMonth: "",
      inputValueYear: "",
    };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    listeners() {
      const { ...listeners } = this.$listeners;
      return listeners;
    },
  },
  mounted() {
    if (this.formData["Date of Birth"]) {
      this.inputValueDay = this.formData["Date of Birth"].split(" ")[0];
      this.inputValueMonth = this.formData["Date of Birth"].split(" ")[1];
      this.inputValueYear = this.formData["Date of Birth"].split(" ")[2];
    }
  },
};
</script>
