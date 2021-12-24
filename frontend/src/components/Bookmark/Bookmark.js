import Component from '../component';
import './bookmark.scss';
import axiosInstance from '../../utils/api';

import markIcon from '../../assets/icons/mark.svg';
import filledMarkIcon from '../../assets/icons/bookmark_filled.svg';

export default class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'bookmarkWrapper',
    });
    this.state = {
      marks: props.marks,
      postId: props.postId,
      userType: props.userType,
    };
    this.render();
    if (
      this.state.userType === 'loggedUser' ||
      this.state.userType === 'author'
    ) {
      this.addEvent();
    }
  }

  render = () => {
    this.$dom.innerHTML = `                
    <img class="bookmark" src='${markIcon}' />
    <span class="bookmarkCount">${this.state.marks}</span>`;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', this.postBookmarkHandler);
  };

  postBookmarkHandler = () => {
    axiosInstance
      .post(`users/mark/${this.state.postId}`, {}, { withCredentials: true })
      .then(res => {
        const currentCount =
          this.$dom.querySelector('.bookmarkCount').innerHTML;
        this.$dom.querySelector('.bookmarkCount').innerHTML =
          Number(currentCount) + 1;
      })
      .catch(err => this.deleteBookmarkHandler());
  };

  deleteBookmarkHandler = () => {
    axiosInstance
      .delete(`users/mark/${this.state.postId}`, {
        withCredentials: true,
      })
      .then(res => {
        const currentCount =
          this.$dom.querySelector('.bookmarkCount').innerHTML;
        this.$dom.querySelector('.bookmarkCount').innerHTML =
          Number(currentCount) - 1;
      });
  };
}
