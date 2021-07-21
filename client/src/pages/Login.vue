<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-black q-my-md">Prijava</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-2">
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
                    <q-btn label="Prijava" type="submit" color="primary" @click.prevent="loginUser" />
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

import {mapActions} from 'vuex';

export default {
    data:() => ({
      username: '',
      password: '',
      isPwd: true,
    }),
    methods: {
      ...mapActions('Auth', ['login']),
      loginUser() {
        if (this.username == "" || this.password == "") {
          
        }
        let user = {
          username: this.username,
          password: this.password
        };
        this.$q.loading.show();
        this.login(user)
        .then(res => {
          if(res.data.success){
            this.$router.push('/member-area');
            this.$q.loading.hide();
          }
        }).catch(() => {
            this.$q.loading.hide();
          this.$q.notify({
            type: "positive",
            message: "Successfully logged in!",
          });
          this.hasError = true;
        });
      }
    }
}
</script>