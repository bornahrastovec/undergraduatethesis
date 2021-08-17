<template>
  <q-layout view="lHh Lpr lff">
    <q-header dark class="bg-teal">
      <q-toolbar>
        <q-avatar>
          <img src="https://www.vhv.rs/dpng/d/312-3121044_sigmund-freud-coloring-page-line-art-hd-png.png" />
        </q-avatar>
        <q-toolbar-title>
          Freud
        </q-toolbar-title>
        <q-space />
        <q-btn flat to="/blog/">Blog</q-btn>
        <q-btn flat to="/member-area/">Dio za članove</q-btn>
        <!-- <q-btn flat to="/resources">Resursi</q-btn>
        <q-btn flat to="/about">O projektu</q-btn> -->
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
</script>
