
'use strict';

import { assert } from 'chai';
import React, { Component, PropTypes } from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import { spy } from 'sinon';
import { Map } from 'immutable';

import ui, { reducer } from '../../src';
import { render, renderAndFind } from '../utils/render.js';

describe('Default UI state variables', () => {

	describe('HOC is passed props and state to calculate defaults', () => {
		// Set up closures which we can use to check that the uiState func is passed
		// expected props.
		let calcProps, calcState;

		class Test extends Component {
			render() { return <p>Hi</p>; }
		}
		const uiState = {
			calculated: (props, state) => {
				calcProps = props;
				calcState = state;
				return props.passedProp
			},
			isValid: true
		};
		const UITest = ui({ state: uiState })(Test);

		it('component gets given expected props', () => {
			const c = renderAndFind(<UITest passedProp='foo' />, Test);
			assert.equal(c.props.ui.calculated, 'foo');
			assert.equal(calcProps.passedProp, 'foo');
			assert.equal(typeof calcState.ui, typeof Map());
		});

	});

	describe('HOC can augment propTypes', () => {
		let Test;

		beforeEach(() => {
			spy(console, 'error');

			Test = class extends Component {
				render() { return <p>Oh hi {this.props.person}!</p>; }
			}

			Test.propTypes = {
				person: PropTypes.string.isRequired
			};

			const uiState = {
				foo: 'bar',
				obj: {
					baz: 'quuz'
				}
			};

			ui({ state: uiState })(Test);
		});

		afterEach(() => console.error.restore());

		it('does not throw with all required propTypes', () => {
			render(<Test person="Mark" updateUI={() => {}} ui={{ foo: 'bar', obj: { baz: 'quuz' } }} />);
			assert.equal(console.error.callCount, 0);
		});

		it('adds updateUI to propTypes', () => {
			render(<Test person="Mark" ui={{ foo: 'bar', obj: { baz: 'quuz' } }} />);
			assert.equal(console.error.callCount, 1);
		});

		it('merges existing propTypes', () => {
			render(<Test updateUI={() => {}} ui={{ foo: 'bar', obj: { baz: 'quuz' } }} />);
			assert.equal(console.error.callCount, 1);
		});

		it('adds propTypes recursively with state', () => {
			render(<Test person="Mark" updateUI={() => {}} ui={{ foo: 'bar', obj: { abc: 'def' } }} />);
			assert.equal(console.error.callCount, 1);
		});

	});

});

