import Component from '../component';
import JavaScript from '../../assets/icons/javascript.svg';
import TypeScript from '../../assets/icons/typescript.svg';
import './cardImage.scss';

export default class CardImage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'cardImage-wrapper',
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
        <div class="image"></div>
    `;
    this.addEvent();
  };

  addEvent = () => {
    const findImage = stack => {
      switch (stack) {
        case 'JavaScript':
          return JavaScript;
          break;
        case 'TypeScript':
          return TypeScript;
          break;
      }
    };

    const findColor = stack => {
      switch (stack) {
        case 'JavaScript':
          return '#FFE29A';
          break;
        case 'TypeScript':
          return '#4B9CCE';
          break;
      }
    };

    const createImage = () => {
      // 배경색
      this.$dom.style.backgroundColor = `${findColor(this.props[0])}`;

      // 이미지
      const images = this.$dom.querySelector('.image');
      const $createFrag = document.createDocumentFragment();
      this.props.forEach(stack => {
        const imageNode = document.createElement('img');
        imageNode.src = findImage(stack);
        $createFrag.appendChild(imageNode);
      });

      this.replaceElement(images, $createFrag);
    };
    createImage();
  };
}
