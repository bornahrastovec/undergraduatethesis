<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div
          class="
            col-lg-6
            bg-teal
            window-height
            justify-center
            items-center
            left-pane
          "
        >
          <h1>Prijava</h1>
        </div>
        <div class="col-lg-6 text-center">
          <div class="form-container flex justify-center">
            <q-card bordered class="bg-white my-card">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    rounded
                    flled
                    v-model="username"
                    label="Korisničko ime ili Email"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Molimo unesite nešto',
                    ]"
                  />

                  <q-input
                    v-model="password"
                    rounded
                    filled
                    lazy-rules
                    label="Lozinka"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Molimo unesite lozinku',
                      (val) =>
                        (val && val.length >= 8) ||
                        'Lozinka mora biti najmanje 8 znakova duga',
                    ]"
                    :type="isPwd ? 'password' : 'text'"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>

                  <div>
                    <q-btn
                      label="Prijava"
                      type="submit"
                      color="primary"
                      @click.prevent="loginUser"
                    />
                    <q-btn
                      label="Registracija"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("Auth", ["isLoggedIn"])
  },
  data: () => ({
    username: "",
    password: "",
    isPwd: true,
  }),
  methods: {
    ...mapActions("Auth", ["login"]),
    loginUser() {
      if (this.username == "" || this.password == "") {
      }
      let user = {
        username: this.username,
        password: this.password,
      };
      this.$q.loading.show();
      this.login(user)
        .then((res) => {
          if (res.data.success && this.isLoggedIn) {
            this.$router.push("/member-area/");
            this.$q.loading.hide();
            this.$q.notify({
              type: "positive",
              message: "Uspješna prijava!",
            });
          }
        })
        .catch(() => {
          this.$q.loading.hide();
          this.$q.notify({
            type: "negative",
            message: "Nešto je pošlo po zlu, provjerite svoj unos!",
          });
          this.hasError = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .q-card {
    max-width: 100%;
    width: 25vw;
  }
  @media (max-width: $breakpoint-sm) {
    .q-card {
      max-width: 100%;
    }
    .form-container {
      max-width: 100vw;
    }
  }

</style>