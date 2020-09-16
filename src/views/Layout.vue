<template>
  <div>
    <GovukHeader />
    <GovukBackLink :link-action="navigateToPreviousRoute" />
    <div class="govuk-width-container">
      <main class="govuk-main-wrapper" id="main-content" role="main">
        <div
          :class="{
            'govuk-form-group': true,
            'govuk-form-group--error': true,
          }"
        >
          <router-view />
        </div>
        <GovukButton
          button-text="Continue"
          :button-action="navigateToNextRoute"
        />
      </main>
    </div>
    <GovukFooter />
  </div>
</template>

<script>
import GovukHeader from "../components/GovukHeader";
import GovukBackLink from "../components/GovukBackLink";
import GovukFooter from "../components/GovukFooter";
import GovukButton from "../components/GovukButton";
export default {
  name: "Layout",
  components: {
    GovukHeader,
    GovukBackLink,
    GovukFooter,
    GovukButton
  },
  methods: {
    getPreviousRoute() {
      const { name } = this.$route;
      switch (name) {
        case "Summary List":
          return "Gender";
        case "Gender":
          return "Date of birth";
        case "Date of birth":
          return "Name";
      }
    },
    getNextRoute() {
      const { name } = this.$route;
      switch (name) {
        case "Name":
          return "Date of birth";
        case "Date of birth":
          return "Gender";
        case "Gender":
          return "Summary List";
      }
    },
    navigateToPreviousRoute() {
      this.$store.dispatch("updateFormErrorIsActive", false);
      this.$router.push({ name: this.getPreviousRoute() });
    },
    navigateToNextRoute() {
      this.$router.push({ name: this.getNextRoute() });
    },
  },
};
</script>
