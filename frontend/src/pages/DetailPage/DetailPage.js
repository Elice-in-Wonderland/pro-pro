import Component from '../../components/component';
import styles from './detailPage.scss';
import viewIcon from '../../assets/icons/view.svg';
import markIcon from '../../assets/icons/mark.svg';
import javascriptLogo from '../../assets/icons/javascript.svg';

// 컴포넌트 import
import stacks from '../../components/Stacks/Stacks';
import comments from '../../components/Comments/Comments';
// get api import
import axios from 'axios';

const baseURL = 'http://localhost:4000';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('article', {
      className: 'detailContainer',
    });
    // 라우팅 연결
    props.appendchild(this.$dom);

    // 게시글 정보 GET
    // 라우터 구현시, 예시 postId 교체
    axios.get(baseURL + '/posts' + '/61bca3f4014bc4fbc0a84c0f').then(res => {
      this.state = res.data.data;

      // 컴포넌트 생성
      this.stacks = new stacks({
        stackList: this.state.stacks,
      });

      this.comments = new comments({
        commentList: this.state.comments,
      });

      this.render();
      this.addEvent();
    });
  }

  setState = nextState => {
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <h2 class="detailTitle">${this.state.title}</h2>
      <div class="userWrapper">
        <img src=${this.state.author.imageURL} width="30px" height="30px" />
        <h4 class="userName">${this.state.author.nickname}</h4>
      </div>
      <div class="stacks">기술스택
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
              <div class="region__description">${
                this.state.address ? this.state.address : '온라인'
              }</div>
            </li>
            <li class="info">
              <div class="capacity">모집 인원</div>
              <div class="capacity__description">${this.state.capacity}명</div>
            </li>
            <li class="info">
              <div class="register">모집 기간</div>
              <div class="registerDescription">${this.state.startDate.slice(
                0,
                10,
              )} ~ ${this.state.endDate.slice(0, 10)}</div>
            </li>
            <li class="info">
              <div class="period">프로젝트 수행 기간</div>
              <div class="periodDescription">${this.state.updatedAt.slice(
                0,
                10,
              )} ~ ${this.state.registerDeadline.slice(0, 10)}</div>
            </li>
            <li class="info">
              <div class="viewWrapper">
                <img class="view" src='${viewIcon}' />
                <span class="viewCount">${this.state.views}</span>
              </div>
              <div class="bookmarkWrapper">
                <img class="bookmark" src='${markIcon}' />
                <span class="bookmarkCount">${this.state.marks}</span>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <div class="descriptionWrapper">
      <h3>프로젝트 소개</h3>
      <p class="postDescription" >${this.state.content}</p>
      </div>
      <hr>
      <div class="mapWarpper">
        <h3>팀 미팅 지역</h3>
        <h4 class="mapDescription">${
          this.state.address ? this.state.address : '온라인'
        }</h3>
        <img class="mapImg" />
      </div>
      <div class="commentSection">
        <hr />
        <div class="comments"></div>
        <form action="${baseURL}/comments" class="commentForm" method="POST">
          <textarea placeholder="댓글을 남겨주세요." class="writeComment" type="text" ></textarea>
          <input class="submitComment" type="submit" value="등록" />
        </form>
      </div>
    `;

    // 만든 컴포턴트들을 기존 노드와 교체.
    this.replaceElement(
      this.$dom.querySelector('.stacksReplace'),
      this.stacks.$dom,
    );
    this.replaceElement(
      this.$dom.querySelector('.comments'),
      this.comments.$dom,
    );
  };

  addEvent = () => {
    document.querySelector('.commentForm').addEventListener('submit', event => {
      event.preventDefault();
      const commentContent = document.querySelector('.writeComment').value;
    });
  };
}
