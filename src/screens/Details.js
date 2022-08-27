import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { List, Divider, ActivityIndicator } from 'react-native-paper';
const LocationsRedux = require('@redux/LocationsRedux');
const EpisodesRedux = require('@redux/EpisodesRedux');

const Details = ({ navigation, route }) => {
    const dispatch = useDispatch()
    let [character, setCharacter] = useState((route && route.params && route.params.character ? route.params.character : undefined))
    let [locations, setLocations] = useState([])
    let [episodes, setEpisodes] = useState([])
    let [downloading, setDownloading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setDownloading(true)

            //here we merge current location and origin id and will get data
            let locations = []
            if (character.location && character.location.name != 'unknown')
                locations.push(character.location.url.split("/").pop())
            if (character.origin && character.origin.name != 'unknown')
                locations.push(character.origin.url.split("/").pop())
            if (locations.length > 0) {
                let locData = await LocationsRedux.actions.getLocations(dispatch, locations.toString())
                setLocations(Array.isArray(locData) ? locData : [locData])
            }

            //here we will get episodes data
            let episodes = []
            if (character.episode && character.episode.length > 0) {
                character.episode.forEach((item) => {
                    episodes.push(item.split("/").pop())
                })
                let epiData = await EpisodesRedux.actions.getEpisodes(dispatch, episodes.toString())
                setEpisodes(Array.isArray(epiData) ? epiData : [epiData])
            }
            setDownloading(false)
        }
        getData()
    }, [])

    const LocationAndOriginView = ({ title, iconName, item }) => {
        return (
            <List.Accordion
                title={title}
                left={props => <List.Icon {...props} icon={iconName} />}
            >
                <View style={[styles.episodeItemView, { marginBottom: 10 }]}>
                    <View style={styles.itemView}>
                        <Text style={styles.flex1}>Name</Text>
                        <Text style={styles.flex2}>{item.name}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.flex1}>Dimension</Text>
                        <Text style={styles.flex2}>{item.dimension}</Text>
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.flex1}>Residents</Text>
                        <Text style={styles.flex2}>{item.residents.length}</Text>
                    </View>
                </View>
            </List.Accordion>
        )
    }
    const EpisodesView = ({ title, iconName, items }) => {
        return (
            <List.Accordion
                title={title}
                left={props => <List.Icon {...props} icon={iconName} />}
            >
                {
                    items.map((item, index) => {
                        return (
                            <View style={styles.episodeItemView} key={index}>
                                <View style={styles.itemView}>
                                    <Text style={styles.flex1}>Name</Text>
                                    <Text style={styles.flex2}>{item.name}</Text>
                                </View>
                                <View style={styles.itemView}>
                                    <Text style={styles.flex1}>Episode</Text>
                                    <Text style={styles.flex2}>{item.episode}</Text>
                                </View>
                                <View style={styles.itemView}>
                                    <Text style={styles.flex1}>Air Date</Text>
                                    <Text style={styles.flex2}>{item.air_date}</Text>
                                </View>
                                {
                                    (items.length > index + 1) ?
                                        <Divider bold={true} style={styles.dividerStyle} />
                                        : null
                                }
                            </View>
                        )
                    })
                }
            </List.Accordion>
        )
    }

    return (downloading) ?
        <View style={styles.indicatorView}>
            <ActivityIndicator animating={true} color={'blue'} />
            <Text style={styles.indicatorText}>Please wait...</Text>
        </View>

        : (
            <ScrollView>
                <View>
                    <List.Section>
                        {
                            (locations && locations.length > 0) ?
                                <View>
                                    {
                                        (character.origin.name != 'unknown') ?
                                            <LocationAndOriginView
                                                title={'Origin'}
                                                iconName='map-marker-radius'
                                                item={locations.find(item => item.name == character.origin.name)}
                                            />
                                            : null
                                    }
                                    {
                                        (character.location.name != 'unknown') ?
                                            <LocationAndOriginView
                                                title={'Current Location'}
                                                iconName='map-marker'
                                                item={locations.find(item => item.name == character.location.name)}
                                            />
                                            : null
                                    }
                                </View>
                                : null
                        }
                        {
                            (episodes && episodes.length > 0) ?
                                <EpisodesView
                                    title={'Episodes'}
                                    iconName='format-list-bulleted-square'
                                    items={episodes}
                                />
                                : null
                        }

                    </List.Section>
                </View>
            </ScrollView>
        )
}


const styles = StyleSheet.create({
    episodeItemView: {
        marginTop: 10,
        flex: 1
    },
    dividerStyle: {
        marginTop: 10
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    itemView: {
        flexDirection: 'row',
        flex: 1
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
export default Details
