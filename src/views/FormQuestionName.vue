<template>
  <div
    class="govuk-form-group"
    :class="{
      'govuk-form-group--error':
        $v.inputValue.$dirty &&
        (!$v.inputValue.required || !$v.inputValue.firstAndSecondNameRequired),
    }"
  >
    <fieldset class="govuk-fieldset">
      <GovukFieldsetLegend legend-text="What is your name?" />
      <GovukErrorMessage
        v-if="$v.inputValue.$dirty && !$v.inputValue.required"
        error-message="Please enter your name"
      />
      <GovukErrorMessage
        v-else-if="
          $v.inputValue.$dirty && !$v.inputValue.firstAndSecondNameRequired
        "
        error-message="Please enter both your first and second name"
      />
      <div
        class="govuk-form-group"
        :class="{ 'form-group--error': $v.inputValue.$error }"
      >
        <GovukLabel form-question-label="Full name" />
        <div>
          <input
            class="govuk-input form__input"
            :value="inputValue"
            @change="$emit('input', $event.target.value)"
            @input="setInputValue($event.target.value)"
            v-on="listeners"
            v-bind="$attrs"
          />
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
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
  data: () => {
    return {
      inputValue: "",
    };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.formData["Name"]) {
      this.$store.dispatch(
        "updateCurrentQuestionInputValue",
        this.formData["Name"]
      );
      this.inputValue = this.formData["Name"];
    }
  },
  computed: {
    listeners() {
      const { ...listeners } = this.$listeners;
      return listeners;
    },
  },
  methods: {
    setInputValue(value) {
      this.$store.dispatch("updateCurrentQuestionInputValue", value);
    },
    validateInputValue(value) {
      this.inputValue = value;
      this.$v.inputValue.$touch();
      if (!this.$v.inputValue.$invalid) {
        this.$emit("continue");
      }
    },
  },
  validations: {
    inputValue: {
      required,
      firstAndSecondNameRequired: (value) =>
        /^[a-zA-Z]+ [a-zA-Z]+$/.test(value),
    },
  },
};
</script>
