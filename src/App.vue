<template>
  <div id="app">
    <div class="test">
      <ProgressBar :total="questions.length"
                   :currentPoint="questionNumber"/>
      <div class="question" v-if="!isEnd">
        <div class="question-top">
          <div class="question-text">
            <span>#{{questionNumber}}</span>
            <span>{{questions[questionIndex].text}}</span>
          </div>
          <Answers ref="answer"
                   :id="questionNumber"
                   :items="questions[questionIndex].answers"
                   @changed="answerChanged"/>
        </div>
        <button :class="['button', 'question-answerButton', this.currentAnswer ? '' : 'question-answerButton-notAnswered']"
                @click="answer">
          Ответить
        </button>
      </div>
      <div v-else class="question question-end">
        <span>Вы набрали {{points}} / {{this.questions.length}}</span>
        <button class="button question-startAgainButton"
                @click="startAgain">
          Начать заново
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Answers from './components/Answers';
import ProgressBar from './components/ProgressBar';
import questions from './questions';
import {getRandom} from './helpers';

export default {
    name: 'app',
    data() {
        return {
            points: 0,
            questionNumber: 1,
            questionIndex: 0,
            currentAnswer: null,
            questions: questions,
            answered: []
        }
    },
    beforeMount() {
        this.questionIndex = getRandom(0, this.questions.length - 1);
    },
    methods: {
        answer() {
            if (this.currentAnswer) {
                this.questionNumber += 1;

                if (+this.currentAnswer === this.questions[this.questionIndex].correctAnswer) {
                    this.points += 1;
                }

                this.answered.push(this.questionIndex);
                let nextIndex;

                do {
                    nextIndex = getRandom(0, this.questions.length - 1);
                } while (this.answered.indexOf(nextIndex) !== -1 && !this.isEnd);

                this.questionIndex = nextIndex;
            }
        },
        startAgain() {
            this.questionNumber = 1;
            this.points = 0;
            this.answered = [];
        },
        answerChanged(value) {
            this.currentAnswer = value;
        }
    },
    computed: {
      isEnd() {
          return this.questions.length + 1 === this.questionNumber;
      }
    },
    components: {
        Answers,
        ProgressBar
    }
}
</script>

<style lang="less">
  html, body {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: Gilroy, Helvetica, Arial, sans-serif;
    background: #edeef0;
  }
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .test {
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 12px;
  }
  .button {
    height: 38px;
    border-radius: 20px;
    background-color: #dddddd;
    border: unset;
    cursor: pointer;
    font-size: 18px;
    color: white;
    &:hover {
      background-color: #cbc9c9;
    }
    &:focus {
      outline: unset;
    }
  }
  .question {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 286px;
    margin-top: 8px;
    padding: 26px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
    &-end {
      align-items: center;
      justify-content: center;
    }
    &-text {
      font-size: 28px;
      padding: 12px 0 24px;
      overflow-wrap: break-word;
      border-bottom: 1px solid #e7e8ec;
    }
    &-answerButton {
      width: 130px;
      align-self: flex-end;
      &-notAnswered {
        cursor: not-allowed;
        background-color: #ffdadac7;
        &:hover {
          background-color: #ffdadac7;
        }
      }
    }
    &-startAgainButton {
      width: 200px;
      margin-top: 30px;
    }
  }
</style>
