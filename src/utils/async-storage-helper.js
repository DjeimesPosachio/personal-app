/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_USUARIO } from '../consts';

export async function getUsuarioLogado() {
    const usuarioLogado = await AsyncStorage.getItem(KEY_USUARIO);
    return JSON.parse(usuarioLogado);
}
