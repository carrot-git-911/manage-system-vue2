<template>
  <div class="sidebar-menu-item">
    <el-submenu v-if="hasChildren" :index="item.path">
      <template slot="title">
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarMenuItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-submenu>
    <el-menu-item v-else :index="item.path">
      {{ item.meta.title }}
    </el-menu-item>
  </div>
</template>

<script>
import SidebarMenuItem from './SidebarMenuItem.vue'

export default {
  name: 'SidebarMenuItem',
  components: { SidebarMenuItem },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasChildren() {
      return Array.isArray(this.item.children) && this.item.children.length > 0
    }
  }
}
</script>
