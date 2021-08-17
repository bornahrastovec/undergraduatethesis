<template>
  <q-page>
    <div class="q-pa-md">
      <div class="regular-user">
        <h3 class="text-center">Bok, {{ name }} 👋</h3>
        <div class="mood q-ma-md col-lg-12 col-sm-12 col-xs-12">
          <div class="text-h4 text-bold text-black">Tvoje raspoloženje</div>
          <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12">
              <CarouselSlide />
            </div>
          </div>
        </div>
        <div class="goals q-ma-md">
          <div class="text-h4 text-bold text-black">Tvoji ciljevi</div>
          <GoalsSlide />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CarouselSlide from "../../components/overview/CarouselSlide.vue";
import GoalsSlide from "../../components/overview/GoalsSlide.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Overview",
  components: {
    CarouselSlide,
    GoalsSlide,
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
  },
  data: () => ({
    id: "",
    username: "",
    email: "",
    date: "",
    name: "",
    surname: "",
    gender: "",
    role: "",
  }),
  methods: {
    ...mapActions("Auth", ["getProfile"]),
  },
  created() {
    this.user = this.user;
  },
  async created() {
    await this.getProfile().then((res) => {
      this.id = res.data.user._id;
      this.username = res.data.user.username;
      this.email = res.data.user.email;
      this.date = res.data.user.date;
      this.name = res.data.user.name;
      this.surname = res.data.user.surname;
      this.gender = res.data.user.gender;
      this.role = res.data.user.role;
    });
  },
  async updated() {},
};
</script>

<style>
.my-card {
  width: 100% !important;
  max-width: 100%;
  max-height: 50%;
  height: 100%;
}
.q-card {
  max-width: 100% !important;
}
</style>