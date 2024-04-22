<script setup>

import ManagerDesktopComp from '@/components/ManagerDesktopComp.vue'
import { inject } from 'vue'

const DrawerOpen = inject('DrawerOpen')
DrawerOpen.value = false
</script>

<template>
  <ManagerDesktopComp/>
</template>

<style scoped>

</style>