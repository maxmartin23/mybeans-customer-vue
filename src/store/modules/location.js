const store = {
  state: {
    latitude: null,
    longitude: null,
    address: null,
  },
  mutations: {
    setLatLng(state, payload) {
      state.latitude = payload.latitude;
      state.longitude = payload.longitude;
    },
    setAddress(state, payload) {
      state.address = payload;
    },
  },
  getters:{
    getLocation(state){
      if (state.latitude && state.longitude) {
        return {
          latitude: state.latitude,
          longitude: state.longitude,
        };
      }
      return null
    }
  }
};
export default store;
