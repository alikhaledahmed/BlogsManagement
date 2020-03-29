import React, { useState } from 'react';
import {Text, TextInput, View, StyleSheet, Button, TouchableOpacity} from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues, buttonTitle }) => {

    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={{ flex: 1, backgroundColor: "#F2D7EE" }}>
            <Text style={styles.label}>TITLE</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle}/>

            <Text style={styles.label}>CONTENT</Text>
            <TextInput style={styles.input} value={content} onChangeText={setContent}/>

            <TouchableOpacity onPress={() => onSubmit(title, content)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{buttonTitle}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#0E103D",
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 5,
        borderRadius: 50,
        color: "#0E103D"
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 20,
        marginBottom: 10,
        color: "#0E103D"
    },
    button: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#0E103D",
        borderRadius: 25,
        padding: 15,
        paddingHorizontal: 35,
        alignSelf: "center",
        backgroundColor: "#0E103D"
    },
    buttonText: {
        color: "#F2D7EE"
    }
});

export default BlogPostForm;