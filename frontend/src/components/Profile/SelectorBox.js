import CustomComponent from '../CustomComponent';

class SelectorBox extends CustomComponent {
  markup() {
    const { id, items, defaultOption, selectedItem } = this.props;

    return (
      <select
        id={id}
        class="profile-edit__form__select"
        onChange={this.props.onChange}
      >
        <option value="" selected disabled hidden>
          {defaultOption}
        </option>
        {items.map(item => (
          <option value={item} selected={item === selectedItem}>
            {item}
          </option>
        ))}
      </select>
    );
  }
}

export default SelectorBox;
