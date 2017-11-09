import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'mobile-flashcards:content';

let defaultData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            }
        ]
    }
};

function useInitialData() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
}

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY).then(results => {
        return results === null ? useInitialData() : JSON.parse(results);
    });
}

export function createDeck(deck) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}

export function addNewQuestion({card, deckName}) {
    return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions));
        newQuestions[newQuestions.length] = card;

        const value = JSON.stringify({
            [deckName]: {title: deckName, questions: newQuestions},
        });

        AsyncStorage.mergeItem(STORAGE_KEY, value);
    });
}
