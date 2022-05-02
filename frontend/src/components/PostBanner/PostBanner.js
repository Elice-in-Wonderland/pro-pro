import Component from '../component';
import './postBanner.scss';
import { defaultStacks } from '../../library/Profile';

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

const stackLogos = [
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
];

export default class PostBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stackList: props.stackList,
      firstStack: props.stackList[0].toLowerCase(),
    };

    this.$dom = this.createDom('div', {
      className: `banner ${this.state.firstStack}`,
    });

    this.state.stackLogoURLs = [];

    this.state.stackList.forEach(stack => {
      for (let i = 0; i < defaultStacks.length; i++) {
        if (defaultStacks[i] === stack.toLowerCase()) {
          this.state.stackLogoURLs.push(stackLogos[i]);
          break;
        }
      }
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = this.state.stackLogoURLs
      .map(stack => {
        return `
        <img class="bannerLogo" src='${stack}' aria-label="기술스택"/>
        `;
      })
      .join('');
  };
}
