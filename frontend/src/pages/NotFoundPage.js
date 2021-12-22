import Component from '../components/component';

// TODO: 리팩토링 및 개선점 찾아보기
export default class NotFoundPage extends Component {
  constructor(props) {
    super(props);

    this.render();
  }

  render = () => {
    this.props.innerHTML = '<div>404 페이지</div>';
  };
}
