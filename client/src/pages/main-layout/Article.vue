<template>
  <q-page>
    <div class="q-pa-md">
      <q-img :src="imgUrl">
        <div class="absolute-full text-subtitle2 flex flex-center">{{title}}</div>
      </q-img>
      <span v-html="text" class="text-body2"></span>
    </div>
  </q-page>
</template>

<script>
import articles from "../../assets/articles.json";

export default {
  data() {
    return {
      id: this.$route.params.id,
      title: articles[this.$route.params.id].title,
      date: articles[this.$route.params.id].date,
      text: articles[this.$route.params.id].text,
      imgUrl: articles[this.$route.params.id].imgUrl
    };
  },
};
</script>
<style lang="scss" scoped>
  .aligncenter {
    text-align: center;
  }
  img {
    text-align: center;
    width: 300px;
    height: 300px;
  }
</style>