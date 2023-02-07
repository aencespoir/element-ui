<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  props: {},
  components: {},
  methods: {}
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
