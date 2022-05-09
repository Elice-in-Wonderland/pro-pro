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
    // TODO: 리렌더링시마다 상위 container를 새로만드는게 아니면 중복적으로 이벤트가 달리는 현상 해결
    this.container.onchange = onChange;
  }
}

export default Selector;
