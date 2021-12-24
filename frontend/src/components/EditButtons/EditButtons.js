import Component from '../component';
import './editButtons.scss';

export default class EditButtons extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.$dom = this.createDom('form', {
      className: 'editBtns',
    });
    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
    <input class="editBtn" type="submit" value="수정" />
    <input class="deleteBtn" type="submit" value="삭제" />
    `;
  };
}
