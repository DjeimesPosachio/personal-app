/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

export function getErrorMessage(
  error,
  defaultMessage = 'Ocorreu um erro inesperado.',
) {
  if (!error) {
    return Alert.alert(defaultMessage);
  }

  const {response = null} = error;
  const errorMessage = response?.data || defaultMessage;

  return Alert.alert(errorMessage);
}
