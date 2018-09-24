// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          films: [],
          searchedText: "" // Initialisation de notre donnée searchedText dans le state
        }
    }

	_loadFilms() {
	    console.log(this.state.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
	    if (this.state.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
	      getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
	          this.setState({ films: data.results })
	      })
	    }
	}

    _searchTextInputChanged(text) {
        this.setState({ searchedText: text })
    }

    render() {
        console.log("RENDER")
        return (
          <View style={styles.main_container}>
            <TextInput
              style={styles.textinput}
              placeholder='Titre du film'
              onChangeText={(text) => this._searchTextInputChanged(text)}
            />
            //...
          </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search
