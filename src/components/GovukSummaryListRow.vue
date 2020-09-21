<template>
  <div class="govuk-summary-list__row">
    <dt class="govuk-summary-list__key">Placeholder Keys</dt>
    <dd class="govuk-summary-list__value">Placeholder Values</dd>
    <dd class="govuk-summary-list__actions">
      <router-link :to="{ name: `name` }"
      >Change<span class="govuk-visually-hidden">
        contact information</span
      ></router-link
      >
    </dd>
  </div>
</template>

<script>
export default {
  name: "GovukSummaryListRow",
  props: {
    formDataValues: String,
    formDataKeys: String,
  },
};
</script>
