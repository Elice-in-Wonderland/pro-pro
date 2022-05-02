import CustomComponent from '../CustomComponent';
import './stacks.scss';

export default class Stacks extends CustomComponent {
  markup() {
    const { stacks } = this.props;
    return stacks
      .map(item => {
        return `<li>${item}</li>`;
      })
      .join('');
  }
}
