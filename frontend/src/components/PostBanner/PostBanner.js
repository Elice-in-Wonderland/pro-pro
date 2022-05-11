import CustomComponent from '../CustomComponent';
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

const stackSvg = [
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

export default class PostBanner extends CustomComponent {
  init() {
    this.state = {
      stackSrc: [],
    };

    const { stacks } = this.props;

    stacks.forEach(stack => {
      for (let i = 0; i < defaultStacks.length; i += 1) {
        if (defaultStacks[i] === stack.toLowerCase()) {
          this.state.stackSrc.push(stackSvg[i]);
          break;
        }
      }
    });
  }

  markup() {
    const { stackSrc } = this.state;
    return (
      <fragment>
        {stackSrc.map(stack => {
          return (
            <img class="banner__stack" src={stack} aria-label="기술스택" />
          );
        })}
      </fragment>
    );
  }
}
