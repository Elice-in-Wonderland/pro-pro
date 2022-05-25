import CustomComponent from '../CustomComponent';
import searchIcon from '../../assets/icons/search-icon.svg';
import SkillStacksFilter from '../SkillStacksFilter/SkillStacksFilter';
import {
  availFilter,
  populateSort,
  recentSort,
  toggleButton,
  debounce,
} from '../../utils/filter';
import {
  setPost,
  setSort,
  setBasis,
  setFilter,
  store,
} from '../../store/reducer';
import './MainFilter.scss';

export default class MainFilterBar extends CustomComponent {
  skillStackRender() {
    const skillsBar = this.container.querySelector('.main__filter-skills');
    new SkillStacksFilter({ container: skillsBar });
  }

  skillStackActive() {
    const skillIcon = this.container.querySelector('.skill__icon');

    store.getState().filterStacks.forEach(stack => {
      skillIcon.childNodes.forEach(icon => {
        if (icon.id === stack) {
          icon.classList.add('activateBtn');
        }
      });
    });
  }

  sortBtnActive() {
    const recent = this.container.querySelector('.main__filter-recent');
    const populate = this.container.querySelector('.main__filter-populate');
    const { sortStandard } = store.getState();
    if (sortStandard === recentSort) {
      toggleButton(recent, populate);
      return;
    }
    toggleButton(populate, recent);
  }

  availEntireBtnActive() {
    const avail = this.container.querySelector('.main__filter-avail');
    const entirePost = this.container.querySelector('.main__filter-entire');
    const { basisData, totalData } = store.getState();
    if (basisData === totalData || !totalData.length) {
      toggleButton(entirePost, avail);
      return;
    }
    toggleButton(avail, entirePost);
  }

  markup() {
    return (
      <div>
        <section class="main__filter-skills"></section>
        <section class="main__filter-btn">
          <article class="main__filter-sort">
            <button type="button" class="main__filter-recent">
              최신순
            </button>
            <button type="button" class="main__filter-populate">
              인기순
            </button>
          </article>

          <div class="main__search">
            <input aria-label="검색" type="text" class="main__search-input" />
            <img src={searchIcon} alt="search image" class="main__search-btn" />
          </div>
          <article class="main__filter-basis">
            <button type="button" class="main__filter-entire activated">
              전체 글
            </button>
            <button type="button" class="main__filter-avail">
              모집중인 글
            </button>
          </article>
        </section>
      </div>
    );
  }

  renderCallback() {
    this.skillStackRender();
    this.skillStackActive();
    this.sortBtnActive();
    this.availEntireBtnActive();
  }

  setEvent() {
    const skillIcon = this.container.querySelector('.skill__icon');
    const avail = this.container.querySelector('.main__filter-avail');
    const entirePost = this.container.querySelector('.main__filter-entire');
    const recent = this.container.querySelector('.main__filter-recent');
    const populate = this.container.querySelector('.main__filter-populate');
    const searchInput = this.container.querySelector('.main__search-input');
    const searchBtn = this.container.querySelector('.main__search-btn');

    const skillStackFilter = () => {
      if (store.getState().filterStacks) {
        const stateList = store
          .getState()
          .basisData.filter(el =>
            store
              .getState()
              .filterStacks.every(post => el.stacks.includes(post)),
          );

        store.dispatch(setPost(store.getState().sortStandard(stateList)));
      }
    };

    const removeSkillStackFilter = () => {
      store.dispatch(setFilter([]));
    };

    skillIcon.addEventListener('click', e => {
      if (e.target?.nodeName !== 'IMG') return;
      const filterStack = store.getState().filterStacks;

      if (filterStack.includes(e.target.id)) {
        store
          .getState()
          .filterStacks.splice(filterStack.indexOf(e.target.id), 1);
        e.target.classList.remove('activateBtn');
        skillStackFilter();
        return;
      }
      const eventTarget = e.target.id;
      const skillStacks = [eventTarget, ...filterStack];
      store.dispatch(setFilter(skillStacks));
      e.target.classList.add('activateBtn');
      skillStackFilter();
    });

    populate.addEventListener('click', () => {
      store.dispatch(setSort(populateSort));
      store.dispatch(setPost(populateSort([...store.getState().post])));
    });

    recent.addEventListener('click', () => {
      store.dispatch(setSort(recentSort));
      store.dispatch(setPost(recentSort([...store.getState().post])));
    });

    entirePost.addEventListener('click', () => {
      toggleButton(entirePost, avail);
      store.dispatch(setBasis(store.getState().totalData));
      store.dispatch(
        setPost(store.getState().sortStandard(store.getState().totalData)),
      );
      skillStackFilter();
    });

    avail.addEventListener('click', () => {
      toggleButton(avail, entirePost);
      store.dispatch(setBasis(availFilter(store.getState().totalData)));
      store.dispatch(
        setPost(
          store.getState().sortStandard(availFilter(store.getState().post)),
        ),
      );
      skillStackFilter();
    });

    const searchEventHandler = () => {
      removeSkillStackFilter();

      if (!searchInput.value) {
        return;
      }
      const searchList = store.getState().basisData.filter(character => {
        return character.title.includes(searchInput.value);
      });
      if (searchList.length === 0) {
        store.dispatch(setPost([]));
        searchInput.value = null;
        return;
      }
      store.dispatch(setPost(searchList));
      searchInput.value = null;
    };

    searchBtn.addEventListener(
      'click',
      debounce(() => {
        searchEventHandler();
      }),
    );

    searchInput.addEventListener(
      'keydown',
      debounce(e => {
        if (e.key === 'Enter') {
          searchEventHandler();
        }
      }),
    );
  }
}
