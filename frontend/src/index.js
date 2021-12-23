import App from './app';
import './styles/reset.css';
import './styles/index.css';
import { sdkPostCode } from './utils/setting';

sdkPostCode();
new App(document.getElementById('root'));
