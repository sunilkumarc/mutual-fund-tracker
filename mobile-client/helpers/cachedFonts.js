import { Font } from 'expo';

const cachedFonts = fonts =>
  fonts.map(font => Font.loadAsync(font));


export const fontAssets = cachedFonts([
    {
        roboto: require('../assets/fonts/Roboto/Roboto-Regular.ttf')
    },
    {
        roboto_bold: require('../assets/fonts/Roboto/Roboto-Bold.ttf')
    },
    {
        lato: require('../assets/fonts/Lato/Lato-Regular.ttf')
    },
    {
        lato_bold: require('../assets/fonts/Lato/Lato-Bold.ttf')
    },
]);