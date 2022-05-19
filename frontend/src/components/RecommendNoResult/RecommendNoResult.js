import CustomComponent from '../CustomComponent';
import './recommendNoResult.scss';
import noResult from '../../assets/images/no-result-img.svg';

export default class RecommendNoResult extends CustomComponent {
  markup() {
    return (
      <div class="recommend-no-result">
        <div class="recommend-no-result__contents">
          <img src={noResult} alt="no result image" />
          <p>
            추천 결과가 없습니다.
            <br />
          </p>
          <p>
            혹시 프로필에서 지역과 관심 기술을 설정하지 않으셨다면, 지금
            해보시는게 어떠실까요? <br />
          </p>
        </div>
      </div>
    );
  }
}
