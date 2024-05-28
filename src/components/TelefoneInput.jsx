/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmailInput = ({value, setValue, color}) => {


  const render = useCallback(() => {
    function renderIcon() {
        return (
            <Icon
                size={20}
                name="at"
                color="#F7D100"
            />
        );
    }
    return (
        <TextInput.Icon icon={renderIcon} />
    );
}, []);
  return (
    <>
      <TextInput
        style={styles.emailInput}
        label="E-mail"
        mode="flat"
        textColor="#F7D100"
        left={render()}
        value={value}
        onChangeText={text => setValue(text)}
        theme={{
          colors: {
            text: 'white',
            secondary: 'white',
            primary: '#F7D100',
            inversePrimary: 'green',
          },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  emailInput: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomColor: '#F7D100',
    borderBottomWidth: 2,
  },
});

export default EmailInput;
