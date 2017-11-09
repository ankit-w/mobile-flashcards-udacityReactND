import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class Deck extends React.Component {
  render() {
    let { title } = this.props.navigation.state.params;
    const questions = this.props.decks[title] && this.props.decks[title].questions;

    return (
      <View style={ styles.container }>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 36 }}>{title}</Text>
          <Text style={{ fontSize: 22, marginTop: 12 }}>{questions.length} cards</Text>
        </View>
        <TouchableOpacity style={ styles.addCard } onPress={ () => {
            this.props.navigation.navigate('AddQuestion', {
              title,
              questions,
            });
          }}>
          <Text style={ styles.title }>ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.startQuiz } onPress={ () => {
            this.props.navigation.navigate('Quiz', {
              title,
              questions,
            });
          }}>
          <Text style={ styles.title }>START QUIZ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  addCard: {
    backgroundColor: '#00ddff',
    borderWidth: 1,
    borderColor: '#00ddff',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  startQuiz: {
    backgroundColor: '#6600ee',
    borderWidth: 1,
    borderColor: '#6600ee',
    borderRadius: 4,
    marginTop: 16,
    padding: 8
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }
});

function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps)(Deck);
