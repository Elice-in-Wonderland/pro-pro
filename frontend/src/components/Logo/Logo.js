import logo from '../../assets/images/logo.svg';
import CustomComponent from '../CustomComponent';
import './logo.scss';

export default class Logo extends CustomComponent {
  markup() {
    return <img class="logo__img" src={logo} alt="logo" />;
  }
}
