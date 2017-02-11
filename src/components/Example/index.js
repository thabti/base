import { example } from './style.scss';
const Example = ({ data = {}, onClick}) => (<div onClick={onClick} className={example}>{JSON.stringify(data)}</div>);
export default Example;