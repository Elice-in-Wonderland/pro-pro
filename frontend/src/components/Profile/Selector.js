import CustomComponent from '../CustomComponent';

class Selector extends CustomComponent {
  markup() {
    const { items, defaultOption, selectedItem } = this.props;
    return `
      <option value="" selected disabled hidden>${defaultOption}</option>
      ${items
        .map(
          item => `
          <option value="${item}" 
          ${item === selectedItem ? 'selected' : ''}>${item}</option>
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

export default Selector;
