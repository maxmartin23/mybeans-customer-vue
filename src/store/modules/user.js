const store = {
  state: {
    userId: localStorage.getItem("userId") ?? null,
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
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("userType", user.userType);
      commit("setUser", user);
    },
    setShop: ({ commit }, shop) => {
      localStorage.setItem("shop", JSON.stringify(shop));
      commit("setShop", shop);
    },
    signOut: ({ commit }) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
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
    signOut(state) {
      state.userId = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.token = "";
      state.userType = null;
    },
  },
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => ({
      userId: state.userId,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      userType: state.userType ? parseInt(state.userType) : null,
    }),
    getShop: (state) => ({
      shopId: state.shop.shopId,
      name: state.shop.name,
      address: state.shop.address,
      description: state.shop.description,
    }),
  },
};

export default store;
