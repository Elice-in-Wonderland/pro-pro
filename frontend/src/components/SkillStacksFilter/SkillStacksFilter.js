/* eslint-disable no-unused-expressions */
import Component from '../Component';
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
import './skillStacksFilter.scss';

export default class SkillStacksFilter extends Component {
  markup() {
    return <div class="skill__icon"></div>;
  }

  renderCallback() {
    const $fragment = document.createDocumentFragment();
    const skillIcon = this.container.querySelector('.skill__icon');
    const imgSrc = {
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

    for (const key in imgSrc) {
      if ({}.hasOwnProperty.call(imgSrc, key)) {
        const imageNode = document.createElement('img');
        imageNode.id = key;
        imageNode.alt = key;
        imageNode.src = imgSrc[key];
        $fragment.appendChild(imageNode);
      }
    }
    skillIcon.appendChild($fragment);
  }
}
