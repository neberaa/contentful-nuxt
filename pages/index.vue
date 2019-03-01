<template>
  <section class="container">
      <header class="header"></header>
      <section class="main-screen" :style="{'background-image': `url(${mainScreen.background.fields.file.url})`}">
          <div class="main-content">
              <h1 class="title">{{mainScreen.title}}</h1>
              <div class="subtitle" v-html="decodeData(mainScreen.subtitle)"/>
              <a href="#products" class="button" type="button">{{mainScreen.buttonText}}</a>
          </div>

      </section>
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
         <span class="price">${{product.fields.price}}</span>
     </div>
       <div class="feedback-container" v-if="feedback && feedback.length > 0">
           <div class="feedback" v-for="(item, i) in feedback" :key="`feedback-${i}`">
               <img :src="item.fields.avatar.fields.file.url" :alt="item.fields.avatar.fields.title">
               <h3>{{item.fields.name}}</h3>
               <div v-html="decodeData(item.fields.text)"/>
           </div>
       </div>
   </div>
  </section>
</template>

<script>
import {createClient} from '~/plugins/contentful.js';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const client = createClient();
export default {
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
    }
  },
  methods: {
    decodeData(data) {
      return documentToHtmlString(data);
    },
  }
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
</style>
