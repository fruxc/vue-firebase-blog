import firebase from "firebase/app";

const actions = {
    signUpAction({
        commit
    }, payload) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                response.user.updateProfile({
                    displayName: payload.name
                })
                commit("setUser", response.user);
            })
            .catch(error => {
                commit("setError", error.message);
            });
    },
    async signInAction({
        commit
    }, payload) {
        try {
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password);
            commit("setUser", response.user);
        } catch (error) {
            commit("setError", error.message);
        }
    },
    async signInWithPopUp({
        commit
    }) {
        try {
            const response = await firebase.auth()
                .signInWithPopup(firebase.auth.GoogleAuthProvider());
            commit("setUser", response.user);
        } catch (error) {
            commit("setError", error.message);
        }
    },
    signOutAction({
        commit
    }) {
        firebase
            .auth()
            .signOut()
            .then(() => {
                commit("setUser", null);
            })
            .catch(error => {
                commit("setError", error.message);
            });
    }
};

export default actions;