import Component from '../component';
import './commentForm.scss';
import axiosInstance from '../../utils/api';
import Comment from '../../components/Comments/Comments';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: props.userType,
      targetId: props.targetId,
      parentType: props.parentType,
    };
    this.$dom = this.createDom('form', {
      className: 'commentForm',
    });
    this.render();
    this.addEvent();
  }

  loggedUserForm = () => {
    return `          
        <textarea placeholder="댓글을 남겨주세요." class="writeComment" type="text" ></textarea>
        <input class="submitComment" type="submit" value="등록" />
    `;
  };

  notLoggedUserForm = () => {
    return `          
        <textarea placeholder="먼저 로그인 해주세요." class="writeComment" type="text" ></textarea>
    `;
  };

  render = () => {
    this.$dom.innerHTML =
      this.state.userType === 'loggedUser' || this.state.userType === 'author'
        ? this.loggedUserForm()
        : this.notLoggedUserForm();
  };

  addEvent = () => {
    this.$dom.addEventListener('submit', this.postComment);
  };

  postComment = event => {
    event.preventDefault();
    const commentContent = this.$dom.querySelector('.writeComment').value;
    this.$dom.querySelector('.writeComment').value = '';
    axiosInstance.post(
      'comments',
      {
        content: commentContent,
        parentType: this.state.parentType,
        parentId: this.state.targetId,
      },
      { withCredentials: true },
    );
    location.reload();
    // this.paintComment(commentContent);
  };

  paintComment = content => {
    const comments = this.$dom.previousSibling.previousSibling;
    const newComment = new Comment({});
    comments.appendChild(newComment);
  };
}
