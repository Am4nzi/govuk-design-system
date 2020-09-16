<template>
  <div class="govuk-form-group">
    <GovukLabel form-question-label="What is your name?" />
    <div>
      <input v-model="inputValue" class="govuk-input" autocomplete="on" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormQuestionName",
};
</script>
