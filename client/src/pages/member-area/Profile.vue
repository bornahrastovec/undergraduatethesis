<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="avatar">
      <q-avatar size="10vh" color="teal" text-color="white" icon="directions" />
    </div>
    <div class="info" style="display: block; text-align: center">
      <h1>{{ name + " " + surname }}</h1>
      <h2>{{ username }}</h2>
      <h3>{{ email }}</h3>
      <h4>{{ date }}</h4>
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