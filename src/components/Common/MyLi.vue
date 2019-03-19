<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
    export default {
        name: "MyLi"
    };
</script>

<style scoped>
  li{
    padding-top:5px;
    height:80px;
    float: left;
    width:33.3%;
    text-align: center;
  }
</style>
