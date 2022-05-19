import CustomComponent from '../CustomComponent';
import './comments.scss';

export default class Comments extends CustomComponent {
  markup() {
    const { comments } = this.props;
    return (
      <fragment>
        {comments.map(comment => {
          const { userId, userType, replyId } = this.props;
          const { _id, author, updatedAt, content, nestedComments } = comment;
          return (
            <fragment>
              <div class="comment" data-parent="post" data-id={_id}>
                <div class="comment__user-wrapper">
                  <img src={author.imageURL} width="30px" height="30px" />
                  <h4 class="comment__user-name">{author.nickname}</h4>
                  <h5 class="comment__time">{updatedAt.slice(0, 10)}</h5>
                  {(userType === 'loggedUser' || userType === 'author') &&
                    updatedAt !== '지금' && (
                      <li class="comment__reply">답변</li>
                    )}
                  {comment.userId === userId && updatedAt !== '지금' && (
                    <li class="comment__delete">삭제</li>
                  )}
                </div>
                <h6 class="comment__content">{content}</h6>
                {replyId === _id && (
                  <form class="comment-form comment-form--reply">
                    <textarea
                      placeholder="댓글을 남겨주세요."
                      class="comment-form__textarea"
                      type="text"
                    ></textarea>
                    <input
                      class="comment-form__btn"
                      type="submit"
                      value="등록"
                    />
                  </form>
                )}
              </div>
              {nestedComments.map(nestedComment =>
                this.makeNestedComment(nestedComment, _id),
              )}
            </fragment>
          );
        })}
      </fragment>
    );
  }

  makeNestedComment(comment, parentId) {
    const { userId } = this.props;
    const { _id, author, updatedAt, content } = comment;

    return (
      <div
        class="comment comment--nested"
        data-parent-id={parentId}
        data-parent="comment"
        data-id={_id}
      >
        <div class="comment__user-wrapper">
          <img src={author.imageURL} width="30px" height="30px" />
          <h4 class="comment__user-name">{author.nickname}</h4>
          <h5 class="comment__time">{updatedAt.slice(0, 10)}</h5>
          {comment.userId === userId && updatedAt !== '지금' && (
            <li class="comment__delete">삭제</li>
          )}
        </div>
        <h6 class="comment__content">{content}</h6>
      </div>
    );
  }
}
