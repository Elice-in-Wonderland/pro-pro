import CustomComponent from '../CustomComponent';

class Selector extends CustomComponent {
  markup() {
    const { items, defaultOption, selectedItem } = this.props;
    return (
      <fragment>
        <option value="" selected disabled hidden>
          {defaultOption}
        </option>
        {items.map(item => {
          if (item === selectedItem) {
            return (
              <option value={item} selected>
                {item}
              </option>
            );
          }
          return <option value={item}>{item}</option>;
        })}
      </fragment>
    );
  }

  setEvent() {
    const { onChange } = this.props;
    this.container.onchange = onChange;
  }
}

export default Selector;
