import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
const CharactersRedux = require('@redux/CharactersRedux');
const { width } = Dimensions.get('window')
import { ActivityIndicator, Card, Title, Paragraph } from 'react-native-paper';

//in Home screen we will display characters list
const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    let [characters, setCharacters] = useState([])
    let [next, setNext] = useState()
    let [previous, setPrevious] = useState()
    let [isFetchingData, setIsFetchingData] = useState(false)

    useEffect(() => {
        getCharacters()
    }, [])
    //here we get character from api
    const getCharacters = async (nextOrPrevious, forWhat) => {
        if (previous != 'page=41') {
            setIsFetchingData(true)
            let data = await CharactersRedux.actions.getCharacters(dispatch, nextOrPrevious == 'next' ? next : previous)
            if (data) {
                let oldData = []
                if (forWhat && forWhat == 'refresh') {
                    oldData = [...data.results]
                } else {
                    oldData = [...characters, ...data.results]
                }
                setCharacters(oldData)
                setNext(data && data.info && data.info.next ? data.info.next.split("?").pop() : undefined)
                setPrevious(data && data.info && data.info.prev ? data.info.prev.split("?").pop() : undefined)
            }
            setIsFetchingData(false)
        }
    }
    //on click on item, we are going to Details screen
    const onItemPress = (item) => {
        navigation.navigate('Details', { character: item })
    }
    //render items of FlatList
    const renderItems = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onItemPress(item)}>
                <Card style={styles.listItem}>
                    <Card.Cover source={{ uri: item.image }} style={styles.image} />
                    <Card.Content>
                        <Title>{item.name}</Title>
                        <Paragraph>{item.species} - {item.gender}</Paragraph>
                        {
                            (item.location) ?
                                <Paragraph>Location: {item.location.name}</Paragraph>
                                : null
                        }
                        {
                            (item.origin) ?
                                <Paragraph>Origin: {item.origin.name}</Paragraph>
                                : null
                        }
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }
    const handleEmpty = () => {
        return (
            <View style={styles.noDataView}>
                <Text style={styles.noDataText}>No Data Found</Text>
            </View>
        )
    }
    const RenderSpinner = () => (
        <View style={styles.indicatorView}>
            <ActivityIndicator animating={true} color={'blue'} />
            <Text style={styles.indicatorText}>Please wait...</Text>
        </View>
    )
    return (characters.length == 0) ?
        <RenderSpinner />
        : (
            <View style={styles.container}>

                <FlatList
                    data={characters}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={renderItems}
                    ListEmptyComponent={handleEmpty}
                    onEndReached={() => getCharacters('next')}
                    onEndReachedThreshold={2}
                    initialNumToRender={20}
                    ListFooterComponent={isFetchingData ? RenderSpinner : null}
                />
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingHorizontal: 10
    },
    listItem: {
        width: (width / 2) - 20,
        margin: 10
    },
    image: {
        width: (width / 2) - 20,
        height: (width / 2) - 20,
        resizeMode: 'cover'
    },
    noDataView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        fontSize: 18,
        color: 'black'
    },
    indicatorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorText: {
        fontSize: 20,
        marginTop: 10
    }
})

export default Home
