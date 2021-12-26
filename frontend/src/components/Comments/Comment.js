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
          </div>
      <h6 class="commentContent">${comment.content}</h6>
      `;
  };

  addEvent = () => {};
}
