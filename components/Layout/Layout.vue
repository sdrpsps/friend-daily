<script setup lang="ts">
import Header from './Header.vue'
</script>

<template>
  <div class="min-h-screen w-full bg-white md:w-xl">
    <Header />
    <section class="px-5 pt-12">
      <NuxtPage />
    </section>
  </div>
</template>

<style>
@font-face {
  font-family: HarmonyOS_Sans_SC_Regular;
  font-style: normal;
  font-display: swap;
  src: url('https://static.bytespark.me/HarmonyOS_Sans_SC_Regular.woff2') format('woff2');
}

* {
  font-family: HarmonyOS_Sans_SC_Regular, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
</style>
