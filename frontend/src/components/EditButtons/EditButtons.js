import Component from '../component';
import './editButtons.scss';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';
import Toast from '../../components/Toast/Toast';

export default class EditButtons extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('form', {
      className: 'editBtns',
    });
    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
    <input class="editBtn" type="submit" value="수정" />
    <input class="deleteBtn" type="submit" value="삭제" />
    `;
  };

  addEvent = () => {
    const editBtn = this.$dom.querySelector('.editBtn');
    const deleteBtn = this.$dom.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', this.deletePost);
    editBtn.addEventListener('click', this.editPost);
  };

  deletePost = event => {
    event.preventDefault();
    axiosInstance
      .delete(`/posts/${this.props.postId}`, {
        withCredentials: true,
      })
      .then(res => {
        RouterContext.state.replace('/');
        new Toast({ content: '게시글이 삭제 되었습니다.', type: 'success' });
      })
      .catch(err => {
        new Toast({
          content: '에러가 발생했습니다. 다시 한번 확인해주세요.',
          type: 'fail',
        });
      });
  };

  editPost = event => {
    event.preventDefault();
    RouterContext.state.push(`/write/${this.props.postId}`);
  };
}
