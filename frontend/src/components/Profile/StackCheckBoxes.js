import Component from '../Component';

export default class StackCheckBoxes extends Component {
  markup() {
    const { stacks, selectedStacks } = this.props;

    return (
      <fragment>
        {stacks.map(stack => (
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
              checked={selectedStacks.has(stack)}
            />
          </div>
        ))}
      </fragment>
    );
  }
}
