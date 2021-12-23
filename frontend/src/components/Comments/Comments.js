import Component from '../component';
import './comments.scss';
import CommentForm from '../CommentForm/CommentForm';
import axiosInstance from '../../utils/api';
import axios from 'axios';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'comments',
    });
    this.state = {
      commentList: props.commentList,
      userType: props.userType,
      userId: props.userId,
    };
    this.render();
    this.addEvent();
  }

  makeCommentHTML = (comment, parent, userType) => {
    return `<div class=${parent === 'post' ? 'comment' : 'nestedComment'}
    parentid=${parent === 'post' ? comment._id : comment.parentId}
    id=${comment._id}
    >
      <div class="userWrapper">
          <img src=${comment.author.imageURL} width="30px" height="30px" />
          <h4 class="userName">${comment.author.nickname}</h4>
          <h5 class="commentedTime" >${comment.updatedAt.slice(0, 10)}</h5>
          ${
            userType === 'loggedUser' || userType === 'author'
              ? `<li class="commentReply">답변</li>`
              : ``
          }
          ${
            comment.userId === this.state.userId
              ? `<li class="commentDelete">삭제</li>`
              : ``
          }
          </div>
      <h6 class="commentContent">${comment.content}</h6>
      </div>
      <hr>
      `;
  };

  render = () => {
    this.$dom.innerHTML = this.state.commentList
      .map(comment => {
        if (comment.nestedComments) {
          let nestedComments = ``;
          comment.nestedComments.forEach(nestedComment => {
            nestedComments += this.makeCommentHTML(
              nestedComment,
              'comment',
              this.state.userType,
            );
          });
          return (
            this.makeCommentHTML(comment, 'post', this.state.userType) +
            nestedComments
          );
        }
        return this.makeCommentHTML(comment, 'post', this.state.userType);
      })
      .join('');
  };

  addEvent = () => {
    const replyBtns = this.$dom.querySelectorAll('.commentReply');
    const deleteBtns = this.$dom.querySelectorAll('.commentDelete');
    replyBtns.forEach(replyBtn => {
      replyBtn.addEventListener('click', this.createCommentForm);
    });
    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', this.deleteComment);
    });
  };

  createCommentForm = event => {
    const replyBtn = event.target;
    const targetComment = replyBtn.parentNode.parentNode;
    const commentForm = new CommentForm({
      userType: this.state.userType,
      parentType: 'comment',
      targetId: targetComment.getAttribute('parentid'),
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
