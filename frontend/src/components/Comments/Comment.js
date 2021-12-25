import Component from '../component';
import './comments.scss';
import CommentForm from '../CommentForm/CommentForm';
import axiosInstance from '../../utils/api';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    const {
      parentType,
      comment: { parentId, _id },
    } = this.props;

    this.$dom = this.createDom('div', {
      className: parentType === 'comment' ? 'nestedComment' : 'comment',
      id: _id,
    });
    this.$dom.setAttribute('parentid', parentId);

    this.render(this.props.comment);
    this.addEvent();
  }

  render = comment => {
    this.$dom.innerHTML = `
      <div class="userWrapper">
          <img src=${comment.author.imageURL} width="30px" height="30px" />
          <h4 class="userName">${comment.author.nickname}</h4>
          <h5 class="commentedTime" >${comment.updatedAt}</h5>
              <li class="commentReply">답변</li>
              <li class="commentDelete">삭제</li>
          </div>
      <h6 class="commentContent">${comment.content}</h6>
      `;
  };

  addEvent = () => {
    const replyBtn = this.$dom.querySelector('.commentReply');
    const deleteBtn = this.$dom.querySelector('.commentDelete');
    replyBtn.addEventListener('click', this.createCommentForm);
    deleteBtn.addEventListener('click', this.deleteComment);
  };

  createCommentForm = event => {
    const replyBtn = event.target;
    const targetComment = replyBtn.parentNode.parentNode;
    const commentForm = new CommentForm({
      userType: 'loggedUser',
      parentType: 'comment',
      postId: targetComment.getAttribute('parentid'),
    });
    targetComment.appendChild(commentForm.$dom);
    replyBtn.removeEventListener('click', this.createCommentForm);
    replyBtn.addEventListener('click', this.deleteCommentForm);
  };

  deleteCommentForm = event => {
    const replyBtn = event.target;
    const targetComment = replyBtn.parentNode.parentNode;
    const commentForm = targetComment.querySelector('.commentForm');
    commentForm.parentNode.removeChild(commentForm);
    replyBtn.removeEventListener('click', this.deleteCommentForm);
    replyBtn.addEventListener('click', this.createCommentForm);
  };

  deleteComment = event => {
    const replyBtn = event.target;
    const targetComment = replyBtn.parentNode.parentNode;
    const hr = targetComment.nextSibling.nextSibling;
    axiosInstance.delete(`comments/${targetComment.id}`, {
      withCredentials: true,
    });
    targetComment.parentNode.removeChild(targetComment);
    hr.parentNode.removeChild(hr);
  };
}
