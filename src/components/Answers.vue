<template>
  <div class="answers">
    <div class="answers-item"
         v-for="item in items"
         :key="item.id">
      <label class="answers-item-label">
        <input v-model="answer"
               class="answers-item-radio-hidden"
               name="quest"
               type="radio"
               :value="item.id"
               @change="changed">
        <span class="answers-item-radio"></span>
        {{item.value}}
      </label>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String
            },
            items: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                answer: ''
            }
        },
        methods: {
            changed() {
                this.$emit('changed', this.answer);
            }
        },
        beforeUpdate() {
            console.log(this.answer);
            this.answer = '';
            console.log(this.answer);
        }
    }
</script>

<style lang="less" scoped>
  .answers {
    padding: 12px 0;
  }
  .answers-item {
    padding: 14px 0;

    &-label, &-radio {
      cursor: pointer;
    }
  }
  .answers-item-label {
    display: flex;

    input:checked + .answers-item-radio:before {
      content: '';
      display: block;
      position: absolute;
      left: 4px;
      top: 4px;
      height: 8px;
      width: 8px;
      border: 1px solid #3988c9;
      border-radius: 50%;
      background: #3988c9;
    }
  }
  .answers-item-radio {
    position: relative;
    margin-right: 8px;

    &-hidden {
      display: none;
    }

    &:after {
      content: '';
      display: block;
      height: 14px;
      width: 14px;
      border: 2px solid #3988c9;
      border-radius: 50%;
    }
  }
</style>
