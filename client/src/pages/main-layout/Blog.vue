<template>
  <q-page class="blog">
    <div class="q-pa-md">
      <div class="row">
        <div class="text-h4 text-center q-pa-md">
          Izvor: http://mentalno-zdravlje.hr
        </div>
      </div>
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <div
          v-for="article in articles"
          :key="article"
          class="col-lg-6 col-xs-12 col-md-12 col-sm-12"
        >
          <q-card class="my-card">
            <q-parallax :src="article.imgUrl" :height="150" />

            <q-card-section>
              <div class="text-h6">{{ article.title }}</div>
              <div class="text-subtitle2">{{ article.date }}</div>
            </q-card-section>
            <q-separator dark />
            <q-card-actions>
              <q-btn color="primary" :to="'/blog/' + article.id"
                >Cijeli članak</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import articles from "../../assets/articles.json";

export default {
  data() {
    return {
      articles: articles,
    };
  },
};
</script>
<style lang="scss" scoped>
.q-card {
  max-width: 100% !important;
}
</style>