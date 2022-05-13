import CustomComponent from '../../components/CustomComponent';
import './detailPage.scss';
import viewIcon from '../../assets/icons/view.svg';

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
      replyId: null,
    };
  }

  renderCallback() {
    if (!this.state.isLoading) {
      this.makeComponent();
      this.replaceDOM();
      this.getMapImg();
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
        isMyBookmark,
        replyId,
      },
    } = this;

    this.stacks = new Stacks({
      container: createDom('ul', {
        className: 'detail__stack-list',
      }),
      props: { stacks },
    });

    this.postBanner = new PostBanner({
      container: createDom('div', {
        className: `banner banner--${stacks[0]}`,
      }),
      props: { stacks },
    });

    if (userType === 'author') {
      this.editButtons = new EditButtons({
        container: createDom('form', {
          className: 'edit-form',
        }),
      });
    }

    this.bookmark = new Bookmark({
      container: createDom('div', {
        className: 'bookmark-wrapper',
      }),
      props: { isMyBookmark, marks },
    });

    this.comments = new Comments({
      container: createDom('div', {
        className: 'comments',
      }),
      props: { comments, userType, userId, replyId },
    });
    this.commentForm = new CommentForm({
      container: createDom('form', {
        className: 'comment-form comment-form--default',
        type: 'comment',
      }),
      props: { userType },
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
      <div
        class="detail"
        onClick={this.clickHandler.bind(this)}
        onSubmit={this.submitHandler.bind(this)}
      >
        <h2 class="detail__title">{title}</h2>
        <div class="detail__user-wrapper">
          <img src={imageURL} width="30px" height="30px" />
          <h4 class="detail__user-name">{nickname}</h4>
        </div>
        <div class="detail__stacks">
          <h4 class="detail__stacks-title">기술스택</h4>
          <ul class="detail__stacks-replace"></ul>
        </div>
        <main class="detail__hero">
          <div class="detail__banner"></div>
          <div class="detail__infos">
            <ul>
              <li class="detail__info">
                <div class="detail__region">지역</div>
                <div class="detail__region-description">
                  {address || '온라인'}
                </div>
              </li>
              <li class="detail__info">
                <div class="detail__capacity">모집 인원</div>
                <div class="detail__capacity-description">{capacity}명</div>
              </li>
              <li class="detail__info">
                <div class="detail__register">모집 기간</div>
                <div class="detail__register-description">
                  {updatedAt.slice(0, 10)} ~ {registerDeadline.slice(0, 10)}
                </div>
              </li>
              <li class="detail__info">
                <div class="detail__period">프로젝트 수행 기간</div>
                <div class="detail__period-description">
                  {startDate.slice(0, 10)} ~ {endDate.slice(0, 10)}
                </div>
              </li>
              <li class="detail__info">
                <div class="detail__view-wrapper">
                  <img class="detail__view-image" src={viewIcon} />
                  <span class="detail__view-count">{views}</span>
                </div>
                <div class="detail__bookmark-wrapper"></div>
              </li>
            </ul>
          </div>
        </main>
        <div class="detail__description-wrapper">
          <h3>프로젝트 소개</h3>
          <p class="detail__post-description">{content}</p>
        </div>
        <div class="detail__map-wrapper">
          <h3>팀 미팅 지역</h3>
          <h4 class="detail__map-description">{address || '온라인'}</h4>
          <div id="map"></div>
        </div>
        <div class="detail__comment-section">
          <h3>댓글</h3>
          <div class="detail__comments"></div>
          <div class="detail__comment-form detail__comment-form--default"></div>
        </div>
        <div class="detail__edit-section"></div>
      </div>
    );
  }

  replaceDOM() {
    replaceElement(
      this.container.querySelector('.detail__stacks-replace'),
      this.stacks.container,
    );
    replaceElement(
      this.container.querySelector('.detail__banner'),
      this.postBanner.container,
    );
    replaceElement(
      this.container.querySelector('.detail__comments'),
      this.comments.container,
    );
    replaceElement(
      this.container.querySelector('.detail__comment-form--default'),
      this.commentForm.container,
    );
    replaceElement(
      this.container.querySelector('.detail__bookmark-wrapper'),
      this.bookmark.container,
    );
    if (this.editButtons) {
      replaceElement(
        this.container.querySelector('.detail__edit-section'),
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

  clickHandler({ target }) {
    if (target.classList.contains('bookmark')) {
      const { userType, isMyBookmark } = this.state;
      if (userType === 'loggedUser' || userType === 'author')
        return isMyBookmark ? this.deleteBookmark() : this.addBookmark();
      else new Toast({ content: '로그인 먼저 해주세요.', type: 'fail' });
    }

    if (target.classList.contains('comment__delete'))
      this.deleteComment(target);

    if (target.classList.contains('comment__reply'))
      this.createReplyForm(target);
  }

  submitHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains('comment-form')) this.addComment(event);
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

  createReplyForm = target => {
    const targetComment = target.parentNode.parentNode;
    const { replyId } = this.state;
    const { id } = targetComment.dataset;
    this.setState({
      ...this.state,
      replyId: id === replyId ? null : id,
    });
  };

  deleteComment = target => {
    const targetComment = target.parentNode.parentNode;
    const { id, parent } = targetComment.dataset;
    axiosInstance.delete(`comments/${id}`, {
      withCredentials: true,
    });
    if (parent === 'post') {
      this.setState({
        ...this.state,
        comments: [
          ...this.state.comments.filter(comment => comment._id !== id),
        ],
      });
    } else if (parent === 'comment') {
      const { parentId } = targetComment.dataset;
      const changedComment = this.state.comments.find(
        comment => comment._id === parentId,
      );
      changedComment.nestedComments = changedComment.nestedComments.filter(
        nestedComment => nestedComment._id !== id,
      );

      this.setState({
        ...this.state,
        comments: [
          ...this.state.comments.map(comment =>
            comment._id === parentId ? changedComment : comment,
          ),
        ],
      });
    }
  };

  addComment = event => {
    const {
      type,
      firstChild: { value },
      parentNode: {
        dataset: { id },
      },
    } = event.target;
    const { imageURL, nickname, _id } = userState.myInfo;

    if (type === 'comment') {
      const { postId } = this.state;
      axiosInstance.post(
        'comments',
        {
          content: value,
          parentType: 'post',
          parentId: postId,
        },
        { withCredentials: true },
      );
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
            _id: value,
            parentId: postId,
            content: value,
            userId: _id,
            parentType: 'post',
          },
        ],
      });
    } else if (type === 'reply') {
      axiosInstance.post(
        'comments',
        {
          content: value,
          parentType: 'comment',
          parentId: id,
        },
        { withCredentials: true },
      );

      const changedComment = this.state.comments.find(
        comment => comment._id === id,
      );
      changedComment.nestedComments = [
        ...changedComment.nestedComments,
        {
          author: {
            imageURL,
            nickname,
          },
          updatedAt: '지금',
          _id: value,
          parentId: id,
          content: value,
          userId: _id,
          parentType: 'comment',
        },
      ];
      this.setState({
        ...this.state,
        comments: [
          ...this.state.comments.map(comment =>
            comment._id === id ? changedComment : comment,
          ),
        ],
        replyId: null,
      });
    }
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
