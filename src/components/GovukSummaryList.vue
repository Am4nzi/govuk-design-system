<template>
  <div>
    <dl class="govuk-summary-list" v-for="(item, key) in formData" :key="item">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">{{ key }}</dt>
        <dd class="govuk-summary-list__value"> {{ item }} </dd>
        <dd class="govuk-summary-list__actions">
          <a href="#" @click="navigateToQuestion(key)">
            Change<span class="govuk-visually-hidden">
              contact information</span
            ></a
          >
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  name: "GovukSummaryList",
  props: {
    formData: Object,
  },
  methods: {
    navigateToQuestion(questionName) {
      this.$router.push({ name: questionName });
      this.$store.dispatch("updateSummaryListActive", false);
    }
  },
};
</script>
