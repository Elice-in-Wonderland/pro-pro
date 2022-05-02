import CustomComponent from '../CustomComponent';

export default class Stack extends CustomComponent {
  markup() {
    const { stacks } = this.props;

    return `
      ${stacks
        .map(
          stack => `
            <label for="${stack.value}" class="label-for-check">
              ${stack.value}
            </label>
            <input type="checkbox" class="check-with-label" 
            value="${stack.value}" id="${stack.value}" name="stacks" 
            ${stack.checked ? 'checked' : ''}>
          `,
        )
        .join('')}
    `;
  }

  setEvent() {
    const { onChange } = this.props;
    this.container.onchange = onChange;
  }
}
