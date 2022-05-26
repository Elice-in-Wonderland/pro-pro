import Component from '../Component';

export default class Link extends Component {
  markup() {
    return (
      <a href={this.props.href} class={this.props.className}>
        {this.props.text}
      </a>
    );
  }
}
