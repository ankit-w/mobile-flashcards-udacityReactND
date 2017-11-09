import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Quiz extends React.Component {

  state = { questionIndex: 0, correctAnswers: 0, flipCard: false };

  onCorrect = () => {
    const { questionIndex, correctAnswers } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
      correctAnswers: correctAnswers + 1,
      flipCard: false
    });
  };

  startQuiz = () => {
    this.setState({
      questionIndex: 0,
      correctAnswers: 0,
      flipCard: false
    });
  };

  closeQuiz = () => {
    this.props.navigation.goBack();
  }

  onIncorrect = () => {
    this.setState({
      questionIndex: this.state.questionIndex + 1
    });
  };

  showAnswer = () => {
    this.setState({
      flipCard: !this.state.flipCard
    });
  };

  render() {
    const { questionIndex, correctAnswers, flipCard } = this.state;
    const { questions } = this.props.navigation.state.params;
    const isQuizFinished = questionIndex < questions.length;
    const questionsRemaining = questions.length - questionIndex;

    return (
      <View style={{ flex: 1, margin: 16 }}>
        { isQuizFinished ? (
          <View style={ styles.container }>
            <View style={ [styles.group, { justifyContent: 'flex-start', flex: 1 }] }>
              <View>
                <Text>{ questionsRemaining} / {questions.length }</Text>
              </View>
            </View>
            <View style={ [styles.group, { flex: 4 }] }>
              <View>
                { flipCard ? (
                  <View style={styles.item}>
                    <Text style={{ fontSize: 22, textAlign: 'center' }}>{questions[questionIndex].answer }</Text>
                    <TouchableOpacity onPress={ this.showAnswer } style={styles.question}>
                        <Text style={styles.btnText}>Question</Text>
                    </TouchableOpacity>
                  </View>) : (
                  <View style={styles.item}>
                      <Text style={{ fontSize: 24, textAlign: 'center' }}>{questions[questionIndex].question}</Text>
                      <TouchableOpacity onPress={ this.showAnswer } style={styles.answer}>
                          <Text style={styles.btnText}>Answer</Text>
                      </TouchableOpacity>

                  </View>
                )}
              </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'space-around', flex: 2 }}>
              <View style={ styles.container } >
                <TouchableOpacity onPress={ this.onCorrect }>
                  <Text style={ styles.correct }>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ this.onIncorrect }>
                  <Text style={ styles.incorrect }>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={ styles.container }>
            <Text style={{ textAlign: 'center', fontSize: 22 }}>Score: { correctAnswers }</Text>
            <View style={{ alignItems: 'center', justifyContent: 'space-around', flex: 2 }}>
              <View style={ styles.container }>
                <TouchableOpacity onPress={ this.startQuiz }>
                  <Text style={ styles.startQuiz  }>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ this.closeQuiz }>
                  <Text style={ styles.back }>Back to Deck</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  question: {
    backgroundColor: '#00ddff',
    borderWidth: 1,
    borderColor: '#00ddff',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  answer: {
    backgroundColor: '#6600ee',
    borderWidth: 1,
    borderColor: '#6600ee',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  correct: {
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 4,
    marginTop: 16,
    padding: 8,
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  },
  incorrect: {
    backgroundColor: '#dc3545',
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 4,
    marginTop: 16,
    padding: 8,
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6600ee',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  back: {
    backgroundColor: '#00ddff',
    borderWidth: 1,
    borderColor: '#00ddff',
    borderRadius: 4,
    marginTop: 16,
    padding: 8,
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  },
  startQuiz: {
    backgroundColor: '#6600ee',
    borderWidth: 1,
    borderColor: '#6600ee',
    borderRadius: 4,
    marginTop: 16,
    padding: 8,
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  }
});
