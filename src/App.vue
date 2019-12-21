<template>
  <div id="app">
    <div class="test">
      <ProgressBar :total="questions.length"
                   :currentPoint="currentQuestion + 1"/>
      <div class="question" v-if="!isEnd">
        <div class="question-top">
          <div class="question-text">
            <span>#{{questions[currentQuestion].id + 1}}</span>
            {{questions[currentQuestion].text}}
          </div>
          <Answers ref="answer"
                   :id="currentQuestion"
                   :items="questions[currentQuestion].answers"
                   @changed="answerChanged"/>
        </div>
        <button :class="['button', 'question-answerButton', haveAnswer ? '' : 'question-answerButton-notAnswered']"
                @click="answer">
          Ответить
        </button>
      </div>
      <div v-else class="question">
        Вы набрали {{points}}
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

export default {
    name: 'app',
    data() {
        return {
            points: 0,
            currentQuestion: 0,
            currentAnswer: null,
            questions: questions,
            isEnd: false
        }
    },
    methods: {
        answer() {
            if (this.currentAnswer === this.questions[this.currentQuestion].correctAnswer) {
                this.points += 1;
            }
            if (this.haveAnswer) {
                let nextQuestion = this.currentQuestion + 1;
                if (nextQuestion < this.questions.length) {
                    this.currentQuestion = nextQuestion;
                } else {
                    this.isEnd = true;
                }
            }
        },
        startAgain() {
            this.currentQuestion = 0;
            this.points = 0;
            this.isEnd = false;
        },
        answerChanged(value) {
            this.currentAnswer = value;
        }
    },
    computed: {
        haveAnswer() {
            return !!this.currentAnswer;
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
    height: 286px;
    border-radius: 4px;
    margin-top: 8px;
    padding: 26px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8;
    &-text {
      height: 40px;
      font-size: 28px;
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
      align-self: center;
    }
  }
</style>
