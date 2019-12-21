<template>
  <div class="progressBar">
    <div class="progressBar-item"
         v-for="i in total">
      <div :class="['progressBar-item-content', i <= currentPoint ? 'progressBar-item-answered' : '']"></div>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            currentPoint: {
                type: Number,
                default: 0
            },
            total: {
                type: Number,
                default: 100
            }
        },
        data () {
            return {
            }
        }
    }
</script>

<style lang="less">
  .progressBar {
    display: flex;
    padding: 2px 4px;
    &-item {
      margin-right: 6px;
      &-content {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #dddddd;
        box-shadow: inset 2px 2px 2px 2px rgba(0, 0, 0, 0.12);
      }
      &-answered {
        background: #2d35ff9e;
      }
    }
  }
</style>
