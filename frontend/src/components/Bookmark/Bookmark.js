import CustomComponent from '../CustomComponent';
import './bookmark.scss';

import markIcon from '../../assets/icons/bookmark.svg';
import filledMarkIcon from '../../assets/icons/bookmark_filled.svg';

export default class Bookmark extends CustomComponent {
  markup() {
    const { isMyBookmark, marks } = this.props;
    return (
      <fragment>
        <img class="bookmark" src={isMyBookmark ? filledMarkIcon : markIcon} />
        <span class="bookmark-count">{marks}</span>
      </fragment>
    );
  }
}
