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
        <span>{{item.value}}</span>
      </label>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                default: 0
            },
            items: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                answer: '',
                startId: null
            }
        },
        methods: {
            changed() {
                this.$emit('changed', this.answer);
            }
        },
        beforeMount() {
            this.startId = this.$props.id;
        },
        beforeUpdate() {
            if (this.startId !== this.$props.id) {
                this.startId = this.$props.id;
                // сбросим выбранный radio для нового вопроса
                this.answer = null;
                this.changed();
            }
        }
    }
</script>

<style lang="less" scoped>
  @pink-color: #d62390;
  @inner-di: 8px;
  @outer-di: 14px;

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
      left: 5px;
      top: 5px;
      height: @inner-di;
      width: @inner-di;
      border-radius: 50%;
      background: @pink-color;
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
      height: @outer-di;
      width: @outer-di;
      border-radius: 50%;
      border: 2px solid @pink-color;
    }
  }
</style>
