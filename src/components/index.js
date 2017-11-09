import React from 'react';
import {View, StatusBar} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {StackNavigator, TabNavigator, ActivityIndicator} from 'react-navigation';

import reducer from '../reducers/index.js';
import AddDeck from './deck/AddDeck';
import DeckList from './deck/DeckList';
import Deck from './deck/Deck';
import AddQuestion from './AddQuestion';
import Quiz from './Quiz'
import { Constants } from 'expo'
import {setNotification} from '../util/NotificationModule';


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'All Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  }
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 18,
      
      fontWeight: 'bold'
    },
    indicatorStyle: {
      backgroundColor: '#6600ee',
      height: 4
    },
    style: {
      backgroundColor: '#fff',
    },
    activeTintColor: '#6600ee',
    inactiveTintColor: '#000'
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
      headerStyle: {
        backgroundColor: "#6600ee"
      },
      headerTintColor: '#fff',
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#6600ee"
      },
      headerTintColor: '#fff',
      title: 'Deck',
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerStyle: {
        backgroundColor: "#6600ee"
      },
      headerTintColor: '#fff',
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Question',
      headerStyle: {
        backgroundColor: "#6600ee"
      },
      headerTintColor: '#fff',
    }
  }
});

export default class Index extends React.Component {
  componentDidMount() {
    setNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{
          flex: 1
        }}>
        <UdaciStatusBar backgroundColor={'#6600ee'} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
