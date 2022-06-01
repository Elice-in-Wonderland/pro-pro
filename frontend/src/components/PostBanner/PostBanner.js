import './postBanner.scss';
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
import { defaultStacks } from '@/library/Profile';
import Component from '../Component';

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

export default class PostBanner extends Component {
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
