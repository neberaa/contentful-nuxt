<template>
  <section class="container">
      <section class="main-screen">
          <transition-group name="fade500">
              <img class="background" key="main-image" :src="mainScreen.background.fields.file.url" :alt="mainScreen.title" v-show="loaded" @load="loaded = !loaded">
              <div class="main-content" key="main-content" v-show="loaded">
                  <h1 class="title">{{mainScreen.title}}</h1>
                  <div class="subtitle" v-html="decodeData(mainScreen.subtitle)"/>
                  <a href="#products" class="button" type="button">{{mainScreen.buttonText}}</a>
              </div>
          </transition-group>
          <loader v-show="!loaded"></loader>
      </section>
      <products :products="products"></products>
      <feedback :feeds="feedback"></feedback>
  </section>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import Loader from '~/components/Loader';
import Products from '~/components/Products';
import Feedback from '~/components/Feedback';
import decodeData from "~/mixins/decodeData";

const client = createClient();
export default {
  components: {
    Loader,
    Products,
    Feedback
  },
  mixins: [decodeData],
  data() {
    return {
      loaded: false,
      wishList: [],
      isLike: false
    };
  },
  asyncData() {
    return Promise.all([
      client.getEntries()
    ])
    .then(([entries]) => {
      return {
        data: entries.items
      }
    })
    .catch(console.error);
  },
  computed: {
    products() {
      if (this.data) {
        return this.data.filter(d => d.sys.contentType.sys.id === 'product');
      }
    },
    feedback() {
      if (this.data) {
        return this.data.filter(d => d.sys.contentType.sys.id === 'feedback');
      }
    },
    mainScreen() {
      if (this.data) {
        return this.data.filter(d => d.sys.contentType.sys.id === 'mainScreen')[0].fields;
      }
    },
  },
  methods: {
    loadWishList() {
      if (localStorage.getItem('wishlist')) {
        // try {
        //   this.$store.commit('wishlist/toJSON', localStorage.getItem('wishlist'));
        // } catch(e) {
        //   localStorage.removeItem('wishlist');
        // }
      }
    }
  },
  mounted() {
    this.loadWishList();
  },
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
    flex-direction: column;
}

.links {
  padding-top: 15px;
}

.main-screen {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    .background {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        object-fit: cover;
    }
    .main-content {
        @include center();
        .title {
            font-size: 50px;
            font-family: $mont-bold;
            color: $white;
        }
        .subtitle p {
            font-family: $mont-light;
            color: $white;
        }
    }
}
    .products-container {
        .like {
            color: orangered;
            &.active {
                color: green;
            }
        }
    }
</style>
