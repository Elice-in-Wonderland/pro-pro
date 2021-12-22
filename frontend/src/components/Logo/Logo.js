import Component from '../component';
import logo from '../../assets/images/logo.svg';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('a', {
      className: 'logo router',
      href: '/',
    });
    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
        <img src=${logo} alt='logo'>
    `;
  };
}
