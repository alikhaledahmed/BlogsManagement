import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    
    const { state } = useContext(Context);
    const post = state.find(post => post.id === navigation.getParam('id')); 

    return (
        <View style={{ flex: 1, backgroundColor: "#F2D7EE" }}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.content}>{post.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () =>
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id')})}>
                <EvilIcons name="pencil" size={35} style={{ color: "#D3BCC0" }}/>
            </TouchableOpacity>
    };
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        fontWeight: "bold",
        margin: 20,
        marginBottom: 10,
        color: "#0E103D"
    },
    content: {
        fontSize: 24,
        margin: 20,
        color: "#69306D"
    }
});

export default ShowScreen;