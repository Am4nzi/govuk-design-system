<template>
  <div
    class="govuk-form-group"
    :class="{
      'govuk-form-group--error':
        $v.inputValue.$dirty && !$v.inputValue.dayRequired,
    }"
  >
    <fieldset class="govuk-fieldset">
      <GovukFieldsetLegend legend-text="What is your date of birth?" />
      <GovukErrorMessage
        v-if="$v.inputValue.$dirty && !$v.inputValue.dayRequired"
        error-message="Please enter your full date of birth"
      />
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
                @input="
                  setDay($event.target.value);
                  setInputValue(joinedDateOfBirthValues);
                "
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
                @input="
                  setMonth($event.target.value);
                  setInputValue(joinedDateOfBirthValues);
                "
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
                @input="
                  setYear($event.target.value);
                  setInputValue(joinedDateOfBirthValues);
                "
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
        <input
          type="hidden"
          :value="inputValue"
          @input="
            setInputValue($event.target.value);
          "
        />
      </div>
    </fieldset>
  </div>
</template>

<script>
import GovukErrorMessage from "../components/GovukErrorMessage";
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";
import { minLength, required } from "vuelidate/lib/validators";
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
      inputValue: "",
    };
  },
  props: {
    formData: {
      type: Object,
      required: true,
      inputValue: "",
    },
  },
  computed: {
    listeners() {
      const { ...listeners } = this.$listeners;
      return listeners;
    },
    joinedDateOfBirthValues() {
      const dateOfBirthValues = [
        this.inputValueDay,
        this.inputValueMonth,
        this.inputValueYear,
      ];
      return dateOfBirthValues.join(" ");
    },
  },
  mounted() {
    if (this.formData["Date of Birth"]) {
      this.inputValueDay = this.formData["Date of Birth"].split(" ")[0];
      this.inputValueMonth = this.formData["Date of Birth"].split(" ")[1];
      this.inputValueYear = this.formData["Date of Birth"].split(" ")[2];
    }
  },
  validations: {
    inputValue: {
      required,
      minLength: minLength(4),
      dayRequired: (value) => value.length === 10,
    },
  },
  methods: {
    setDay(value) {
      this.inputValueDay = value;
    },
    setMonth(value) {
      this.inputValueMonth = value;
    },
    setYear(value) {
      this.inputValueYear = value;
    },
    setInputValue(value) {
      this.$store.dispatch("updateValidData", value);
    },
    validateInputValue(value) {
      this.inputValue = value;
      this.$v.inputValue.$touch();
      if (!this.$v.inputValue.$invalid) {
        this.$emit("continue");
      }
    },
  },
};
</script>
