import Component from '../../components/component';

export default class DetailPage extends Component {
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
