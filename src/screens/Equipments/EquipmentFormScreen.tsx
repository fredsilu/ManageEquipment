import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EquipmentFormScreen = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Equipment Name:', name);
        console.log('Equipment Type:', type);
        console.log('Equipment Quantity:', quantity);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Equipment Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Equipment Type</Text>
            <TextInput
                style={styles.input}
                value={type}
                onChangeText={setType}
            />
            <Text style={styles.label}>Quantity</Text>
            <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default EquipmentFormScreen;