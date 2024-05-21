/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const PasswordInput = ({ value, setValue, showPassword, setShowPassword }) => {

    return (
        <>
            <TextInput
                label="Senha"
                value={value}
                mode="flat"
                style={styles.passwordInput}
                onChangeText={text => setValue(text)}
                left={<TextInput.Icon name="lock" size={25} color="black" />}
                secureTextEntry={showPassword}
                right={
                    showPassword ? (
                        <TextInput.Icon
                            name="eye"
                            size={25}
                            color="black"
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <TextInput.Icon
                            name="eye-off"
                            size={25}
                            color="black"
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    )
                }
            />
        </>
    );
};

const styles = StyleSheet.create({
    passwordInput: {
        marginBottom: 10,
        backgroundColor:'transparent',
        borderBottomColor: '#F7D100',
        borderBottomWidth: 2,
    },
});

export default PasswordInput;
