import { config } from './package';
import jsdom from 'jsdom';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

chai.use(sinonChai);
chai.use(sinonChai);
chai.use(chaiEnzyme());
chai.should();
global.expect = chai.expect;
global.sinon = sinon.sandbox.create();
cssModulesCompile();
global.document = doc;
global.window = win;
global.log = console.log;
Object.keys(window).forEach((key) => {
	if (!(key in global)) {
		global[key] = window[key];
	}
}
);

// afterEach('setup: restore sinon mocks', () => global.sinon.restore());
global.testAsyncExpectations = (done, testExpectations) => {
	setTimeout(() => {
		testExpectations();
		done();
	}, 0);
};

function cssModulesCompile() {

	let hook = require('css-modules-require-hook');
	let sass = require('node-sass');
	let {resolve} = require('path');

	hook({
		generateScopedName: config.cssModulePattern,
		extensions: ['.scss', 'css'],
		preprocessCss: (css, filepath) => {
			var result = sass.renderSync({
				data: css,
				includePaths: [resolve(filepath, '..')]
			});

			return result.css;
		}
	});

}