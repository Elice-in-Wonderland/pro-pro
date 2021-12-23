import Component from '../component';

export default class Stack extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {});
    this.render();
  }

  render = () => {
    const fragment = new DocumentFragment();
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('check-with-label');
    input.value = this.props.stack;
    input.id = this.props.stack;
    input.name = 'stacks';
    label.setAttribute('for', this.props.stack);
    label.classList.add('label-for-check');
    label.innerHTML = this.props.stack;

    if (this.props.selectedStack.indexOf(this.props.stack) !== -1) {
      input.checked = true;
    }

    fragment.appendChild(input);
    fragment.appendChild(label);
    this.$dom.appendChild(fragment);
  };
}
