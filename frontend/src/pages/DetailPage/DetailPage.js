import CustomComponent from '../../components/CustomComponent';
import './detailPage.scss';
import viewIcon from '../../assets/icons/view.svg';
import javascriptLogo from '../../assets/icons/javascript.svg';

import Stacks from '../../components/Stacks/Stacks';
import Comments from '../../components/Comments/Comments';
import CommentForm from '../../components/CommentForm/CommentForm';
import PostBanner from '../../components/PostBanner/PostBanner';
import EditButtons from '../../components/EditButtons/EditButtons';

import RouterContext from '../../router/RouterContext';
import Loading from '../../components/Loading/Loading';
import axiosInstance from '../../utils/api';
import Bookmark from '../../components/Bookmark/Bookmark';
import { state as userState } from '../../utils/store';
import { createMap } from '../../utils/common';
import { createDom, appendRoot, replaceElement } from '../../utils/dom';

export default class DetailPage extends CustomComponent {
  init() {
    this.state = {
      userType: null,
      userId: userState.myInfo ? userState.myInfo._id : null,
      postId: RouterContext.state.params.postId,
      comments: [],
    };
    this.$dom = createDom('article', {
      className: 'detailContainer',
    });
    appendRoot(this.container, this.$dom);
  }

  renderCallback() {
    if (this.state.userType) {
      this.makeComponent();
      this.replaceDOM();
    }
  }

  mounted() {
    this.getPostInfo();
  }

  getPostInfo() {
    axiosInstance
      .get(`/posts/${this.state.postId}`)
      .then(res => {
        return res.data.data;
      })
      .then(postInfo => {
        this.setState({
          ...this.state,
          ...postInfo,
          userType: this.findUserType(postInfo.author._id),
        });
      });
  }

  makeComponent() {
    const {
      state: {
        stacks,
        marks,
        userType,
        comments,
        userId,
        postId,
        isMyBookmark,
      },
    } = this;

    this.stacks = new Stacks({
      stacks,
    });

    this.postBanner = new PostBanner({
      stackList: stacks,
    });

    if (userType === 'author') {
      this.editButtons = new EditButtons({
        postId,
      });
    }

    this.bookmark = new Bookmark({
      marks,
      postId,
      userType,
      isMyBookmark,
    });

    this.comments = new Comments({
      commentList: comments,
      userType,
      userId,
    });

    this.commentForm = new CommentForm({
      userType,
      parentType: 'post',
      parentId: postId,
      userId,
    });
  }

  markup() {
    if (!this.state.userType) {
      return Loading;
    }
    const {
      author: { imageURL, nickname },
      title,
      address,
      capacity,
      startDate,
      endDate,
      updatedAt,
      registerDeadline,
      views,
      content,
    } = this.state;

    return `
    <div class="detailContainer">
      <h2 class="detailTitle">${title}</h2>
      <div class="userWrapper">
        <img src=${imageURL} width="30px" height="30px" />
        <h4 class="userName">${nickname}</h4>
      </div>
      <div class="stacks">
        <h4 class="stacksTitle">기술스택<h4>
        <ul class="stacksReplace">
        </ul>
      </div>
      <main class="hero">
        <div class="banner">
          <img class="bannerLogo" src='${javascriptLogo}' alt="javascript" />
        </div>
        <div class="infos">
          <ul>
            <li class="info">
              <div class="region">지역</div>
              <div class="region__description">${address || '온라인'}</div>
            </li>
            <li class="info">
              <div class="capacity">모집 인원</div>
              <div class="capacity__description">${capacity}명</div>
            </li>
            <li class="info">
              <div class="register">모집 기간</div>
              <div class="registerDescription">${updatedAt.slice(
                0,
                10,
              )} ~ ${registerDeadline.slice(0, 10)}</div>
            </li>
            <li class="info">
              <div class="period">프로젝트 수행 기간</div>
              <div class="periodDescription">${startDate.slice(
                0,
                10,
              )} ~ ${endDate.slice(0, 10)}</div>
            </li>
            <li class="info">
              <div class="viewWrapper">
                <img class="view" src='${viewIcon}' />
                <span class="viewCount">${views}</span>
              </div>
              <div class="bookmarkWrapper"></div>
            </li>
          </ul>
        </div>
      </main>
      <div class="descriptionWrapper">
      <h3>프로젝트 소개</h3>
      <p class="postDescription" >${content}</p>
      </div>
      <hr>
      <div class="mapWarpper">
        <h3>팀 미팅 지역</h3>
        <h4 class="mapDescription">${address || '온라인'}</h3>
        <div id="map"></div>
      </div>
      <div class="commentSection">
        <hr />
        <div class="comments"></div>
        <div class="commentForm"></div>
      </div>
      <div class="editSection"></div>
    </div>
    `;
  }

  replaceDOM() {
    this.getMapImg();
    replaceElement(
      this.container.querySelector('.stacksReplace'),
      this.stacks.$dom,
    );
    replaceElement(
      this.container.querySelector('.banner'),
      this.postBanner.$dom,
    );
    replaceElement(
      this.container.querySelector('.comments'),
      this.comments.$dom,
    );
    replaceElement(
      this.container.querySelector('.commentForm'),
      this.commentForm.$dom,
    );
    replaceElement(
      this.container.querySelector('.bookmarkWrapper'),
      this.bookmark.$dom,
    );
    if (this.editButtons) {
      replaceElement(
        this.container.querySelector('.editSection'),
        this.editButtons.$dom,
      );
    }
    console.log(this.state);
  }

  getMapImg() {
    const { coordinates } = this.state.location;
    const mapContainer = document.getElementById('map');
    if (coordinates[0] === null) {
      mapContainer.parentNode.removeChild(mapContainer);
    } else {
      createMap(mapContainer, coordinates);
    }
  }

  findUserType(postUserId) {
    if (userState.myInfo === undefined) {
      return 'notLoggedUser';
    }
    if (userState.myInfo._id === postUserId) {
      return 'author';
    }
    return 'loggedUser';
  }
}
