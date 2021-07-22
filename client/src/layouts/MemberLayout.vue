<template>
  <q-layout view="hHh lpR fFf">
    
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
          </q-avatar>
          Freud
        </q-toolbar-title>
        <q-btn v-if="isAuthenticated" :label="$t('logout')" @click="logoutUser"></q-btn>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="overview" label="Pregled" />
        <q-route-tab to="diary" label="Dnevnik" />
        <q-route-tab to="goals" label="Ciljevi" />
        <q-route-tab to="mood" label="Raspoloženje" />
        <q-route-tab to="profile" label="Profil" />
      </q-tabs>
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
            this.logout();
        }
    },
    created() {
        this.isAuthenticated = this.isLoggedIn;
    }
    
}
</script>