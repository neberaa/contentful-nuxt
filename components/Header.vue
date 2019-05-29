<template>
  <header>
      <div class="header-content">
          <ul>
              <li v-for="(item, i) in menuItems">
                  <nuxt-link :key="`link${i}`" :to="item.link">{{item.label}}</nuxt-link>
              </li>
          </ul>
      </div>
  </header>
</template>

<script>
    export default {
      name: "header",
      data() {
        return {
          menuItems: [
            {label: 'Home', link: '/'},
            {label: 'Wishlist', link: '/wishlist'},
          ]
        }
      },
    }
</script>

<style lang="scss" scoped>
  header {
    .header-content {

    }
  }
</style>
