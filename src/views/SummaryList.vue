<template>
  <div class="govuk-width-container">
    <GovukFieldsetLegend :legend-text="legendText" />
    <GovukSummaryList :form-data="formData" />
  </div>
</template>

<script>
import GovukSummaryList from "../components/GovukSummaryList";
import GovukFieldsetLegend from "../components/GovukFieldsetLegend";

export default {
  name: "SummaryList",
  data: () => ({
    legendText: "Please review your details before submission",
  }),
  props: {
    formData: Object,
  },
  components: {
    GovukSummaryList,
    GovukFieldsetLegend,
  },
};
</script>
