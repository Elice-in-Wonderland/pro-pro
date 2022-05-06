import CustomComponent from '../CustomComponent';
import viewImage from '../../assets/icons/view.svg';
import bookmarkImage from '../../assets/icons/bookmark.svg';
import bookmarkFilledImage from '../../assets/icons/bookmark_filled.svg';
import PostBanner from '../PostBanner/PostBanner';
import '../MainCard/MainCard.scss';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';
import Toast from '../Toast/Toast';
import { shortSido } from '../../library/MainPage/index';
import { createDom, replaceElement } from '../../utils/dom';

export default class MainCard extends CustomComponent {
  init() {
    console.log('card');
    console.log(this.props);
    this.state = {
      type: this.props.type,
      post: this.props.post,
      postList: this.props.postList,
      updateCards: this.props.updateCards,
    };
  }

  makeSido(address) {
    if (address.split(' ')[0] === '온라인') {
      return '온라인';
    } else if (address.split(' ')[0] === '세종특별자치시') {
      return `${shortSido[address.split(' ')[0]]}`;
    } else if (address.split(' ')[0] === '제주특별자치도') {
      return `${shortSido[address.split(' ')[0]]} ${
        this.state.post.address.split(' ')[1]
      }`;
    }
    return `${address.split(' ')[0]} ${this.state.post.address.split(' ')[1]}`;
  }

  markup() {
    return `
    <div class="card-wrap">
        <div class="image"></div>
        <div class="card-body">
            <div class="card-title">${this.state.post.title}</div>
            <div class="card-info-wrapper">
                <div class="card-info">
                    <div class="card-info-detail">
                        <div class="text">${this.makeSido(
                          this.state.post.address,
                        )}</div>
                    </div>
                    <div class="card-info-detail">
                        <div class="text">${this.state.post.capacity}명</div>
                    </div>
                </div>
                <div class="card-info-number">
                    <div class="card-info-number-detail">
                        <img src="${viewImage}" aria-label="조회수"/>
                        <div>${this.state.post.views}</div>
                    </div>
                    <div class="card-info-number-detail">
                        <button type="button" class="bookmark-btn" aria-label="북마크">
                          <img src="${bookmarkImage}" aria-label="북마크"/>
                        </button>
                        <div>${this.state.post.marks}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  }

  setEvent() {
    const images = this.container.querySelector('.image');
    const cardWrap = this.container.querySelector('.card-wrap');
    const bookmarkBtn = this.container.querySelector('.bookmark-btn');
    const bookmark =
      this.container.querySelector('.bookmark-btn').childNodes[1];
    const div = createDom('div', {
      className: `banner ${this.state.post.stacks[0]}`,
    });

    new PostBanner({
      container: div,
      props: { stacks: this.state.post.stacks },
    });

    replaceElement(images, div);
    // const bookmarkPost = () => {
    //   for (let i = 0; i < this.state.postList.length; i += 1) {
    //     // 이미 북마크한 포스트의 북마크 버튼을 누른 경우 북마크를 해제한다.
    //     if (this.state.post._id === this.state.postList[i]._id) {
    //       axiosInstance.delete(`/users/mark/${this.state.post._id}`, {
    //         withCredentials: true,
    //       });
    //       break;
    //     }
    //   }
    //   this.state.updateCards();
    //   new Toast({
    //     timeout: 2100,
    //     content: '북마크가 해제되었습니다',
    //     type: 'success',
    //   });
    // };
    cardWrap.addEventListener('click', event => {
      if (event.target !== bookmark) {
        RouterContext.state.push(`/detail/${this.state.post._id}`);
      }
      if (this.state.type === 'bookmark') {
        this.state.updateCards();
      }
    });
    if (this.state.type === 'bookmark') {
      bookmark.src = bookmarkFilledImage;
      // bookmarkBtn.addEventListener('click', () => {
      //   bookmarkPost();
      // });
    } else {
      bookmarkBtn.className = 'bookmark-btn-main';
    }
  }
}
