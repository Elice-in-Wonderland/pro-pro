import CustomComponent from '../CustomComponent';
import './searchNoResult.scss';
import noResult from '../../assets/images/no-result-img.svg';

export default class SearchNoResult extends CustomComponent {
  markup() {
    return (
      <div class="no-result">
        <img src={noResult} alt="no result image" class="no-result-img" />
        <p>
          검색 결과가 없습니다.
          <br />
        </p>
      </div>
    );
  }
}
