import Component from '../../components/component';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = undefined;
  }

  render = () => {
    this.$dom.innerHTML = `
      <div >
        test
      </div>
    `;
  };
}
