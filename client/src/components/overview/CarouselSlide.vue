<template>
  <div class="q-pa-md">
    <div v-if="moods == null || moods.length == 0 || moods.length == undefined">
      <div class="text-h6 text-blue text-bold">
        Nema dovoljno unesenih raspoloženja za uvid, unesi par raspoloženja...
      </div>
    </div>
    <div v-if="moods.length > 0">
      <div class="row">
        <div v-for="(mood, index) in moods" :key="mood._id">
          <div class="col-lg-6 col-sm-12 col-xs-12">
            <q-card class="q-ma-sm">
              <img :src="'https://picsum.photos/200/150?random=' + index" />
              <q-card-section>
                <div class="text-h5 text-bold q-ma-md">
                  <span v-if="mood.mood == 5">Super 🥳</span>
                  <span v-if="mood.mood == 4">Vrlo dobro 😃</span>
                  <span v-if="mood.mood == 3">Neutralno😐</span>
                  <span v-if="mood.mood == 2">Loše 😔</span>
                  <span v-if="mood.mood == 1">Jako loše😫</span>
                </div>
                <div class="text-h6 text-black q-ma-md">
                  {{ filterDate(mood.date) }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoodService from "../../services/MoodService";

import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "CarouselSlide",
  computed: {
    ...mapGetters("Auth", ["user"]),
  },

  data() {
    return {
      slide: 1,
      moods: [],
    };
  },
  methods: {
    ...mapActions("Auth", ["getProfile"]),
    filterDate(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY HH:mm");
      }
      return null;
    },
  },

  async created() {
    await this.getProfile();
    await MoodService.GetAllMoods(this.user._id).then((res) => {
      this.moods = res;
    });
    console.log(this.moods);
  },
  async updated() {},
};
</script>