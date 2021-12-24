import './toast.scss';

class Toast {
  constructor(props) {
    this.timeout = props?.timeout || 3000;
    this.type = props?.type || 'success';
    this.content = props?.content || '성공';

    this.render();
  }

  createDom(tagName, attrs) {
    const $dom = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs)) {
      $dom[key] = value;
    }
    return $dom;
  }

  render() {
    const container = document.querySelector('.toast-container');
    let newContainer;

    if (!container) {
      newContainer = this.createDom('div', {
        className: 'toast-container',
      });
      document.body.appendChild(newContainer);
    } else {
      newContainer = container;
    }

    this.toast = this.createDom('div', {
      className: 'toast',
    });

    newContainer.insertAdjacentElement('beforeend', this.toast);

    newContainer.classList.add('top-right');
    this.toast.classList.add(this.type);

    // setting content
    this.toast.appendChild(
      this.createDom('h4', {
        innerText: this.content,
        className: 'toast-content',
      }),
    );

    // setting timer
    this.toastTimeout.call(this, this.timeout);

    this.progress = this.createDom('div', {
      className: 'toast-progress',
    });
    this.toast.insertAdjacentElement('beforeend', this.progress);
    this.progress.style.animation = `toast_progress ${this.timeout}ms linear forwards`;
  }

  toastTimeout(time) {
    setTimeout(() => {
      this.toast.classList.add('is-hiding');
      setTimeout(() => {
        this.hide();
      }, 1500);
    }, time);
  }

  hide() {
    this.toast.parentNode?.removeChild(this.toast);
  }
}

export default Toast;

// 사용법

// 1. 사용할 컴포넌트에서 import
// import Toast from '../../components/Toast/Toast';

// 2. 알림을 사용하고 싶은 곳에서
// new Toast({ content: '입력하고 싶은 메시지'})
// new Toast({ timeout: 3000, content: 'test', type: 'success' })
// new Toast({ timeout: 3000, content: 'test', type: 'fail' })
// new Toast()

// default timeout:3000, content: 성공, type: success
