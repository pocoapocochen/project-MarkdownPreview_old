var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
--add scroll to element method
*/

// create reference instance ()
//const marked = require("marked");

// set options: new tab link
// https://github.com/markedjs/marked/issues/655
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return "<a href=" + href + " target=\"_blank\"> " + text + " </a>";
};

// set options: line break
// https://github.com/markedjs/marked/blob/master/docs/USING_ADVANCED.md#options
marked.setOptions({
  breaks: true
});

var placeholder = "# Header\n## Sub Header\n\n---\n**bold text**\n> Block quote\n\n---\n`<p>inline code</p>`\n```\n//code block\n//code block\n//code block\n```\n\n---\nUnordered List:\n* list item\n* list item\n* list item\n\nOrdered List:\n1. list item\n2. list item\n3. list item\n\n---\n[website](https://en.wikipedia.org/wiki/Markdown)\n\n![image](https://imgplaceholder.com/100x100/cccccc/757575/fa-file-photo-o?text=M)\n";

// define grandchild component
var EditorTab = function EditorTab() {
  return React.createElement(
    "div",
    { id: "editortab_div", className: "tab_div" },
    React.createElement(
      "i",
      { className: "fa fa-code tabicon", "aria-hidden": "true" },
      "Editor"
    ),
    React.createElement(
      "a",
      { className: "linkicon", href: "https://en.wikipedia.org/wiki/Markdown#Example", target: "_blank" },
      "Markdown Example"
    ),
    React.createElement(
      "a",
      { className: "buttonicon", href: "#preview_div" },
      React.createElement("i", { className: "fa fa-arrow-circle-down", "aria-hidden": "true" })
    )
  );
};

// define grandchild component
var PreviewTab = function PreviewTab() {
  return React.createElement(
    "div",
    { id: "previewtab_div", className: "tab_div" },
    React.createElement(
      "i",
      { className: "fa fa-eye tabicon", "aria-hidden": "true" },
      "Previewer"
    ),
    React.createElement(
      "a",
      { className: "buttonicon", href: "#editor_div" },
      React.createElement("i", { className: "fa fa-arrow-circle-up", "aria-hidden": "true" })
    )
  );
};

// define child component
var Editor = function Editor(props) {
  return React.createElement(
    "div",
    { id: "editor_div", className: "markdown_div" },
    React.createElement(EditorTab, null),
    React.createElement("textarea", { id: "editor", value: props.value, onChange: props.onChange })
  );
};

// define child component
// note: https://reactjs.org/docs/dom-elements.html
var Preview = function Preview(props) {
  return React.createElement(
    "div",
    { id: "preview_div", className: "markdown_div" },
    React.createElement(PreviewTab, null),
    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(props.value, { renderer: renderer }) } })
  );
};

// define parent component

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      text: placeholder
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        text: event.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "wrap" },
        React.createElement(Editor, { value: this.state.text, onChange: this.handleChange }),
        React.createElement(Preview, { value: this.state.text })
      );
    }
  }]);

  return App;
}(React.Component);

//================== render to html =======================


ReactDOM.render(React.createElement(App, null), document.getElementById("app"));