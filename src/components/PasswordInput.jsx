/* eslint-disable prettier/prettier */
import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const PasswordInput = ({value, setValue, label = 'Senha'}) => {
  const [showPassword, setShowPassword] = useState(false);

  const tooglePasswordVisibility = useCallback(() => {
    setShowPassword(prevState => !prevState);
  }, []);

  const render = useCallback(() => {
    function renderIcon() {
      return (
        <Icon
          size={20}
          name={showPassword ? 'eye' : 'eye-slash'}
          onPress={tooglePasswordVisibility}
          color="#F7D100"
        />
      );
    }

    return <TextInput.Icon icon={renderIcon} />;
  }, [showPassword, tooglePasswordVisibility]);

  const renderLeft = useCallback(() => {
    function renderIcon() {
      return <Icon size={20} name="lock" color="#F7D100" />;
    }
    return <TextInput.Icon icon={renderIcon} />;
  }, []);

  return (
    <>
      <TextInput
        label={label}
        value={value}
        mode="flat"
        style={styles.passwordInput}
        onChangeText={text => setValue(text)}
        left={renderLeft()}
        secureTextEntry={showPassword}
        textColor="#F7D100"
        right={render()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  passwordInput: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomColor: '#F7D100',
    borderBottomWidth: 2,
  },
});

export default PasswordInput;
