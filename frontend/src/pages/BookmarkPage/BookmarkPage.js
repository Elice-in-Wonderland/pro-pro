import Component from '../../components/component';
import Card from '../../components/Card/Card';
import axios from 'axios';
import styles from './BookmarkPage.scss';

export default class BookmarkPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'bookmark-page-wrapper' });

    const data = async () => {
      try {
        return await axios
          .get('localhost:4000/users/mark?category=project&page=1&perPage=10', {
            params: {
              category: 'project',
              page: 1,
              perPage: 10,
            },
          })
          .then(res => {
            console.log(res);
          });
      } catch (error) {
        console.error(error);
      }
    };

    data();

    const objects = [
      {
        title: '자바스크립트 스터디',
        area: '서울',
        number: 5,
        view: 10,
        bookmark: 10,
      },
      {
        title: '스프링 스터디',
        area: '경기',
        number: 6,
        view: 12,
        bookmark: 14,
      },
      {
        title: '파이썬 스터디',
        area: '경기',
        number: 8,
        view: 12,
        bookmark: 20,
      },
    ];
    objects.map(object => {
      this.Card = new Card(object);
      this.$dom.appendChild(this.Card.$dom);
    });

    props.$app.appendChild(this.$dom);

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
      <div>내가 참여중인 프로젝트/스터디</div>
      <div class="Card"></div>
    `;
    this.replaceElement(this.$dom.querySelector('.Card'), this.Card.$dom);
  };
}
