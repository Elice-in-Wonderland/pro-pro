import CustomComponent from '../CustomComponent';
import './comments.scss';

export default class Comments extends CustomComponent {
  markup() {
    const { comments } = this.props;
    return comments
      .map(comment => {
        if (comment.nestedComments) {
          const nestedComments = this.makeNestedComments(
            comment.nestedComments,
          );
          return this.makeCommentHTML(comment) + nestedComments;
        }
        return this.makeCommentHTML(comment);
      })
      .join('');
  }

  makeCommentHTML(comment) {
    const { userId } = this.props;
    const { _id, author, updatedAt, content } = comment;

    return `
    <div class='comment' parentid='${_id}' parent='post' data-id=${_id}>
        <div class="userWrapper">
            <img src=${author.imageURL} width="30px" height="30px" />
            <h4 class="userName">${author.nickname}</h4>
            <h5 class="commentedTime" >${updatedAt.slice(0, 10)}</h5>
            ${
              comment.userId === userId && updatedAt !== '지금'
                ? '<li class="commentDelete">삭제</li>'
                : ''
            }
            </div>
        <h6 class="commentContent">${content}</h6>
      </div>
      `;
  }

  makeNestedComments(nestedComments) {
    let result = '';
    nestedComments.forEach(nestedComment => {
      result += this.makeNestedCommentHTML(nestedComment);
    });
    return result;
  }

  makeNestedCommentHTML(comment) {
    const { userId, parentId } = this.props;
    const { _id, author, updatedAt, content } = comment;

    return `
    <div class='nestedComment' parentid='${parentId}' parent='comment' id=${_id}>
      <div class="userWrapper">
          <img src=${author.imageURL} width="30px" height="30px" />
          <h4 class="userName">${author.nickname}</h4>
          <h5 class="commentedTime" >${updatedAt.slice(0, 10)}</h5>
          ${
            comment.userId === userId && updatedAt !== '지금'
              ? '<li class="commentDelete">삭제</li>'
              : ''
          }
          </div>
      <h6 class="commentContent">${content}</h6>
      </div>
      `;
  }
}

// TODO : 답변기능 추가
// ${
//   userType === 'loggedUser' || userType === 'author'
//     ? '<li class="commentReply">답변</li>'
//     : ''
// }
