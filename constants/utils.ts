import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

const SMALL_DEVICE = width < 360;
const MEDIUM_DEVICE = width >= 360 && width < 415;
const LARGE_DEVICE = width >= 415;

export const DEVICE_SIZE = {
    SMALL_DEVICE,
    MEDIUM_DEVICE,
    LARGE_DEVICE,
};