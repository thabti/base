import { example } from './style.scss';
const Example = (props) => (<div onClick={props.onClick} className={example}>{props.children}</div>);
export default Example;