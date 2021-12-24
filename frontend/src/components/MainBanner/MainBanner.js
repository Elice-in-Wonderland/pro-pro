import Component from '../component';
import './mainBanner.scss';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('section', {
      className: 'home',
    });
    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
    <div class="banerContainer">
      <div class="banerWord">
        <h1 class="homeTitle">팀은 프로젝트보다 만들기 어렵습니다.</h1>
        <h2 class="homeDescription">
        팀빌딩은 저희에게 맡기고 오늘 해야할 코딩에 집중하세요!<br>
        당신과 가까운 지역에서 진행하는 프로젝트 및 스터디를 추천해드립니다.<br>
        빠르게 모여 멋진 프로젝트를 만들어보세요!<br>
        </h2>
        <h1 class="small-title">팀빌딩은 저희에게 맡기고<br>
        오늘 해야할 코딩에 집중하세요!</h1>
      </div>
    </div>
    `;
  };
}
