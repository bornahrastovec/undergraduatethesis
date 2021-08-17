<template>
  <q-page class="bg-grey-3">
    <div class="row flex align-center q-pa-md q-gutter-sm">
      <div
        class="
          rounded-borders
          col-lg-4
          flex
          justify-center
          col-sm-12 col-xs-12
          text-black
          bg-white
        "
      >
        <div class="main-info text-center q-pa-md">
          <div class="avatar flex">
            <q-avatar size="100px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </div>
          <div class="text-h3 text-bold q-pa-md">
            {{ name + " " + surname }}
          </div>
          <div class="text-h5 q-pa-sm">Novi član 🥰</div>
          <div class="text-h6 q-pa-sm">Varaždin, Croatia</div>
        </div>
      </div>
      <div class="col-lg-8 col-sm-12 col-xs-12 text-black bg-white">
        <div class="info q-pa-md">
          <div class="text-h6 q-pa-md">Datum registracije: {{ date }}</div>
          <div class="text-h6 q-pa-md">E-Mail adresa: {{ email }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    username: "",
    email: "",
    date: "",
    name: "",
    surname: "",
    user: null,
  }),
  methods: {
    ...mapActions("Auth", ["getProfile"]),
  },
  async created() {
    await this.getProfile().then((res) => {
      this.username = res.data.user.username;
      this.email = res.data.user.email;
      this.date = res.data.user.date;
      this.name = res.data.user.name;
      this.surname = res.data.user.surname;
    });
  },
  async updated() {},
};
</script>

<style>
</style>