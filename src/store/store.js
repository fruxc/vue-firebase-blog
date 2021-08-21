import {
    createStore
} from "vuex";
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const initialState = () => {
    return {
        user: null,
        error: null
    };
};

export default createStore({
    state: initialState(),
    mutations: mutations,
    actions: actions,
    getters: getters,
});