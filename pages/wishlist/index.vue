<template>
    <div class="wishlist-container">
        <div class="products">
            <div class="product" v-for="(product, i) in filteredProducts" :key="`product${i}`">
                <h1>{{product.fields.title}}</h1>
                <p>{{product.fields.description}}</p>
                <div class="images" v-for="image in product.fields.images">
                    <img :src="`${image.fields.file.url}??w=300&h=300&fit=fill`" alt="">
                </div>
                <span @click="removeFromList(product.sys.id)">Remove from List</span>
                <span class="price">${{product.fields.price}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "wish-list",
    computed: {
      wishList() {
        return this.$store.getters['wishlist/allWishlistItems'];
      },
      products() {
        return this.$store.getters['data/allProducts'];
      },
      filteredProducts() {
        if (this.products) {
          return this.products.filter(item => this.wishList.includes(item.sys.id));
        }
      }
    },
    methods: {
      removeFromList(id) {
        this.$store.commit('wishlist/remove', id);
        const parsed = this.$store.getters['wishlist/toJSON'];
        localStorage.setItem('wishlist', parsed);
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
