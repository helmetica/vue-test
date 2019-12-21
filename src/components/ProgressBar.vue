<template>
  <div class="progressBar">
    <div class="progressBar-item"
         v-for="i in total">
      <div :class="['progressBar-item-content', i <= currentPoint ? 'progressBar-item-content-marked' : '']"></div>
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
    height: 18px;
    &-item {
      flex-grow: 1;
      padding: 2px;
      &-content {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: #dddddd;
        &-marked {
          background: #2d35ff7d;
        }
      }
    }
  }
</style>
