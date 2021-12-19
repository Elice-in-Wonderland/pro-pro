import Component from '../../components/component';
import styles from "./detailPage.scss"

// 컴포넌트 import
import stacks from "../../components/Stacks/Stacks";
import comments from "../../components/Comments/Comments";
// get api import

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('article', {
      className: "detailContainer"
    })
    props.$app.appendChild(this.$dom)

    // 게시글 정보 GET
    // 댓글 정보 GET
    
      // 임시 더미 데이터
    this._state = { 
      post : {
        title: "00 서비스 프로젝트",
        author: "홍길동",
        imageURL: "../../assets/icons/javascript.png",
        stacks: ["JavaScript", "HTML", "CSS", "NodeJS"],
        address: "서울 강동구",
        capacity: "5",
        startDate: "00-00-00", 
        endDate: "00-00-00", 
        registerDeadline: "00-00-00", 
        views: 5,
        bookmark: 5,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        dolor magni, sunt tempora, cum nihil unde maxime corrupti rem neque
        porro alias inventore aliquid natus officiis voluptates! Error,
        asperiores voluptate!`
    },
    comments : [
    {
      author: "동길홍",
      imageURL: "../../assets/icons/javascript.png",
      content: "저도 참여하고 싶습니다."
    },
    {
      author: "동길홍",
      imageURL: "../../assets/icons/javascript.png",
      content: "저도 참여하고 싶습니다."
    },
    {
      author: "동길홍",
      imageURL: "../../assets/icons/javascript.png",
      content: "저도 참여하고 싶습니다."
    },
  ]
  }

    // 컴포넌트 생성
    this.stacks = new stacks({
      stackList : this._state.post.stacks,
      type : "detail"
    })

    this.comments = new comments({
      commentList : this._state.comments,
    })

    this.render();
    this.addEvent();
  }

  setState = (nextState) => {
    this.render();
  };

  render = () => {
    this.$dom.innerHTML = `
      <h2 class="detailTitle">${this._state.post.title}</h2>
      <div class="userWrapper">
        <img src=${this._state.post.imageURL} width="30px" height="30px" />
        <h4 class="userName">${this._state.post.author}</h4>
      </div>
      <div class="stacks">기술스택
        <ul class="stacksReplace">
        </ul>
      </div>
      <main class="hero">
        <div class="banner">
          <img class="bannerLogo" src="" alt="" />
        </div>
        <div class="infos">
          <ul>
            <li class="info">
              <div class="region">지역</div>
              <div class="region__description">${this._state.post.address}</div>
            </li>
            <li class="info">
              <div class="capacity">모집 인원</div>
              <div class="capacity__description">${this._state.post.capacity}명</div>
            </li>
            <li class="info">
              <div class="register">모집 기간</div>
              <div class="registerDescription">${this._state.post.startDate} ~ ${this._state.post.endDate}</div>
            </li>
            <li class="info">
              <div class="period">프로젝트 수행 기간</div>
              <div class="periodDescription">${this._state.post.startDate} ~ ${this._state.post.registerDeadline}</div>
            </li>
            <li class="info">
              <div class="viewWrapper">
                <div class="view"> </div>
                <span class="viewDescription">${this._state.post.views}</span>
              </div>
              <div class="bookmarkWrapper">
                <div class="bookmark" ></div>
                <span class="bookmarkDescription">${this._state.post.bookmark}</span>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <div class="descriptionWrapper">
      <h3>프로젝트 소개</h3>
      <p>${this._state.post.content}</p>
      </div>
      <hr>
      <div class="mapWarpper">
        <h3>팀 미팅 지역</h3>
        <h4 class="mapDescription">${this._state.post.address}</h3>
        <img class="mapImg" />
      </div>
      <div class="commentSection">
        <hr />
        <ul class="comments"></ul>
        <form action="POST">
          <input type="text" />
          <input type="button" value="등록" />
        </form>
      </div>
    `;

    // 만든 컴포턴트들을 기존 노드와 교체.
      this.replaceElement(this.$dom.querySelector(".stacksReplace"), this.stacks.$dom)
      this.replaceElement(this.$dom.querySelector(".comments"), this.comments.$dom)
  };

}
