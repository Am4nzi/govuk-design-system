# Preliminary Task

## Structure

```
App
└───<GovukHeader />
    <GovukBackLink />
            <router-view />
    <GovukButton />     └─────────  <FormQuestionName />
    <GovukFooter />     └─────────  <FormQuestionDOB />
                        └─────────  <FormQuestionGender />     
                        └─────────  <SummaryList />

```

## Notes

- Vuex no longer handles two-way data-binding, instead it is now passed from child to parent
- Input values are no longer updated on user input, but instead populated with all form values on form submission
- Continue button now takes user straight to summary list if 'change' link has been clicked
- Navigation no longer relies on explicitly stating the route names, but instead increments through an array of route names (meaning you can change the order without having to change the nav logic)
- Vuelidate introduced for form validation
- mixins removed as no longer needed

## Installation

1. Clone repo
2. Run `npm i` to install dependencies
5. Run `npm run serve` to start the app in development mode
6.  Navigate to `http://localhost:8080/`
