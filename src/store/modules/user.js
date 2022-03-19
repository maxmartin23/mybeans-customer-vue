const store = {
  state: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    token: localStorage.getItem("token") ?? "",
  },
  actions: {
    setUser: ({ commit }, user) => {
      localStorage.setItem("token", user.token);
      commit("setUser", user);
    },
    signOut: ({ commit }) => {
      localStorage.removeItem("token");
      commit("signOut");
    }
  },
  mutations: {
    setUser: (state, user) => {
      const { userId, firstName, lastName, email, token } = user;
      state.userId = userId ?? state.userId;
      state.firstName = firstName ?? state.firstName;
      state.lastName = lastName ?? state.lastName;
      state.email = email ?? state.email;
      state.token = token ?? state.token;
    },
  },
  getters:{
    getToken : state => state.token
  }
};

export default store