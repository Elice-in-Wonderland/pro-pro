import './bookmark.scss';

import { bookmark, bookmarkFilled } from '../../assets/icons';
import CustomComponent from '../CustomComponent';

export default class Bookmark extends CustomComponent {
  markup() {
    const { isMyBookmark, marks } = this.props;
    return (
      <fragment>
        <img class="bookmark" src={isMyBookmark ? bookmarkFilled : bookmark} />
        <span class="bookmark-count">{marks}</span>
      </fragment>
    );
  }
}
