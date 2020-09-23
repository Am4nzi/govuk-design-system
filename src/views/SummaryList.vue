<template>
  <div class="govuk-width-container">
    <GovukFieldsetLegend :legend-text="legendText" />
    <GovukSummaryList :form-data="formData" v-on:linkAction="navigateToQuestion" />
  </div>
</template>

<script>
import GovukSummaryList from "../components/GovukSummaryList";
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";

export default {
  name: "SummaryList",
  components: {
    GovukSummaryList,
    GovukFieldsetLegend,
  },
  data: () => ({
    legendText: "Please review your details before submission",
  }),
  props: {
    formData: Object,
  },
  methods: {
    navigateToQuestion(questionName) {
      this.$router.push({ name: questionName });
      this.$store.dispatch("updateChangeAnswerActive", true);
      this.$store.dispatch("updateSummaryListActive", false);
    }
  },
};
</script>
