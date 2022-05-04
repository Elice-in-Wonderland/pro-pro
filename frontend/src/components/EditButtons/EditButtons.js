import CustomComponent from '../CustomComponent';
import './editButtons.scss';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';
import Toast from '../Toast/Toast';
import { addEvent } from '../../utils/dom';

export default class EditButtons extends CustomComponent {
  renderCallback() {
    this.setEvent();
  }

  setEvent() {
    addEvent(this.container, 'click', '.editBtn', this.editPost);
    addEvent(this.container, 'click', '.deleteBtn', this.deletePost);
  }

  markup() {
    return `
    <input class="editBtn" type="submit" value="수정" />
    <input class="deleteBtn" type="submit" value="삭제" />
    `;
  }

  deletePost(event) {
    event.preventDefault();
    const { postId } = RouterContext.state.params;
    axiosInstance
      .delete(`/posts/${postId}`, {
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
  }

  editPost(event) {
    event.preventDefault();
    const { postId } = RouterContext.state.params;
    RouterContext.state.push(`/write/${postId}`);
  }
}
