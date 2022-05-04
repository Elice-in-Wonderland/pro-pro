import CustomComponent from '../CustomComponent';

export default class Stack extends CustomComponent {
  markup() {
    const { stacks, selectedStacks } = this.props;

    return `
      ${stacks
        .map(
          stack => `
          <div>
            <label for="${stack}" class="label-for-check">${stack}</label>
            <input type="checkbox" class="check-with-label" 
            value="${stack}" id="${stack}" name="stacks" 
            ${selectedStacks.has(stack) ? 'checked' : ''}>
          </div>  
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
