import CustomComponent from '../CustomComponent';

export default class Link extends CustomComponent {
  markup() {
    return (
      <a href={this.props.href} class={this.props.className}>
        {this.props.text}
      </a>
    );
  }
}
