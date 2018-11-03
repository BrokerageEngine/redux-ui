'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ui;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _invariant = _interopRequireDefault(require("invariant"));

var _shallowEqual = _interopRequireDefault(require("react-pure-render/shallowEqual"));

var _actionReducer = require("./action-reducer");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ui(key) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_typeof(key) === 'object') {
    opts = key;
    key = opts.key;
  }

  var connector = (0, _reactRedux.connect)(function (state) {
    return {
      ui: (0, _utils.getUIState)(state)
    };
  }, function (dispatch) {
    return (0, _redux.bindActionCreators)({
      updateUI: _actionReducer.updateUI,
      massUpdateUI: _actionReducer.massUpdateUI,
      setDefaultUI: _actionReducer.setDefaultUI,
      mountUI: _actionReducer.mountUI,
      unmountUI: _actionReducer.unmountUI
    }, dispatch);
  }, // These allow you to pass 'mergeProps' and 'options' keys into the
  // UI decorator's options which will be passed to @connect().
  // TODO: Document
  opts.mergeProps, opts.options);
  return function (WrappedComponent) {
    var _class, _temp;

    // Return a parent UI class which scopes all UI state to the given key
    return connector((
    /**
     * UI is a wrapper component which:
     *   1. Inherits any parent scopes from parent components that are wrapped
     *      by @UI
     *   2. Sets up a new UI scope for the current component
     *   3. Merges the current UI scope into the parent UI scope (where the
     *      current scope takes precedence over parents)
     *
     * This allows normal block-scoping of UI state:
     *
     *   1. All UI components must define their local state keys
     *   2. Upon updating a state key, if it's not in the current scope
     *      walk up the tree until the variable is set
     *
     * This means that any child component can affect the current browser
     * chrome's UI state whilst maintaining their own local UI state.
     *
     * All state will be blown away on navigation by default.
     */
    _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(UI, _Component);

      function UI(props, ctx, queue) {
        var _this;

        _classCallCheck(this, UI);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(UI).call(this, props, ctx, queue));
        _this.resetUI = _this.resetUI.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.updateUI = _this.updateUI.bind(_assertThisInitialized(_assertThisInitialized(_this))); // If the key is undefined generate a new random hex key for the
        // current component's UI scope.
        //
        // We do this in construct() to guarantee a new key at component
        // instantiation time wihch is needed for iterating through a list of
        // components with no explicit key

        if (key === undefined) {
          _this.key = (WrappedComponent.displayName || WrappedComponent.name) + Math.floor(Math.random() * (1 << 30)).toString(16);
        } else {
          _this.key = key;
        } // Immediately set this.uiPath and this.uiVars based on the incoming
        // context in class instantiation


        _this.getMergedContextVars(ctx);

        return _this;
      }

      _createClass(UI, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          // If the component's UI subtree doesn't exist and we have state to
          // set ensure we update our global store with the current state.
          if (this.props.ui.getIn(this.uiPath) === undefined && opts.state) {
            var state = this.getDefaultUIState(opts.state);
            this.context.store.dispatch((0, _actionReducer.mountUI)(this.uiPath, state, opts.reducer));
          }
        } // When a parent context calls resetUI it blows away the entire subtree
        // that any child contexts may store state in.
        //
        // We may need to restore default props for this component if a parent
        // has blown away our state.

      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          // We can only see if this component's state is blown away by
          // accessing the current global UI state; the parent will not
          // necessarily always pass down child state.
          var ui = (0, _utils.getUIState)(this.context.store.getState());

          if (ui.getIn(this.uiPath) === undefined && opts.state) {
            var state = this.getDefaultUIState(opts.state, nextProps);
            this.props.setDefaultUI(this.uiPath, state);
          }
        } // Get default state by evaluating any functions passed in to the state
        // opts.
        // This is also used within componentWilLReceiveProps and so props
        // also needs to be passed in

      }, {
        key: "getDefaultUIState",
        value: function getDefaultUIState(uiState) {
          var _this2 = this;

          var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
          var globalState = this.context.store.getState();

          var state = _objectSpread({}, uiState);

          Object.keys(state).forEach(function (k) {
            if (typeof state[k] === 'function') {
              state[k] = state[k](_this2.props, globalState);
            }
          });
          return state;
        } // Blow away all UI state for this component key by setting the
        // state for this key to undefined. This will get reset to the
        // default state in componentWillMount in the future.
        //
        // We use requestAnimationFrame because `@ui()` can be combined with
        // with `@connect()`; if the connect decorator uses selectors based on
        // UI state (such as live filtering) the connect decorator will receive
        // `undefined` as `this.props.ui` before unmounting.
        //
        // requestAnimationFrame avoids this.

      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var _this3 = this;

          if (opts.persist !== true) {
            if (window && window.requestAnimationFrame) {
              window.requestAnimationFrame(function () {
                return _this3.props.unmountUI(_this3.uiPath);
              });
            } else {
              this.props.unmountUI(this.uiPath);
            }
          }
        } // Sets this.uiVars && this.uiPath.
        //
        // Merges this UI context's variables with any parent context's
        // variables defined in uiVars.

      }, {
        key: "getMergedContextVars",
        value: function getMergedContextVars() {
          var _this4 = this;

          var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.context;

          if (!this.uiVars || !this.uiPath) {
            var uiPath = ctx.uiPath || [];
            this.uiPath = uiPath.concat(this.key); // Keep trackof each UI variable and which path it should be set in

            var state = opts.state || {};
            this.uiVars = _objectSpread({}, ctx.uiVars) || {};
            Object.keys(state).forEach(function (k) {
              return _this4.uiVars[k] = _this4.uiPath;
            }, this);
          }

          return [this.uiVars, this.uiPath];
        } // Construct a new context for all child UI components. We need to merge
        // in the vars defined in opts.state to uiVars to explicitly state that
        // this context is in charge of those variables.
        //
        // Pass the uiKey and partially applied updateUI function to all
        // child components that are wrapped in a plain `@ui()` decorator

      }, {
        key: "getChildContext",
        value: function getChildContext() {
          var _this$getMergedContex = this.getMergedContextVars(),
              _this$getMergedContex2 = _slicedToArray(_this$getMergedContex, 2),
              uiVars = _this$getMergedContex2[0],
              uiPath = _this$getMergedContex2[1];

          return {
            uiKey: this.key,
            uiVars: uiVars,
            uiPath: uiPath,
            updateUI: this.updateUI,
            resetUI: this.resetUI
          };
        } // Helper function to reset UI for the current context **and all child
        // scopes**.
        //
        // This is the same as exiting scope in programming; all variables
        // defined within the scope are reset.

      }, {
        key: "resetUI",
        value: function resetUI() {
          this.props.setDefaultUI(this.uiPath, this.getDefaultUIState(opts.state)); // TODO: Wipe all child contexts
        }
      }, {
        key: "updateUI",
        value: function updateUI(name, value) {
          // Get a list of all UI variables available to this context (which
          // lists parent contexts) to see which key we need to set this in.
          var _this$getMergedContex3 = this.getMergedContextVars(),
              _this$getMergedContex4 = _slicedToArray(_this$getMergedContex3, 1),
              uiVars = _this$getMergedContex4[0];

          var uiVarPath = uiVars[name];

          if (_typeof(name) === 'object' && value === undefined) {
            // We're mass updating many UI variables. These may or may not be
            // directly controlled by our context, so we delegate to the
            // reducer which will deeply set each variable according to its
            // uiPath (from uiVars).
            //
            // Doing this means we only trigger one store update.
            this.props.massUpdateUI(this.uiVars, name);
            return;
          }

          (0, _invariant.default)(uiVarPath, "The '".concat(name, "' UI variable is not defined in the UI context in \"") + (WrappedComponent.displayName || WrappedComponent.name) + '" ' + 'or any parent UI context. Set this variable using the "state" ' + 'option in the @ui decorator before using it.');
          this.props.updateUI(uiVarPath, name, value);
        } // Iterate through the list of contexts merging in UI variables from the
        // UI store

      }, {
        key: "mergeUIProps",
        value: function mergeUIProps() {
          var _this5 = this;

          // WARNING: React has a subtle componentWillMount bug which we're
          // working around here!
          //
          // ## React bug
          //
          // On the first *ever* render of this component we set defaults in
          // componentWillMount. This works; when `render()` is called the
          // wrapped component has the default props within this.props.ui
          //
          // BUT.  Unmount, navigate away then return to this component.  When
          // componentWillMount is called a *second* time, we call updateUI to
          // set default props. **These aren't passed in to render() until the
          // component is mounted a second time**. Even though it worked first
          // time. And even though this is a new instance of the component.
          //
          // ## Workaround.
          //
          // Instead of relying on this.props.ui from our connector we call
          // getState() in the store directly here. We guarantee that this will
          // be the latest set of props, including default props set in
          // componentWillMount.
          //
          // We still use @connect() to connect to the store and listen for
          // changes in other cases.
          var ui = (0, _utils.getUIState)(this.context.store.getState());
          var result = Object.keys(this.uiVars).reduce(function (props, k) {
            props[k] = ui.getIn(_this5.uiVars[k].concat(k));
            return props;
          }, {}) || {}; // If this slice of the UI has not changed (shallow comparison),
          // then use an old copy of the slice to prevent unnecessary
          // re-rendering

          if (!(0, _shallowEqual.default)(this.__previousMergeResult, result)) {
            this.__previousMergeResult = result;
          }

          return this.__previousMergeResult;
        }
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(WrappedComponent, _extends({}, this.props, {
            uiKey: this.key,
            uiPath: this.uiPath,
            ui: this.mergeUIProps(),
            resetUI: this.resetUI,
            updateUI: this.updateUI
          }));
        }
      }]);

      return UI;
    }(_react.Component), _defineProperty(_class, "propTypes", {
      // The entire global UI state via react-redux connector
      ui: _propTypes.object.isRequired,
      // These actions are passed via react-redux connector
      setDefaultUI: _propTypes.func.isRequired,
      updateUI: _propTypes.func.isRequired,
      massUpdateUI: _propTypes.func.isRequired // Pass these down in the new context created for this component

    }), _defineProperty(_class, "childContextTypes", {
      // uiKey is the name of the parent context's key
      uiKey: _propTypes.string,
      // uiPath is the current path of the UI context
      uiPath: _propTypes.array,
      // uiVars is a map of UI variable names stored in state to the parent
      // context which controls them.
      uiVars: _propTypes.object,
      // Actions to pass to children
      updateUI: _propTypes.func,
      resetUI: _propTypes.func // Get the existing context from a UI parent, if possible

    }), _defineProperty(_class, "contextTypes", {
      // This is used in mergeUIProps and construct() to immediately set
      // props.
      store: _propTypes.any,
      uiKey: _propTypes.string,
      uiPath: _propTypes.array,
      uiVars: _propTypes.object,
      updateUI: _propTypes.func,
      resetUI: _propTypes.func
    }), _temp));
  };
}