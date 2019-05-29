<template>
    <div class="products-container" id="products">
        <div
            v-if="products && products.length > 0"
            class="product"
            v-for="(product, i) in products"
            :key="`product-${i}`">
            <h1>{{product.fields.title}}</h1>
            <p>{{product.fields.description}}</p>
            <div class="images" v-for="image in product.fields.images">
                <img :src="`${image.fields.file.url}??w=300&h=300&fit=fill`" alt="">
            </div>
            <i class="like" :class="{active: updateLike(product.sys.id)}" @click="updateWishList(product.sys.id)">Like/Unlike</i>
            <span class="price">${{product.fields.price}}</span>
        </div>

    </div>
</template>

<script>
  export default {
    name: "products",
    // props: {
    //   products: {
    //     type: Array,
    //     required: true,
    //     default: []
    //   }
    // },
    computed: {
      wishList() {
        return this.$store.getters['wishlist/allWishlistItems'];
      },
      products() {
        return this.$store.getters['data/allProducts'];
      }
    },
    methods: {
      updateWishList(id) {
        if (this.$store.getters['wishlist/isAdded'](id)) {
          this.$store.commit('wishlist/remove', id);
        } else {
          this.$store.commit('wishlist/add', id);
        }
        const parsed = this.$store.getters['wishlist/toJSON'];
        localStorage.setItem('wishlist', parsed);
      },
      updateLike(id) {
        return this.$store.getters['wishlist/isAdded'](id);
      },
    },
    created() {
      this.$store.dispatch("data/fetchData");
    },
    mounted() {
      this.$store.commit('wishlist/loadJSON');
    }
  }
</script>

<style lang="scss" scoped>

</style>
