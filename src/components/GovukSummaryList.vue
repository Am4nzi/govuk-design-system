<template>
  <div>
    <dl class="govuk-summary-list" v-for="(item, key) in formData" :key="item">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">{{ key }}</dt>
        <dd class="govuk-summary-list__value"> {{ item }} </dd>
        <dd class="govuk-summary-list__actions">
          <router-link :to="{ name: `Name` }"
            >Change<span class="govuk-visually-hidden">
              contact information</span
            ></router-link
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
};
</script>
