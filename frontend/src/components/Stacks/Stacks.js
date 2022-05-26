import Component from '../Component';
import './stacks.scss';

export default class Stacks extends Component {
  markup() {
    const { stacks } = this.props;
    return (
      <fragment>
        {stacks.map(item => {
          return <li>{item}</li>;
        })}
      </fragment>
    );
  }
}
