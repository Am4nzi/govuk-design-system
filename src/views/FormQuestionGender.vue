<template>
  <div class="govuk-form-group">
    <GovukLabel form-question-label="What is your gender?" />

    <div>
      <div class="govuk-radios govuk-radios--inline">
        <div class="govuk-radios__item">
          <input
              v-model="inputValue"
              class="govuk-radios__input"
              type="radio"
              value="Male"
          />
          <label class="govuk-label govuk-radios__label"> Male </label>
        </div>
        <div class="govuk-radios__item">
          <input
              v-model="inputValue"
              class="govuk-radios__input"
              type="radio"
              value="Female"
          />
          <label class="govuk-label govuk-radios__label"> Female </label>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "FormQuestionGender",
};
</script>
