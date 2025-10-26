<script setup>
import Nav from './components/Nav.vue';
import Search from './components/Search.vue';
import Taxpayer from './components/Taxpayer.vue';
import PWAInstall from './components/PWAInstall.vue'
</script>

<template>
  <Nav />
  <div class="container">
    <Search />
    <Taxpayer />
  </div>
  <PWAInstall />
</template>
