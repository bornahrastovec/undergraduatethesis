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
          <h1>Registracija</h1>
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
                    label="Korisničko ime"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Molimo unesite nešto',
                    ]"
                  />
                  <q-input
                    type="email"
                    rounded
                    flled
                    v-model="email"
                    label="Email"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Molimo unesite nešto',
                    ]"
                  />
                  <q-input
                    type="text"
                    rounded
                    flled
                    v-model="name"
                    label="Ime"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Molimo unesite nešto',
                    ]"
                  />
                  <q-input
                    type="text"
                    rounded
                    flled
                    v-model="surname"
                    label="Prezime"
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
                  <q-input
                    v-model="passwordRepeat"
                    rounded
                    filled
                    lazy-rules
                    label="Ponovite lozinku"
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
                      label="Registracija"
                      type="submit"
                      color="primary"
                      @click.prevent="registerUser"
                    />
                    <q-btn
                      label="Prijava"
                      color="primary"
                      flat
                      class="q-ml-sm"
                      to="/login"
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
    ...mapGetters("Auth", ["isLoggedIn"]),
  },
  data: () => ({
    username: "",
    password: "",
    name: "",
    surname: "",
    passwordRepeat: "",
    email: "",
    isPwd: true,
  }),
  methods: {
    ...mapActions("Auth", ["login"]),
    ...mapActions("Auth", ["register"]),
    registerUser() {
      if (
        (this.username == "" || this.password == "" || this.name == "",
        this.surname == "",
        (this.name = ""),
        (this.passwordRepeat = ""),
        (this.email = ""))
      ) {
        this.$q.notify({
          type: "negative",
          message: "Molimo ispunite sva polja",
        });
      }

      if (this.password === this.passwordRepeat) {
        let user = {
          username: this.username,
          password: this.password,
          name: this.name,
          surname: this.surname,
          email: this.email,
          passwordRepeat: this.passwordRepeat
        };
        this.$q.loading.show();
        this.register(user)
          .then((res) => {
            if (res.data.success) {
              this.$router.push("/login/");
              this.$q.loading.hide();
              this.$q.notify({
                type: "positive",
                message: "Uspješna registracija!",
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
      }
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