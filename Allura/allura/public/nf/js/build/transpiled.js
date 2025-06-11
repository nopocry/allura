
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = (function (_React$Component) {
    _inherits(ContextMenu, _React$Component);

    function ContextMenu(props) {
        _classCallCheck(this, ContextMenu);

        _get(Object.getPrototypeOf(ContextMenu.prototype), 'constructor', this).call(this, props);
    }

    _createClass(ContextMenu, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this = this;
            var mount_point;
            $('body').on('click.contextMenu', function (evt) {
                if ($(evt.target).is(':not(.contextMenu)')) {
                    if ($(evt.target).is('.config-tool')) {
                        mount_point = $(evt.target).next().data('mount-point');
                    } else {
                        mount_point = "";
                    }
                    _this.props.onOptionClick(mount_point);
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            $("body").off('click.contextMenu');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            return React.createElement(
                'div',
                { className: 'contextMenu' },
                React.createElement(ToolTip, { targetSelector: '#top_nav_admin .contextMenu a' }),
                React.createElement(
                    'ul',
                    null,
                    this.props.items.map(function (o, i) {
                        return React.createElement(
                            'li',
                            { key: i },
                            React.createElement(
                                'a',
                                { href: o.href,
                                    className: _this.props.classes.concat([o.className]).join(' '),
                                    title: o.tooltip },
                                o.text
                            )
                        );
                    })
                )
            );
        }
    }]);

    return ContextMenu;
})(React.Component);

ContextMenu.propTypes = {
    classes: React.PropTypes.array,
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onOptionClick: React.PropTypes.func.isRequired
};

ContextMenu.defaultProps = {
    classes: []
};


'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getProjectUrl = function _getProjectUrl() {
    var rest = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    var nbhd;
    var proj;
    var nbhd_proj;
    var identClasses = document.getElementById('page-body').className.split(' ');
    var basePath = rest ? '/rest/' : '/';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = identClasses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cls = _step.value;

            if (cls.indexOf('project-') === 0) {
                proj = cls.slice('project-'.length);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    nbhd = window.location.pathname.split('/')[1];
    if (proj === '--init--') {
        nbhd_proj = nbhd;
    } else {
        nbhd_proj = nbhd + '/' + proj;
    }
    return basePath + nbhd_proj;
};

var ToolsPropType = React.PropTypes.shape({
    mount_point: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    is_anchored: React.PropTypes.bool.isRequired,
    tool_name: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    children: React.PropTypes.array,
    admin_options: React.PropTypes.array
});

var NavBarItem = React.createClass({
    displayName: 'NavBarItem',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        currentOptionMenu: React.PropTypes.object,
        isGrouper: React.PropTypes.bool,
        mount_point: React.PropTypes.string,
        onOptionClick: React.PropTypes.func.isRequired,
        options: React.PropTypes.array,
        handleType: React.PropTypes.string,
        is_anchored: React.PropTypes.bool
    },

    render: function render() {
        var divClasses = "tb-item tb-item-edit";
        var spanClasses = this.props.handleType + " ordinal-item";

        if (this.props.is_anchored) {
            divClasses += " anchored";
        }
        if (this.props.isGrouper) {
            spanClasses += " toolbar-grouper";
        }

        return React.createElement(
            'div',
            { className: divClasses },
            React.createElement(ToolTip, { targetSelector: '.anchored .draggable-handle',
                position: 'top',
                theme: 'tooltipster-default',
                delay: 250 }),
            React.createElement(ToolTip, { targetSelector: '.anchored .draggable-handle-sub',
                position: 'right',
                theme: 'tooltipster-default',
                delay: 250 }),
            React.createElement(
                'a',
                null,
                !_.isEmpty(this.props.options) && React.createElement(
                    'i',
                    { className: 'config-tool fa fa-cog', onClick: this.handleOptionClick },
                    ' '
                ),
                React.createElement(
                    'span',
                    {
                        className: spanClasses,
                        'data-mount-point': this.props.mount_point,
                        title: this.props.is_anchored ? 'This item cannot be moved.' : '' },
                    this.props.name
                )
            ),
            this.props.currentOptionMenu.tool && this.props.currentOptionMenu.tool === this.props.mount_point && React.createElement(ContextMenu, _extends({}, this.props, { items: this.props.options, onOptionClick: this.props.onOptionClick }))
        );
    },

    handleOptionClick: function handleOptionClick(event) {
        this.props.onOptionClick(this.props.mount_point);
    }
});

var GroupingThreshold = React.createClass({
    displayName: 'GroupingThreshold',

    propTypes: {
        initialValue: React.PropTypes.number.isRequired,
        isHidden: React.PropTypes.bool,
        onUpdateThreshold: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return {
            value: this.props.initialValue
        };
    },

    handleChange: function handleChange(event) {
        this.setState({
            value: event.target.value
        });
        this.props.onUpdateThreshold(event);
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            Boolean(this.props.isHidden) && React.createElement(
                'div',
                { id: 'threshold-config' },
                React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'label',
                        { htmlFor: 'threshold-input' },
                        'Grouping Threshold'
                    ),
                    React.createElement(ToolTip, { targetSelector: '#threshold-input', position: 'top', contentAsHTML: true }),
                    React.createElement('input', { type: 'number', name: 'threshold-input', id: 'threshold-input',
                        title: 'When you have multiple tools of the same type, <u>this number</u> determines if they will fit in the navigation bar or be grouped into a dropdown.',
                        value: this.state.value,
                        onChange: this.handleChange,
                        min: '1', max: '50'
                    })
                )
            )
        );
    }
});

var NormalNavItem = React.createClass({
    displayName: 'NormalNavItem',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        children: React.PropTypes.object,
        classes: React.PropTypes.string
    },
    render: function render() {
        return React.createElement(
            'li',
            { key: 'tb-norm-' + _.uniqueId() },
            React.createElement(
                'a',
                { href: this.props.url, className: this.props.classes },
                this.props.name
            ),
            this.props.children
        );
    }
});

var ToggleAddNewTool = React.createClass({
    displayName: 'ToggleAddNewTool',

    propTypes: {
        installableTools: React.PropTypes.arrayOf(React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            href: React.PropTypes.string,
            tooltip: React.PropTypes.string
        })).isRequired
    },
    getInitialState: function getInitialState() {
        return {
            visible: false
        };
    },
    handleToggle: function handleToggle() {
        this.setState({
            visible: !this.state.visible
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'a',
                { onClick: this.handleToggle, className: 'add-tool-toggle' },
                'Add New...'
            ),
            this.state.visible && React.createElement(ContextMenu, _extends({}, this.props, {
                classes: ['admin_modal'],
                onOptionClick: this.handleToggle,
                items: this.props.installableTools
            }))
        );
    }
});

var NormalNavBar = React.createClass({
    displayName: 'NormalNavBar',

    propTypes: {
        items: React.PropTypes.arrayOf(ToolsPropType).isRequired,
        installableTools: React.PropTypes.arrayOf(React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            href: React.PropTypes.string,
            tooltip: React.PropTypes.string
        })).isRequired
    },

    buildMenu: function buildMenu(item, i) {
        var classes = window.location.pathname.startsWith(item.url) ? 'active-nav-link' : '';

        var subMenu;
        if (item.children) {
            subMenu = item.children.map(this.buildMenu);
        }
        return React.createElement(
            NormalNavItem,
            { url: item.url, name: item.name, classes: classes, key: 'normal-nav-' + _.uniqueId() },
            React.createElement(
                'ul',
                null,
                subMenu
            )
        );
    },

    render: function render() {
        var listItems = this.props.items.map(this.buildMenu);
        return React.createElement(
            'ul',
            {
                id: 'normal-nav-bar',
                className: 'dropdown' },
            listItems,
            React.createElement(
                'li',
                { id: 'add-tool-container' },
                React.createElement(ToggleAddNewTool, { installableTools: this.props.installableTools })
            )
        );
    }
});

var AdminNav = React.createClass({
    displayName: 'AdminNav',

    propTypes: {
        tools: React.PropTypes.arrayOf(ToolsPropType),
        currentOptionMenu: React.PropTypes.object,
        installableTools: React.PropTypes.arrayOf(React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            href: React.PropTypes.string,
            tooltip: React.PropTypes.string
        })),
        onOptionClick: React.PropTypes.func.isRequired
    },

    buildMenu: function buildMenu(items) {
        var isSubMenu = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        var _this = this;
        var tools = [];
        var anchoredTools = [];
        var endTools = [];

        var subMenu;
        var childOptionsOpen;
        var _handle;
        var toolList;
        var isAnchored;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                if (item.children) {
                    subMenu = this.buildMenu(item.children, true);
                } else {
                    subMenu = null;
                }

                _handle = isSubMenu ? "draggable-handle-sub" : 'draggable-handle';
                if (item.mount_point === 'admin') {
                    toolList = endTools;
                    isAnchored = true;
                } else if (item.is_anchored) {
                    toolList = anchoredTools;
                    isAnchored = true;
                } else {
                    toolList = tools;
                    isAnchored = false;
                }
                var coreItem = React.createElement(NavBarItem, _extends({}, _this.props, {
                    mount_point: item.mount_point,
                    name: item.name,
                    handleType: _handle,
                    isGrouper: item.children && item.children.length > 0,
                    url: item.url,
                    key: 'tb-item-' + _.uniqueId(),
                    is_anchored: isAnchored,
                    options: item.admin_options
                }));
                if (subMenu) {
                    childOptionsOpen = _.contains(_.pluck(item.children, 'mount_point'), this.props.currentOptionMenu.tool);

                    toolList.push(React.createElement(NavBarItemWithSubMenu, {
                        key: _.uniqueId(),
                        tool: coreItem,
                        subMenu: subMenu,
                        childOptionsOpen: childOptionsOpen
                    }));
                } else {
                    toolList.push(coreItem);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                    _iterator2['return']();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return React.createElement(
            'div',
            { className: 'react-drag' },
            anchoredTools,
            React.createElement(
                ReactReorderable,
                {
                    key: 'reorder-' + _.uniqueId(),
                    handle: "." + _handle,
                    mode: isSubMenu ? 'list' : 'grid',
                    onDragStart: _this.props.onToolDragStart,
                    onDrop: _this.props.onToolReorder },
                tools
            ),
            endTools,
            !isSubMenu && React.createElement(
                'div',
                { id: 'add-tool-container', className: 'unlocked-container' },
                React.createElement(ToggleAddNewTool, { installableTools: this.props.installableTools })
            )
        );
    },

    render: function render() {
        var tools = this.buildMenu(this.props.tools);
        return React.createElement(
            'div',
            null,
            tools
        );
    }
});

var NavBarItemWithSubMenu = React.createClass({
    displayName: 'NavBarItemWithSubMenu',

    propTypes: {
        subMenu: React.PropTypes.node,
        childOptionsOpen: React.PropTypes.bool,
        tool: React.PropTypes.node
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: "tb-item-container" + (this.props.childOptionsOpen ? " child-options-open" : "") },
            this.props.tool,
            this.props.subMenu && React.createElement(
                AdminItemGroup,
                { key: _.uniqueId() },
                this.props.subMenu
            )
        );
    }
});

var AdminItemGroup = React.createClass({
    displayName: 'AdminItemGroup',

    propTypes: {
        children: React.PropTypes.object
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'tb-item-grouper' },
            this.props.children
        );
    }
});

var ToggleAdminButton = React.createClass({
    displayName: 'ToggleAdminButton',

    propTypes: {
        handleButtonPush: React.PropTypes.func,
        visible: React.PropTypes.bool
    },
    render: function render() {
        var classes = this.props.visible ? 'fa fa-unlock' : 'fa fa-lock';
        return React.createElement(
            'button',
            { id: 'toggle-admin-btn', onClick: this.props.handleButtonPush, className: 'admin-toolbar-right' },
            React.createElement(
                'i',
                { className: classes },
                ' '
            )
        );
    }
});

var Main = React.createClass({
    displayName: 'Main',

    propTypes: {
        initialData: React.PropTypes.shape({
            menu: React.PropTypes.arrayOf(ToolsPropType),
            installableTools: React.PropTypes.array,
            grouping_threshold: React.PropTypes.number.isRequired
        }),
        installableTools: React.PropTypes.array
    },
    getInitialState: function getInitialState() {
        return {
            data: this.props.initialData,
            visible: true,
            currentOptionMenu: {
                tool: null
            }
        };
    },

    getNavJson: function getNavJson() {
        $.get(_getProjectUrl(false) + '/_nav.json?admin_options=1', (function (result) {
            if (this.isMounted()) {
                this.setState({
                    data: result
                });
            }
        }).bind(this));
    },

    handleToggleAdmin: function handleToggleAdmin() {
        this.setState({
            visible: !this.state.visible
        });
    },

    handleShowOptionMenu: function handleShowOptionMenu(mount_point) {
        this.setState({
            currentOptionMenu: {
                tool: mount_point
            }
        });
    },

    onUpdateThreshold: function onUpdateThreshold(event) {
        var _this2 = this;

        var thres = event.target.value;
        var url = _getProjectUrl() + '/admin/configure_tool_grouping';
        var csrf = $.cookie('_session_id');
        var data = {
            _session_id: csrf,
            grouping_threshold: thres
        };
        $.post(url, data, function () {
            return _this2.getNavJson();
        });
        return false;
    },

    onToolReorder: function onToolReorder() {
        $('.react-drag.dragging').removeClass('dragging');

        var params = { _session_id: $.cookie('_session_id') };
        var toolNodes = $(ReactDOM.findDOMNode(this)).find('span.ordinal-item').not(".toolbar-grouper");
        for (var i = 0; i < toolNodes.length; i++) {
            params[i] = toolNodes[i].dataset.mountPoint;
        }

        var _this = this;
        var url = _getProjectUrl() + '/admin/mount_order';
        $.ajax({
            type: 'POST',
            url: url,
            data: params,
            success: function success() {
                $('#messages').notify('Tool order updated', {
                    status: 'confirm',
                    interval: 500,
                    timer: 2000
                });
                _this.getNavJson();
            },

            error: function error() {
                $('#messages').notify('Error saving tool order.', {
                    status: 'error'
                });
            }
        });
    },

    onToolDragStart: function onToolDragStart(obj) {
        var dragging_mount_point = obj.props.children.props.mount_point;
        $('[data-mount-point="' + dragging_mount_point + '"]').closest('.react-drag').addClass('dragging');
    },

    render: function render() {
        var _this3 = this;

        var _this = this;
        var navBarSwitch = function navBarSwitch(showAdmin) {
            var navbar;
            if (showAdmin) {
                navbar = React.createElement(AdminNav, {
                    tools: _this.state.data.menu,
                    installableTools: _this.state.data.installable_tools,
                    data: _this.state.data,
                    onToolReorder: _this.onToolReorder,
                    onToolDragStart: _this.onToolDragStart,
                    editMode: _this.state.visible,
                    currentOptionMenu: _this.state.currentOptionMenu,
                    onOptionClick: _this.handleShowOptionMenu,
                    currentToolOptions: _this3.state.currentToolOptions
                });
            } else {
                navbar = React.createElement(
                    'div',
                    null,
                    React.createElement(NormalNavBar, {
                        items: _this.state.data.menu,
                        installableTools: _this.state.data.installable_tools
                    })
                );
            }
            return navbar;
        };
        var navBar = navBarSwitch(this.state.visible);

        var max_tool_count = _.chain(this.state.data.menu).map(function (item) {
            return item.children ? _.pluck(item.children, 'tool_name') : item.tool_name;
        }).flatten().countBy().values().max().value();
        var show_grouping_threshold = max_tool_count > 1;

        return React.createElement(
            'div',
            null,
            navBar,
            React.createElement(
                'div',
                { id: 'bar-config' },
                show_grouping_threshold && React.createElement(GroupingThreshold, {
                    onUpdateThreshold: this.onUpdateThreshold,
                    isHidden: this.state.visible,
                    initialValue: parseInt(this.state.data.grouping_threshold, 10) })
            ),
            React.createElement(ToggleAdminButton, {
                handleButtonPush: this.handleToggleAdmin,
                visible: this.state.visible })
        );
    }
});

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolTip = (function (_React$Component) {
    _inherits(ToolTip, _React$Component);

    function ToolTip(props) {
        _classCallCheck(this, ToolTip);

        _get(Object.getPrototypeOf(ToolTip.prototype), 'constructor', this).call(this, props);
    }

    _createClass(ToolTip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            $(this.props.targetSelector).tooltipster({
                animation: _this.props.animation,
                speed: _this.props.speed,
                delay: _this.props.delay,
                theme: _this.props.theme,
                contentAsHTML: _this.props.contentAsHTML,
                trigger: _this.props.trigger,
                position: _this.props.position,
                multiple: _this.props.multiple,
                iconCloning: false,
                maxWidth: _this.props.maxWidth
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return ToolTip;
})(React.Component);

ToolTip.propTypes = {
    targetSelector: React.PropTypes.string.isRequired,
    animation: React.PropTypes.string,
    speed: React.PropTypes.number,
    position: React.PropTypes.string,
    contentAsHTML: React.PropTypes.bool,
    delay: React.PropTypes.number,
    theme: React.PropTypes.string,
    maxWidth: React.PropTypes.number,
    trigger: React.PropTypes.string,
    multiple: React.PropTypes.bool
};

ToolTip.defaultProps = {
    animation: 'fade',
    speed: 150,
    delay: 0,
    maxWidth: 300,
    multiple: true,
    contentAsHTML: false,
    position: 'left',
    trigger: 'hover',
    classes: [],
    theme: 'tooltipster-light'
};
//# sourceMappingURL=transpiled.map