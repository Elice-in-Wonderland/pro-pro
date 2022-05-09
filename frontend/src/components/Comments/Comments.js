import CustomComponent from '../CustomComponent';
import CommentForm from '../CommentForm/CommentForm';
import './comments.scss';
import { createDom } from '../../utils/dom';

export default class Comments extends CustomComponent {
  markup() {
    const { comments } = this.props;
    return (
      <fragment>
        {comments.map(comment => {
          return this.makeCommentHTML(comment);
        })}
      </fragment>
    );
  }

  makeCommentHTML(comment) {
    const { userId, userType, replyId } = this.props;
    const { _id, author, updatedAt, content, nestedComments } = comment;
    return (
      <fragment>
        <div class="comment" parentid={_id} parent="post" data-id={_id}>
          <div class="userWrapper">
            <img src={author.imageURL} width="30px" height="30px" />
            <h4 class="userName">{author.nickname}</h4>
            <h5 class="commentedTime">{updatedAt.slice(0, 10)}</h5>
            {userType === 'loggedUser' || userType === 'author' ? (
              <li class="commentReply">답변</li>
            ) : (
              ''
            )}
            {comment.userId === userId && updatedAt !== '지금' ? (
              <li class="commentDelete">삭제</li>
            ) : (
              ''
            )}
          </div>
          <h6 class="commentContent">{content}</h6>
          {nestedComments.map(nestedComment =>
            this.makeNestedCommentHTML(nestedComment),
          )}
          {replyId === _id
            ? new CommentForm({
                container: createDom('form', {
                  className: 'commentForm',
                }),
                props: { userType },
              }).container
            : ''}
        </div>
      </fragment>
    );
  }

  makeNestedCommentHTML(comment) {
    const { userId, parentId } = this.props;
    const { _id, author, updatedAt, content } = comment;

    return (
      <div class="nestedComment" parentid={parentId} parent="comment" id={_id}>
        <div class="userWrapper">
          <img src={author.imageURL} width="30px" height="30px" />
          <h4 class="userName">{author.nickname}</h4>
          <h5 class="commentedTime">{updatedAt.slice(0, 10)}</h5>
          {comment.userId === userId && updatedAt !== '지금' ? (
            <li class="commentDelete">삭제</li>
          ) : (
            ''
          )}
        </div>
        <h6 class="commentContent">{content}</h6>
      </div>
    );
  }
}
