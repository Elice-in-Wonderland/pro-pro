import Component from '../../components/Component';
import img404 from '../../assets/images/img-404.svg';
import './notFoundPage.scss';

// TODO: 리팩토링 및 개선점 찾아보기
export default class NotFoundPage extends Component {
  markup() {
    return (
      <div class="wrapper-notfound">
        <div class="notfound">
          <img src={img404} alt="search image" class="img404" />
          <p>
            죄송합니다.
            <br />
            요청하신 페이지를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }
}
