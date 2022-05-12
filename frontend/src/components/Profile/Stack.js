import CustomComponent from '../CustomComponent';

export default class Stack extends CustomComponent {
  markup() {
    const { stacks, selectedStacks } = this.props;

    return (
      <fragment>
        {stacks.map(stack => {
          if (selectedStacks.has(stack)) {
            return (
              <div>
                <label for={stack} class="label-for-check">
                  {stack}
                </label>
                <input
                  type="checkbox"
                  class="check-with-label"
                  value={stack}
                  id={stack}
                  name="stacks"
                  checked
                />
              </div>
            );
          }

          return (
            <div>
              <label for={stack} class="label-for-check">
                {stack}
              </label>
              <input
                type="checkbox"
                class="check-with-label"
                value={stack}
                id={stack}
                name="stacks"
              />
            </div>
          );
        })}
      </fragment>
    );
  }

  setEvent() {
    const { onChange } = this.props;
    this.container.onchange = onChange;
  }
}
