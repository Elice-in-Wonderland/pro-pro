import Component from "../component";
import styles from "./comments.scss";

export default class stacks extends Component {
    constructor(props){
        super(props)
        this.$dom = this.createDom('ul', {
            className: "comments",
        })
        this._state = {
            commentList : props.commentList,
        };
        this.render();
    }

    render = () => {
        this.$dom.innerHTML = this._state.commentList.map((item) => {
            return `
            <div class="userWrapper">
                <img src=${item.imageURL} width="30px" height="30px" />
                <h4 class="userName">${item.author}</h4>
            </div>
            <li class="comment">${item.content}</li>
            <hr>
            `
        })
        .join('');
    }
}