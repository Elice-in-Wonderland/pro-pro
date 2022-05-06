import CustomComponent from '../../components/CustomComponent';
import './detailPage.scss';
import viewIcon from '../../assets/icons/view.svg';
import javascriptLogo from '../../assets/icons/javascript.svg';

import Stacks from '../../components/Stacks/Stacks';
import Comments from '../../components/Comments/Comments';
import CommentForm from '../../components/CommentForm/CommentForm';
import PostBanner from '../../components/PostBanner/PostBanner';
import EditButtons from '../../components/EditButtons/EditButtons';
import Bookmark from '../../components/Bookmark/Bookmark';

import RouterContext from '../../router/RouterContext';
import Loading from '../../components/Loading/Loading';
import axiosInstance from '../../utils/api';
import { state as userState } from '../../utils/store';
import { createMap } from '../../utils/common';
import { createDom, replaceElement } from '../../utils/dom';
import Toast from '../../components/Toast/Toast';

export default class DetailPage extends CustomComponent {
  init() {
    this.state = {
      isLoading: true,
      userType: null,
      userId: userState.myInfo ? userState.myInfo._id : null,
      postId: RouterContext.state.params.postId,
      comments: [],
    };
  }

  renderCallback() {
    if (!this.state.isLoading) {
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
          isLoading: false,
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
      container: createDom('ul', {
        className: 'stackList',
      }),
      props: { stacks },
    });

    this.postBanner = new PostBanner({
      container: createDom('div', {
        className: `banner ${stacks[0]}`,
      }),
      props: { stacks },
    });

    if (userType === 'author') {
      this.editButtons = new EditButtons({
        container: createDom('form', {
          className: 'editBtns',
        }),
      });
    }

    this.bookmark = new Bookmark({
      container: createDom('div', {
        className: 'bookmarkWrapper',
      }),
      props: { isMyBookmark, marks },
    });

    this.comments = new Comments({
      container: createDom('div', {
        className: 'comments',
      }),
      props: { comments, userType, userId },
    });
    this.commentForm = new CommentForm({
      container: createDom('form', {
        className: 'commentForm',
      }),
      props: { userType, parentType: 'post', parentId: postId, userId },
    });
  }

  markup() {
    if (this.state.isLoading) return Loading();
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

    return (
      <div class="detailContainer">
        <h2 class="detailTitle">{title}</h2>
        <div class="userWrapper">
          <img src={imageURL} width="30px" height="30px" />
          <h4 class="userName">{nickname}</h4>
        </div>
        <div class="stacks">
          <h4 class="stacksTitle">기술스택</h4>
          <ul class="stacksReplace"></ul>
        </div>
        <main class="hero">
          <div class="banner">
            <img class="bannerLogo" src={javascriptLogo} alt="javascript" />
          </div>
          <div class="infos">
            <ul>
              <li class="info">
                <div class="region">지역</div>
                <div class="region__description">{address || '온라인'}</div>
              </li>
              <li class="info">
                <div class="capacity">모집 인원</div>
                <div class="capacity__description">{capacity}명</div>
              </li>
              <li class="info">
                <div class="register">모집 기간</div>
                <div class="registerDescription">
                  {updatedAt.slice(0, 10)} ~ {registerDeadline.slice(0, 10)}
                </div>
              </li>
              <li class="info">
                <div class="period">프로젝트 수행 기간</div>
                <div class="periodDescription">
                  {startDate.slice(0, 10)} ~ {endDate.slice(0, 10)}
                </div>
              </li>
              <li class="info">
                <div class="viewWrapper">
                  <img class="view" src={viewIcon} />
                  <span class="viewCount">{views}</span>
                </div>
                <div class="bookmarkWrapper"></div>
              </li>
            </ul>
          </div>
        </main>
        <div class="descriptionWrapper">
          <h3>프로젝트 소개</h3>
          <p class="postDescription">{content}</p>
        </div>
        <hr />
        <div class="mapWarpper">
          <h3>팀 미팅 지역</h3>
          <h4 class="mapDescription">{address || '온라인'}</h4>
          <div id="map"></div>
        </div>
        <div class="commentSection">
          <hr />
          <div class="comments"></div>
          <div class="commentForm"></div>
        </div>
        <div class="editSection"></div>
      </div>
    );
  }

  replaceDOM() {
    this.getMapImg();
    replaceElement(
      this.container.querySelector('.stacksReplace'),
      this.stacks.container,
    );
    replaceElement(
      this.container.querySelector('.banner'),
      this.postBanner.container,
    );
    replaceElement(
      this.container.querySelector('.comments'),
      this.comments.container,
    );
    replaceElement(
      this.container.querySelector('.commentForm'),
      this.commentForm.container,
    );
    replaceElement(
      this.container.querySelector('.bookmarkWrapper'),
      this.bookmark.container,
    );
    if (this.editButtons) {
      replaceElement(
        this.container.querySelector('.editSection'),
        this.editButtons.container,
      );
    }
  }

  getMapImg() {
    const { coordinates } = this.state.location;
    const mapContainer = document.getElementById('map');
    if (coordinates[0] === null)
      mapContainer.parentNode.removeChild(mapContainer);
    else createMap(mapContainer, coordinates);
  }

  setEvent() {
    this.container.addEventListener('click', ({ target }) => {
      if (target.classList.contains('bookmark')) {
        const { userType, isMyBookmark } = this.state;
        if (userType === 'loggedUser' || userType === 'author')
          return isMyBookmark ? this.deleteBookmark() : this.addBookmark();
        else new Toast({ content: '로그인 먼저 해주세요.', type: 'fail' });
      }

      if (target.classList.contains('commentDelete'))
        this.deleteComment(target);

      if (target.classList.contains('commentReply'))
        this.createCommentForm(target);
    });

    this.container.addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.classList.contains('commentForm')) this.addComment();
    });
  }

  deleteBookmark = async () => {
    const { marks, postId } = this.state;
    this.setState({
      ...this.state,
      marks: marks - 1,
      isMyBookmark: false,
    });
    await axiosInstance
      .delete(`users/mark/${postId}`, {
        withCredentials: true,
      })
      .then(() => {
        new Toast({ content: '북마크 해제 되었습니다.', type: 'success' });
      });
  };

  addBookmark = async () => {
    const { marks, postId } = this.state;
    this.setState({
      ...this.state,
      marks: marks + 1,
      isMyBookmark: true,
    });
    await axiosInstance
      .post(`users/mark/${postId}`, {}, { withCredentials: true })
      .then(() => {
        new Toast({ content: '북마크 되었습니다.', type: 'success' });
      });
  };

  // TODO: 답변 기능 추가
  // createCommentForm = target => {
  //   const targetComment = target.parentNode.parentNode;
  //   const { id } = targetComment.dataset;
  //   this.setState({
  //     ...this.state,
  //     replyComment: id,
  //   });
  // };

  // deleteCommentForm(event) {
  //   const replyBtn = event.target;
  //   const targetComment = replyBtn.parentNode.parentNode;
  //   const commentForm = targetComment.querySelector('.commentForm');
  //   replyBtn.removeEventListener('click', this.deleteCommentForm);
  //   replyBtn.addEventListener('click', this.createCommentForm);
  //   if (commentForm) commentForm.parentNode.removeChild(commentForm);
  //   else replyBtn.click();
  // }

  deleteComment = target => {
    const targetComment = target.parentNode.parentNode;
    const { id } = targetComment.dataset;
    axiosInstance.delete(`comments/${id}`, {
      withCredentials: true,
    });
    this.setState({
      ...this.state,
      comments: [...this.state.comments.filter(comment => comment._id !== id)],
    });
  };

  addComment = () => {
    const content = this.container.querySelector('.writeComment').value;
    const { postId } = this.state;
    this.container.querySelector('.writeComment').value = '';
    axiosInstance.post(
      'comments',
      {
        content,
        parentType: 'post',
        parentId: postId,
      },
      { withCredentials: true },
    );
    const { imageURL, nickname, _id } = userState.myInfo;
    this.setState({
      ...this.state,
      comments: [
        ...this.state.comments,
        {
          nestedComments: [],
          author: {
            imageURL,
            nickname,
          },
          updatedAt: '지금',
          _id: content,
          parentId: postId,
          content,
          userId: _id,
          parentType: 'post',
        },
      ],
    });
  };

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
