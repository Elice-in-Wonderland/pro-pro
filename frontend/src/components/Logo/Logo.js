import Component from '../Component';
import logo from '../../assets/images/logo.svg';
import './logo.scss';

export default class Logo extends Component {
  markup() {
    return <img class="logo__img" src={logo} alt="logo" />;
  }
}
