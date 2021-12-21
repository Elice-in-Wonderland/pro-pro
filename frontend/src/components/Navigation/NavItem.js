import Component from '../component';
import LoginModal from '../LoginModal/LoginModal';

export default class NavItem extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('li', {
      className: props.className,
    });

    this.render();
  }

  render = () => {
    if (this.props.type === 'a') {
      this.$dom.innerHTML = `
        <a href=${this.props.href}>${this.props.text}</a>
    `;
      return;
    }

    // 로그인 버튼 모달
    const $p = this.createDom('p', {
      innerText: '로그인',
      className: 'login-text',
    });
    this.$dom.appendChild($p);
    this.$loginModal = new LoginModal(this.$dom);
    this.$dom.append(this.$loginModal.$dom);
    this.$dom.addEventListener('click', e => {
      if (e.target === $p) this.$loginModal.$dom.classList.remove('hidden');
    });
  };
}
