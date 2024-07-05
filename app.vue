<script setup lang="ts">
import Layout from '@/components/Layout/Layout.vue'

const { public: env } = useRuntimeConfig()
</script>

<template>
  <Head>
    <Title>{{ env.TITLE }}</Title>
    <Meta name="description" :content="env.DESCRIPTION" />
  </Head>
  <div class="w-full flex flex-col items-center bg-[#fdf9f3] pb-safe">
    <Layout />
  </div>
</template>
