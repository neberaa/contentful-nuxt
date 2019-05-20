export const state = () => ({
  list: []
});

export const mutations = {
  add (state, id) {
    state.list.push(id)
  },
  remove (state, id) {
    state.list.splice(state.list.indexOf(id), 1)
  },
  loadJSON(state) {
    const json = localStorage.getItem('wishlist');
    if (json) {
      state.list = JSON.parse(json);
    }
  }
};

export const getters = {
  toJSON(state) {
    return JSON.stringify(state.list);
  },
  isAdded: (state) => (id) => {
    return state.list.includes(id);
  },
  allWishlistItems(state) {
    return state.list;
  }
};
