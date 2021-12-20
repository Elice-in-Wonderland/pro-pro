import Component from '../component';
import styles from './comments.scss';

export default class stacks extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'comments',
    });
    this.state = {
      commentList: props.commentList,
    };
    this.render();
  }

  makeCommentHTML = (comment, parent) => {
    return `<div class=${parent === 'post' ? 'comment' : 'nestedComment'}>
      <div class="userWrapper">
          <img src=${comment.imageURL} width="30px" height="30px" />
          <h4 class="userName">${comment.author}</h4>
          <h5 class="commentedTime" >${comment.updatedAt.slice(0, 10)}</h5>
      </div>
      <h6 class="commentContent">${comment.content}</h6>
  </div>
      <hr>`;
  };

  render = () => {
    this.$dom.innerHTML = this.state.commentList
      .map(comment => {
        if (comment.nestedComments) {
          let nestedComments = ``;
          comment.nestedComments.forEach(nestedComment => {
            nestedComments += this.makeCommentHTML(nestedComment, 'comment');
          });
          return this.makeCommentHTML(comment, 'post') + nestedComments;
        }
        return this.makeCommentHTML(comment, 'post');
      })
      .join('');
  };
}
