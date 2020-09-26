import InstaVue from "InstaVue";

export default {
    install(Vue, options) {
        Vue.component(InstaVue.name, InstaVue);
    }
};
