/* eslint-disable no-unused-expressions */
import Component from '../component';
import cpp from '../../assets/icons/cpp.svg';
import django from '../../assets/icons/django-icon.svg';
import flutter from '../../assets/icons/flutter.svg';
import go from '../../assets/icons/go.svg';
import java from '../../assets/icons/java.svg';
import javascript from '../../assets/icons/javascript.svg';
import kotlin from '../../assets/icons/kotlin.svg';
import nodejs from '../../assets/icons/nodejs-icon.svg';
import python from '../../assets/icons/python.svg';
import react from '../../assets/icons/react.svg';
import spring from '../../assets/icons/spring.svg';
import swift from '../../assets/icons/swift.svg';
import typescript from '../../assets/icons/typescript.svg';
import vue from '../../assets/icons/vue.svg';
import './skillStacksDropDown.scss';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'skills-drop-down',
    });
    const $fragment = document.createDocumentFragment();
    const imgsrc = {
      cpp,
      django,
      flutter,
      go,
      java,
      javascript,
      kotlin,
      nodejs,
      python,
      react,
      spring,
      swift,
      typescript,
      vue,
    };

    for (const key in imgsrc) {
      if ({}.hasOwnProperty.call(imgsrc, key)) {
        const imageNode = document.createElement('img');
        imageNode.id = key;
        imageNode.src = imgsrc[key];
        $fragment.appendChild(imageNode);
      }
    }

    this.render();
    this.$dom.querySelector('.skill-icon').appendChild($fragment);
  }

  render = () => {
    this.$dom.innerHTML = `
        <div class="skill-icon"></div>
    `;
  };
}
