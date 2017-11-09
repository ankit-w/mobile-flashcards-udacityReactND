import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getDecks}  from '../../actions/ActionCreators';
import { fetchDecks } from '../../util/StorageAPI';
import DeckCard from './DeckCard';

class DeckList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  renderItem = ({ item }) => (
    <View style={ styles.item }>
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('Deck', item) }>
        <DeckCard title={ item.title } questions={ item.questions }/>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={ styles.deck }>
        <FlatList data={ Object.values(this.props.decks).sort((x, y) => x.title > y.title) }
            renderItem={ this.renderItem }
            keyExtractor={ (item, index) => index }/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    height: Dimensions.get('window').height
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
});

export default connect(mapStateToProps)(DeckList);
