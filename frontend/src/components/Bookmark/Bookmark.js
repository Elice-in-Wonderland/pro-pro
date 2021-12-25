import Component from '../component';
import './bookmark.scss';
import axiosInstance from '../../utils/api';

import markIcon from '../../assets/icons/bookmark.svg';
import filledMarkIcon from '../../assets/icons/bookmark_filled.svg';

import Toast from '../../components/Toast/Toast';

export default class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'bookmarkWrapper',
    });
    this.render();
    if (
      this.props.userType === 'loggedUser' ||
      this.props.userType === 'author'
    ) {
      this.addEvent();
    } else {
      this.$dom.addEventListener('click', this.notLoggedUserHandler);
    }
  }

  render = () => {
    this.$dom.innerHTML = `                
    <img class="bookmark" src='${
      this.props.isMyBookmark ? filledMarkIcon : markIcon
    }' />
    <span class="bookmarkCount">${this.props.marks}</span>`;
  };

  addEvent = () => {
    if (this.props.isMyBookmark) {
      this.$dom.addEventListener('click', this.deleteBookmarkHandler);
    } else {
      this.$dom.addEventListener('click', this.postBookmarkHandler);
    }
  };

  postBookmarkHandler = async event => {
    this.$dom.removeEventListener('click', this.postBookmarkHandler);
    const currentCount = this.$dom.querySelector('.bookmarkCount').innerHTML;
    this.$dom.querySelector('.bookmarkCount').innerHTML =
      Number(currentCount) + 1;
    const bookmarkIcon = this.$dom.querySelector('.bookmark');
    bookmarkIcon.setAttribute('src', filledMarkIcon);
    await axiosInstance
      .post(`users/mark/${this.props.postId}`, {}, { withCredentials: true })
      .then(res => {
        this.$dom.addEventListener('click', this.deleteBookmarkHandler);
        new Toast({ content: '북마크 되었습니다.', type: 'success' });
      });
  };

  deleteBookmarkHandler = async event => {
    this.$dom.removeEventListener('click', this.deleteBookmarkHandler);
    const currentCount = this.$dom.querySelector('.bookmarkCount').innerHTML;
    this.$dom.querySelector('.bookmarkCount').innerHTML =
      Number(currentCount) - 1;
    const bookmarkIcon = this.$dom.querySelector('.bookmark');
    bookmarkIcon.setAttribute('src', markIcon);
    await axiosInstance
      .delete(`users/mark/${this.props.postId}`, {
        withCredentials: true,
      })
      .then(res => {
        this.$dom.addEventListener('click', this.postBookmarkHandler);
        new Toast({ content: '북마크 해제 되었습니다.', type: 'success' });
      });
  };

  notLoggedUserHandler = () => {
    new Toast({ content: '로그인 먼저 해주세요.', type: 'fail' });
  };
}
