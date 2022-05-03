import CustomComponent from '../CustomComponent';
import './commentForm.scss';

export default class CommentForm extends CustomComponent {
  markup() {
    const { userType } = this.props;
    console.log(userType);
    return userType === 'loggedUser' || userType === 'author'
      ? this.loggedUserForm()
      : this.notLoggedUserForm();
  }

  loggedUserForm() {
    return `          
        <textarea placeholder="댓글을 남겨주세요." class="writeComment" type="text" ></textarea>
        <input class="submitComment" type="submit" value="등록" />
    `;
  }

  notLoggedUserForm() {
    return `          
        <textarea readonly placeholder="먼저 로그인 해주세요." class="writeComment" type="text" ></textarea>
    `;
  }
}
