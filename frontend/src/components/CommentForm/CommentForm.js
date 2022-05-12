import CustomComponent from '../CustomComponent';
import './commentForm.scss';

export default class CommentForm extends CustomComponent {
  markup() {
    const { userType } = this.props;
    return userType === 'loggedUser' || userType === 'author'
      ? this.loggedUserForm()
      : this.notLoggedUserForm();
  }

  loggedUserForm() {
    return (
      <fragment>
        <textarea
          placeholder="댓글을 남겨주세요."
          class="comment-form__textarea"
          type="text"
        ></textarea>
        <input class="comment-form__btn" type="submit" value="등록" />
      </fragment>
    );
  }

  notLoggedUserForm() {
    return (
      <textarea
        readonly
        placeholder="먼저 로그인 해주세요."
        class="comment-form__textarea"
        type="text"
      ></textarea>
    );
  }
}
