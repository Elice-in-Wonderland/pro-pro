import Component from '../component';
import viewImage from '../../assets/icons/view.svg';
import bookmarkImage from '../../assets/icons/bookmark.svg';
import PostBanner from '../PostBanner/PostBanner';
import styles from './card.scss';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: props.post,
      postList: props.postList,
    };

    // 도시이름에서 앞 2글자만 표시
    if (this.state.post.sido.length > 3) {
      this.state.post.sido = this.state.post.sido.substr(0, 2);
    }

    this.$dom = this.createDom('div', {
      className: 'card-wrapper',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
    <div class="card-wrap">
        <div class="image"></div>
        <div class="card-body">
            <div class="card-title">${this.state.post.title}</div>
            <div class="card-info-wrapper">
                <div class="card-info">
                    <div class="card-info-detail">
                        <div class="text">${this.state.post.sido}</div>
                    </div>
                    <div class="card-info-detail">
                        <div class="text">${this.state.post.capacity}명</div>
                    </div>
                </div>
                <div class="card-info-number">
                    <div class="card-info-number-detail">
                        <img src="${viewImage}"/>
                        <div>${this.state.post.views}</div>
                    </div>
                    <div class="card-info-number-detail">
                        <button type="button" class="bookmark-btn">
                          <img src="${bookmarkImage}"/>
                        </button>
                        <div>${this.state.post.capacity}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  };

  addEvent = () => {
    const images = this.$dom.querySelector('.image');
    const cardWrap = this.$dom.querySelector('.card-wrap');

    cardWrap.addEventListener('click', () => {
      RouterContext.state.push(`/detail/${this.state.post._id}`);
    });

    this.replaceElement(
      images,
      new PostBanner({ stackList: this.state.post.stacks }).$dom,
    );

    const bookmarkBtn = this.$dom.querySelector('.bookmark-btn');

    const bookmarkPost = () => {
      let flag = true;
      for (let i = 0; i < this.state.postList.length; i++) {
        // 이미 북마크한 포스트의 북마크 버튼을 누른 경우 북마크를 해제한다.
        if (this.state.post._id === this.state.postList[i]._id) {
          axiosInstance.delete(`/users/mark/${this.state.post._id}`, {
            withCredentials: true,
          });
          alert('북마크가 해제되었습니다.');
          flag = false;
          break;
        }
      }
      // 아직 북마크하지 않았는데 포스트의 북마크 버튼을 누른 경우 북마크를 등록한다.
      if (flag) {
        axiosInstance.post(`/users/mark/${this.state.post._id}`, {
          withCredentials: true,
        });
        alert('북마크 되었습니다.');
      }
    };

    bookmarkBtn.addEventListener('click', () => {
      bookmarkPost();
    });
  };
}
