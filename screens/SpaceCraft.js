import React, { Component } from 'react';
import { Text, View, Alert, FlatList, Image, ImageBackground, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

import axios from 'axios';

export default class SpaceCraftsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aircrafts: []
        };
    }

    componentDidMount() {
        this.getData()

    }

    getData = () => {
        axios.get("https://ll.thespacedevs.com/2.0.0/config/spacecraft/")
            .then(response => {

                this.setState({ aircrafts: response.data.results })

            })
            .catch(error => {
                console.log(error.message)
            })

    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.contentCard}>
                <ImageBackground source={"assets/space.gif"} style={{width:size,height:size,alignSelf:"center"}}>
                <View style={styles.gifContainer}>
            <Image source={speed} style={{width:size,height:size,alignSelf:"center"}}></Image>
                <View>
                    <Text style={[styles.titleText,{marginTop:400,marginLeft:50}]}>{item.name}</Text>
                    <Text style={[styles.titleText,{marginTop:20,marginLeft:50}]}>Closest to Earth:-{item.close_approach_data[0].close_approach_date_full}</Text>
                    <Text style={[styles.titleText,{marginTop:5,marginLeft:50}]}>Minimum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                    <Text style={[styles.titleText,{marginTop:5,marginLeft:50}]}>Maximum Diameter (KM) - {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                    <Text style={[styles.titleText,{marginTop:5,marginLeft:50}]}>Velocity (KM/H) - {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                    <Text style={[styles.titleText,{marginTop:5,marginLeft:50}]}>Missing Earth By (KM) - {item.close_approach_data[0].miss_distance.kilometers}</Text>
                </View>         
         </View>
                </ImageBackground>
                <Image source={{ uri: item.agency.image_url }} style={styles.itemImage}></Image>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'purple' }}>{item.name}</Text>                    
                       { <Text style={{ color: '#696969', fontSize: 16 }}>{item.agency.name}</Text> } 
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#A9A9A9', fontSize: 13 }}>{item.agency.description}</Text>
                    </View>
                </View>
            </View>          
        )
       
    }

    keyExtractor = (item, index) => index.toString();

    render() {
        if (Object.keys(this.state.aircrafts).length === 0) {
            return (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <ImageBackground source={require('assets/stars.gif')} style={styles.backgroundImage}>
                        <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.titleText}>Spacecrafts</Text>
                        </View>
                    </ImageBackground>
                        <View style={{ flex: 0.85 }}>
                             <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.aircrafts}
                                renderItem={this.renderItem}
                                initialNumToRender={10}
                                horizontal= {false}
                            />                          
                        </View>                   
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "white",
        justifyContent: "center",
        alignContent: "center",
    },
    contentCard: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        elevation: 10,
        backgroundColor: 'white'
    },
    itemImage: {
        width: "100%",
        height: 200,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5
    },
    gifContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})