import Component from '@/components/Component';
import WriteForm from '../../components/WriteForm/WriteForm';

export default class CreatePostPage extends Component {
  markup() {
    return <div class="write"></div>;
  }

  renderCallback() {
    const container = this.container.querySelector('.write');
    new WriteForm({
      container,
      props: {},
    });
  }
}
