import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import store from "./src/configureStore";

LogBox.ignoreAllLogs();

//here we provide store to our App component
const Main = () => {
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider >
    );
}

AppRegistry.registerComponent(appName, () => Main);
