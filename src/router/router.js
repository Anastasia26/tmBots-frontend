import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UsersActivation from '../views/UsersActivation.vue'
import MainUserProfile from '../views/UserProfile/MainUserProfile.vue'
import UserProfile from '../views/UserProfile/UserProfile.vue'
import ChangePasswordForm from '../views/ChangePasswordForm.vue'
import JuridicalEditUserInfo from '../views/UserProfile/juridical/JuridicalEditUserInfo.vue'
import PhysicalEditUserInfo from '../views/UserProfile/physial/PhysicalEditUserInfo.vue'
import SearchQueryHeader from '../views/SearchQueries/SearchQueryMain'
import EditQueryMain from '../views/SearchQueries/EditQueryMain'
import CreateNewSearchQuery from '../views/SearchQueries/CreateNewSearchQuery'
import SearchReportsMain from '../views/SearchReports/SearchReportsComponents/SearchReportsMain'
import AllReportsMain from "../views/SearchReports/AllReportsComponents/AllReportsMain";
import UserBalanceMain from "../views/UserBalance/UserBalanceMain";
import HowItWorksPage from "../components/footers_markups/HowItWorksPage";
import HowMakeRequestPage from "../components/footers_markups/HowMakeRequestPage";
import IntellectualPropertyPage from "../components/footers_markups/IntellectualPropertyPage";
import PublicOfferPage from "../components/footers_markups/PublicOfferPage";
import UsageRulesPage from "../components/footers_markups/UsageRulesPage";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/activation/:uid/:token',
    name: 'activation',
    component: UsersActivation
  },
  {
    path: '/resetpassword/:uid/:token',
    name: 'ChangePassword',
    component: ChangePasswordForm
  },
  {
    path: '/profile',
    name: 'MainUserProfile',
    component: MainUserProfile,
    children: [
      {
        path: '',
        meta: {layout: 'main'},
        redirect: 'user'
      },
      {
        path: 'user',
        meta: {layout: 'main'},
        component: UserProfile
      }
    ]
  },
  {
    path: '/juridical-edit',
    name: 'JuridicalEditUserInfo',
    meta: {layout: 'main'},
    component: JuridicalEditUserInfo
  },
  {
    path: '/physical-edit',
    name: 'PhysicalEditUserInfo',
    meta: {layout: 'main'},
    component: PhysicalEditUserInfo
  },
  {
    path: '/search-query',
    name: 'SearchQueryHeader',
    meta: {layout: 'main'},
    component: SearchQueryHeader,
  },
  {
    path: '/edit-query/:id',
    name: 'EditQueryMain',
    meta: {layout: 'main'},
    component: EditQueryMain
  },
  {
    path: '/new-search-query',
    name: 'CreateNewSearchQuery',
    meta: {layout: 'main'},
    component: CreateNewSearchQuery
  },
  {
    path: '/search-report',
    name: 'searchReport',
    meta: {layout: 'main'},
    component: SearchReportsMain
  },
  {
    path: '/allsearch-report/:id',
    name: 'allsearchReport',
    meta: {layout: 'main'},
    component: AllReportsMain,

  },
  {
    path: '/balance',
    name: 'balance',
    meta: {layout: 'main'},
    component: UserBalanceMain
  },
  {
    path: '/howItWorks',
    name: 'howItWorks',
    component: HowItWorksPage
  },
  {
    path: '/howMakeRequest',
    name: 'howMakeRequest',
    component: HowMakeRequestPage
  },
  {
    path: '/usageRules',
    name: 'usageRules',
    component: UsageRulesPage
  },
  {
    path: '/publicOffer',
    name: 'publicOffer',
    component: PublicOfferPage
  },
  {
    path: '/intellectualProperty',
    name: 'intellectualProperty',
    component: IntellectualPropertyPage
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const privatePages = ['/profile/user', '/juridical-edit', '/physical-edit',  '/search-query', '/new-search-query', '/search-report', '/allsearch-report/:id', '/balance'];
  const privateHomePage = '/';
  const authRequired = privatePages.includes(to.path);
  const authHomeRequired = privateHomePage.includes(to.path);
  const loggedInaccess = localStorage.getItem('access');
  const loggedInrefresh = localStorage.getItem('refresh');

  if (authRequired && !loggedInaccess && !loggedInrefresh) {
    return next('/');
  }

  if (authHomeRequired && loggedInaccess && loggedInrefresh) {
    return next('/search-query');
  }

  next();
});

export default router
