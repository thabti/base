import { mount } from 'enzyme';
import Example from '../Example';
describe('<Example />', () => {

	it('Render Text', () => {
		const component = mount(<Example> Hello </Example>);
		expect(component.find('div')).to.have.text(' Hello ');
	});

});