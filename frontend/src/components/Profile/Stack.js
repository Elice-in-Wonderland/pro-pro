import CustomComponent from '../CustomComponent';

export default class Stack extends CustomComponent {
  markup() {
    const { stack, selectedStack } = this.props;
    let checked = false;

    if (selectedStack.indexOf(this.props.stack) !== -1) checked = true;

    return `
      <label for="${stack}" class="label-for-check">${stack}</label>
      <input type="checkbox" class="check-with-label" value="${stack}" id="${stack}" name="stacks" ${
      checked && 'checked'
    }>
    `;
  }
}
