import Vue from "vue";
import VueRouter from "vue-router";
import SummaryList from "../views/SummaryList.vue";
import FormQuestionName from "../views/FormQuestionName.vue";
import FormQuestionDOB from "../views/FormQuestionDOB.vue";
import FormQuestionGender from "../views/FormQuestionGender.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Name" },
  },
  {
    path: "/name",
    name: "Name",
    component: FormQuestionName,
  },
  {
    path: "/date-of-birth",
    name: "Date of Birth",
    component: FormQuestionDOB,
  },
  {
    path: "/gender",
    name: "Gender",
    component: FormQuestionGender,
  },
  {
    path: "/summary-list",
    name: "Summary List",
    component: SummaryList,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
