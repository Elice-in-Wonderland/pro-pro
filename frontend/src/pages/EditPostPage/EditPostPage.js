import axiosInstance from '@utils/api';
import Component from '@/components/Component';
import WebRequestController from '@/router/WebRequestController';

import Loading from '@/components/Loading/Loading';
import RouterContext from '@/router/RouterContext';
import WriteForm from '../../components/WriteForm/WriteForm';

export default class EditPostPage extends Component {
  init() {
    this.state = {
      isLoading: true,
    };
    this.region = {};
  }

  mounted() {
    this.getPostInfo();
  }

  async getPostInfo() {
    const { postId } = RouterContext.state.params;
    try {
      const {
        data: { data },
      } = await axiosInstance(`/posts/${postId}`, {
        signal: WebRequestController.getController()?.signal,
      });
      this.setState({
        ...this.state,
        isLoading: false,
        ...data,
      });
      this.region = {
        lat: data.location.coordinates[0],
        lng: data.location.coordinates[1],
        address: data.address,
        sido: data.sido,
      };
    } catch (e) {
      console.log('요청이 취소되었습니다.');
    }
  }

  renderCallback() {
    if (this.state.isLoading) return;
    const {
      category,
      address,
      registerDeadline,
      capacity,
      startDate,
      endDate,
      title,
      content,
      stacks,
    } = this.state;

    const container = this.container.querySelector('.write');
    new WriteForm({
      container,
      props: {
        category,
        address,
        registerDeadline,
        capacity,
        startDate,
        endDate,
        title,
        content,
        stacks,
        region: this.region,
        edit: true,
      },
    });
  }

  markup() {
    if (this.state.isLoading) return Loading();
    return <div class="write"></div>;
  }
}
