<template>
  <main class="app-main">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background-color: #f0f2f5;
}
</style>
