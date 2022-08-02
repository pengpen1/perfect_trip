<template>
  <div class="search-content">
    <h2>Search content</h2>
    <h2>开始:{{ $route.query.startDate }}</h2>
    <h2>结束:{{ $route.query.endDate }}</h2>
    <h2>城市:{{ $route.query.currentCity }}</h2>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
</style>