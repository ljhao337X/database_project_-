<template>
  <div class="main-container">
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageBody"
}
</script>

<style scoped>
.main-container{
  margin-top: 67px;
  display: flex;
  justify-content: center;
  background: url(../assets/backgroud.jpg) repeat-y;
}
.main-content{
  width: 1000px;
  background:rgba(233, 233, 235, 0.9);
  min-height: 90vh;
}
</style>