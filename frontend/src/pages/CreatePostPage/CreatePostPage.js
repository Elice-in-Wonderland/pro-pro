import CustomComponent from '@/components/CustomComponent';
import WriteForm from '../../components/WriteForm/WriteForm';

export default class CreatePostPage extends CustomComponent {
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
