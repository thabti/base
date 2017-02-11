import { mount } from 'enzyme';
import Example from '../index';
describe('<Example />', () => {

	it('Render Text', () => {
		const component = mount(<Example> Hello </Example>);
		expect(component.find('div')).to.have.text(' Hello ');
	});

});