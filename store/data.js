import {createClient} from '~/plugins/contentful.js';

export const state = () => ({
  list: []
});

export const mutations = {
  FETCH_DATA(state, data) {
    state.list = data;
  }
};

export const actions = {
  fetchData({ commit })  {
    const client = createClient();
    return Promise.all([
      client.getEntries()
    ])
      .then(([entries]) => {
        commit("FETCH_DATA", entries.items);
      })
      .catch((error => {
        console.log(error.statusText)
      }))
  }
};

export const getters = {
  allProducts(state) {
    if (state.list.length > 0) {
      return state.list.filter(i => i.sys.contentType.sys.id === 'product');
    }
  },
  allFeeds(state) {
    if (state.list.length > 0) {
      return state.list.filter(i => i.sys.contentType.sys.id === 'feedback');
    }
  },
  mainScreenContent(state) {
    if (state.list.length > 0) {
      return state.list.filter(i => i.sys.contentType.sys.id === 'mainScreen')[0].fields;
    }
  },
};
