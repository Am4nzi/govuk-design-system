<template>
  <fieldset class="govuk-fieldset">
    <GovukFieldsetLegend legend-text="What is your name?" />
    <GovukErrorMessage v-if="!$v.name.required" error-message="Dummy Message" />
    <div class="govuk-form-group">
      <GovukLabel form-question-label="Full name" />
      <div>
        <input
          class="govuk-input"
          :value="inputValue"
          @change="$emit('input', $event.target.value)"
          v-on="listeners"
          v-bind="$attrs"
        />
      </div>
    </div>
  </fieldset>
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
      inputValue: '',
    }
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  validations: {
    name: {
      required,
    },
  },
  computed: {
    listeners() {
      const { ...listeners } = this.$listeners;
      return listeners;
    },
  },
  mounted() {
    this.inputValue = this.formData['Name'];
  },
};
</script>
