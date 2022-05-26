/* eslint-disable no-unused-expressions */
import {
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
} from '@assets/icons';
import Component from '../Component';
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
