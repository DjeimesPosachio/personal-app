/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const EmailInput = ({ value, setValue }) => {
    return (
        <>
            <TextInput
                style={styles.emailInput}
                label="E-mail"
                mode="flat"
                left={<TextInput.Icon name="at" size={25} color="black" />}
                value={value}
                onChangeText={text => setValue(text)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    emailInput: {
        marginBottom: 10,
        backgroundColor:'transparent',
        borderBottomColor: '#F7D100',
        borderBottomWidth: 2,
    },
});

export default EmailInput;
