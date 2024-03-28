import {AppRegistry} from 'react-native';
import {Services} from './src/Services';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Services);
