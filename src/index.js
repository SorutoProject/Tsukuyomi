//Load Components
import Vue from "vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import localizer from "./components/tsukuyomi/tsukuyomi-messages";
import Dexie from "dexie";

//load pages
import Index from "./pages/index.vue";
import AddConfirm from "./pages/addConfirm.vue";
import ShareConfirm from "./pages/ShareConfirm.vue";
import ShareMultipleConfirm from "./pages/shareMultipleConfirm.vue";
import Share from "./pages/share.vue";
import ShareMultiple from "./pages/shareMultiple.vue";
import New from "./pages/new.vue";
import Alert from "./pages/alert.vue";
import Embed from "./pages/embed.vue";
import About from "./pages/about.vue";
import Timeline from "./pages/timeline.vue";
import Past from "./pages/past.vue";
import Invalid from "./pages/Invalid.vue";

//Vue.use

Vue.use(VueRouter);
Vue.use(VueI18n);


const routes = [
    //main page
    { path: "/", component: Index },
    //detail page
    /*{ path: "/detail/:yyyymmdd/:title", component: require("./pages/detail.vue") },*/
    //confirm page
    { path: "/add/:yyyymmdd/:title", component: AddConfirm },
    //share confirm page(lagacy)
    { path: "/add/:yyyymmdd/:title/share", redirect: "/s/:yyyymmdd/:title" },
    //sharing confirm page
    { path: "/s/:yyyymmdd/:title/", component: ShareConfirm },
    //sharing multiple confirm page
    { path: "/sm/:eventsSet", component: ShareMultipleConfirm },
    //sharing page
    { path: "/share/:yyyymmdd/:title/", component: Share },
    //multiple sharing page
    { path: "/share-multiple", component: ShareMultiple },
    //new event maker
    { path: "/new", component: New },
    //alert to change browser
    { path: "/alert", component: Alert },
    //embed card
    { path: "/embed/:yyyymmdd/:title/", component: Embed },
    //about page
    { path: "/about", component: About },
    //timeline page
    { path: "/timeline", component: Timeline },
    //passed events page
    { path: "/past", component: Past },
    //error page
    { path: "*", component: Invalid },
]

const router = new VueRouter({
    routes
});

const i18n = new VueI18n({
    //userLang and messages are defined in "components/tsukuyomi/tsukuyomi-messages.js"
    locale: localizer.userLang,
    messages:localizer.messages
});

const app = new Vue({
    el: "#app",
    router,
    i18n,
    vuetify,
    data: {
        "drawer": false
    },
    created: function () {
        //set darkmode setting
        const darkmode = localStorage.getItem("tsukuyomi-theme-dark");
        if (darkmode !== null) {
            if (darkmode === "true") {
                this.$vuetify.theme.dark = true;
            } else {
                this.$vuetify.theme.dark = false;
            }
        }
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    },
    mounted: function () {
        //go to alert page when accessed by "in app browser."
        const ua = navigator.userAgent.toLowerCase();
        const isOpenedInApp = /fb|line/.test(ua);
        if (isOpenedInApp === true) {
            router.replace("/alert")
        }
    },
    watch: {
        //watch $vuetify.theme.dark to save darkmode setting
        '$vuetify.theme.dark': function (setting) {
            localStorage.setItem("tsukuyomi-theme-dark", setting);
        }
    }

});