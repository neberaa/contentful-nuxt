<template>
    <div class="feedback-container" v-if="feeds && feeds.length > 0">
        <div class="feedback" v-for="(item, i) in feeds" :key="`feedback-${i}`">
            <img :src="item.fields.avatar.fields.file.url" :alt="item.fields.avatar.fields.title">
            <h3>{{item.fields.name}}</h3>
            <div v-html="decodeData(item.fields.text)"/>
        </div>
    </div>
</template>

<script>
  import decodeData from "~/mixins/decodeData";

  export default {
    name: "feedback",
    mixins: [decodeData],
    props: {
      feeds: {
        type: Array,
        required: true,
        default: []
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
