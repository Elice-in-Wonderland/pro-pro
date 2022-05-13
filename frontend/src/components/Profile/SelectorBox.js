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
        {items.map(item =>
          item === selectedItem ? (
            <option value={item} selected>
              {item}
            </option>
          ) : (
            <option value={item}>{item}</option>
          ),
        )}
      </select>
    );
  }
}

export default SelectorBox;
