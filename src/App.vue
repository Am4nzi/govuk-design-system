<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from 'vuelidate'
import validations from "./mixins/validations";
import getAndSetFormValues from "./mixins/getAndSetFormValues";

Vue.use(Vuelidate)
Vue.mixin(validations);
Vue.mixin(getAndSetFormValues);

export default {
  name: "App",
};
</script>

<style lang="scss">
@import "node_modules/govuk-frontend/govuk/all";

body {
  margin: 0 auto;
}

#app {
  -webkit-font-smoothing: antialiased;
}
</style>
