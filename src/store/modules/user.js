const store = {
  state: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    shop: {
      shopId: "",
      name: "",
      address: "",
      description: "",

    },
    userType: localStorage.getItem("userType") ?? null,
    token: localStorage.getItem("token") ?? "",
  },
  actions: {
    setUser: ({ commit }, user) => {
      localStorage.setItem("token", user.token);
      localStorage.setItem("userType", user.userType);
      commit("setUser", user);
    },
    signOut: ({ commit }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      commit("signOut");
    },
  },
  mutations: {
    setUser: (state, user) => {
      const { userId, firstName, lastName, email, token, userType } = user;
      state.userId = userId ?? state.userId;
      state.firstName = firstName ?? state.firstName;
      state.lastName = lastName ?? state.lastName;
      state.email = email ?? state.email;
      state.token = token ?? state.token;
      state.userType = userType ?? state.userType;
    },
  },
  getters: {
    getToken: (state) => state.token,
  },
};

export default store;
