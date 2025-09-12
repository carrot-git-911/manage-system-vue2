<template>
  <div class="dashboard-container">
    <component :is="currentComponent" />
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      currentComponent: "AdminDashboard",
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  
}
</style>
