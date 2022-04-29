import CustomComponent from '../CustomComponent';

class Selector extends CustomComponent {
  markup() {
    const { items, defaultOption } = this.props;
    return `
      <option value="" selected disabled hidden>${defaultOption}</option>
      ${items
        .map(
          item => `
          <option value="${item.value}" ${item.selected ? 'selected' : ''}>${
            item.text
          }</option>
      `,
        )
        .join('')}
    
    `;
  }

  setEvent() {
    const { onChange } = this.props;
    // only once bind
    this.container.onchange = onChange;
  }
}

export default Selector;
