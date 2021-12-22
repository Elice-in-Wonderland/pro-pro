import Component from '../component';
import LoginModal from '../LoginModal/LoginModal';

export default class NavItem extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('li', {});

    this.render();
  }

  render = () => {
    if (this.props.type === 'a') {
      const $a = this.createDom('a', {
        href: this.props.href,
        className: this.props.className,
        innerText: this.props.text,
      });
      this.$dom.appendChild($a);
      return;
    }

    if (this.props.type === 'profile') {
      const $dropBox = this.createDom('div', {
        className: 'drop-box',
      });
      const $profile = this.createDom('div', {
        className: 'profile',
      });
      const $img = this.createDom('img', {
        src: 'https://images.unsplash.com/photo-1638913658211-c999de7fe786?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80',
        alt: 'profile',
      });
      const $menu = this.createDom('div', {
        className: 'menu',
      });
      const $ul = this.createDom('ul', {});

      this.props.list.forEach(li => {
        const $li = this.createDom('li', {});
        const $a = this.createDom('a', {
          href: li.href,
          className: li.className,
          innerText: li.text,
        });
        $li.appendChild($a);
        $ul.appendChild($li);
      });
      $profile.appendChild($img);
      $menu.appendChild($ul);
      $dropBox.appendChild($profile);
      $dropBox.appendChild($menu);
      this.$dom.appendChild($dropBox);

      $img.addEventListener('click', e => {
        $menu.classList.toggle('active');
      });

      document.querySelector('#root').addEventListener('click', e => {
        if (!$dropBox.contains(e.target)) $menu.classList.remove('active');
      });

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
