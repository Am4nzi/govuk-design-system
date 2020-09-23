<template>
  <fieldset class="govuk-fieldset">
    <GovukFieldsetLegend legend-text="What is your gender?" />
    <div class="govuk-form-group">
      <div>
        <div class="govuk-radios govuk-radios--inline">
          <govukRadios
            v-for="gender in genderValues"
            :key="gender"
            :form-data="formData"
            :inputValue="gender"
            :label="gender"
            @input="getQuestionInputValue"
          />
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";
import GovukRadios from "../components/GovukRadios";
export default {
  name: "FormQuestionGender",
  inheritAttrs: false,
  components: {
    GovukFieldsetLegend,
    GovukRadios,
  },
  data: () => {
    return {
      inputValue: "",
      genderValues: ["Male", "Female"],
    };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getQuestionInputValue(questionInputValue) {
      this.$emit("input", questionInputValue);
    },
  },
};
</script>
