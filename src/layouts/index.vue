<template>
  <div class="app-layout">
    <AppSidebar />
    <div class="app-layout__main">
      <AppHeader />
      <AppMain />
    </div>
  </div>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'

export default {
  name: 'AppLayout',
  components: {
    AppSidebar,
    AppHeader,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.app-layout__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}
</style>
