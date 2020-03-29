import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {

    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();

        const listner = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listner.remove();
        };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: "#F2D7EE" }}>
            <FlatList
                style={{ marginTop: 5 }}
                data={state}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.singleBlog}>
                            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                                <Text style={styles.blogTitle}>{item.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <EvilIcons name="trash" style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () =>
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <EvilIcons name="plus" size={30} style={{ color: "#D3BCC0" }} />
            </TouchableOpacity>
    };
};

const styles = StyleSheet.create({

    singleBlog: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#A5668B",
        padding: 20,
        backgroundColor: "#0E103D",
        borderRadius: 50,
        margin: 10
    },
    blogTitle: {
        fontSize: 18,
        color: "#F2D7EE"
    },

    deleteIcon: {
        fontSize: 30,
        color: "#F2D7EE"
    }
});

export default IndexScreen;