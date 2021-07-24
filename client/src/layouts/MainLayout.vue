<template>
  <q-layout view="lHh Lpr lff">
    <q-header dark class="bg-teal">
      <q-toolbar>
        <q-avatar>
          <img src="icons/favicon-32x32.png" />
        </q-avatar>
        <q-toolbar-title>
          Freud
        </q-toolbar-title>
        <q-space />
        <q-btn flat to="/blog">Blog</q-btn>
        <q-btn flat to="/member-area">Dio za članove</q-btn>
        <q-btn flat to="/resources">Resursi</q-btn>
        <q-btn flat to="/project">O projektu</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
</script>
