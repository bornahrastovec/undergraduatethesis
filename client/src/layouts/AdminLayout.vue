<template>
  <q-layout view="hHh lpR fFf">
    
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn v-if="isAuthenticated" :label="$t('logout')" @click="logoutUser"></q-btn>
      </q-toolbar>

    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    computed: mapGetters('Auth', ['isLoggedIn']),
    data:() => ({
        username: '',
        password: '',
        isAuthenticated: false,
    }),
    methods: {
        ...mapActions('Auth', ['logout']),
        logoutUser() {
            this.logout().then(() => {
              this.$router.push("/login/");
            });
        }
    },
    created() {
        this.isAuthenticated = this.isLoggedIn;
    }
}
    
</script>
