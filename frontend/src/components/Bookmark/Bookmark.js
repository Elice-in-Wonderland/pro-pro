import Component from '../component';
import './bookmark.scss';
import axiosInstance from '../../utils/api';

import markIcon from '../../assets/icons/mark.svg';
import filledMarkIcon from '../../assets/icons/bookmark_filled.svg';
import { setState, removeState } from '../../utils/store';

export default class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'bookmarkWrapper',
    });

    this.state = {
      userType: props.userType,
      marks: props.marks,
      postId: props.postId,
      markedPosts: props.markedPosts,
    };
    // console.log(this.state);
    if (
      this.state.userType === 'loggedUser' ||
      this.state.userType === 'author'
    ) {
      this.addEvent();
    }

    // for (let markedPost of this.state.markedPosts) {
    //   // console.log(markedPost._id, this.state.postId);
    //   if (markedPost._id === this.state.postId) {
    //     this.flag = true;
    //     break;
    //   }
    // }
    // console.log(this.flag);
    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `                
    <img class="bookmark" src='${this.flag ? filledMarkIcon : markIcon}' />
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
