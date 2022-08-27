import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { reducer as CharactersRedux } from './CharactersRedux'
import { reducer as LocationsRedux } from './LocationsRedux'
import { reducer as EpisodesRedux } from './EpisodesRedux'

const config = {
    key: 'root',
    storage: AsyncStorage
}

const reducers = persistCombineReducers(config, {
    characters: CharactersRedux,
    locations: LocationsRedux,
    episodes: EpisodesRedux
})
const appReducer = (state, action) => {
    return reducers(state, action)
}

export default appReducer