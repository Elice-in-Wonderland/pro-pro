import logo from '../../assets/images/logo.svg';
import CustomComponent from '../CustomComponent';

export default class Logo extends CustomComponent {
  markup() {
    return <img src={logo} alt="logo" width="130px" hegiht="80px" />;
  }
}
