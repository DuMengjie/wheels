class Tabs {
    constructor(options) {
        let defaultOptions = {
            element: '',
            navSelector: '[data-role="tabs-nav"]',
            paneSelector: '[data-role="tabs-panes"]',
            activeClassName: 'active',
        };
        // 将默认值和用户输入值进行合并
        this.options = Object.assign({}, defaultOptions, options);

        // 进行初始化操作
        this.checkOptions().bindEvents().setDefaultTab();
    }

    checkOptions() {
        if (!this.options.element) {
            throw new Error('element is required!');
        }
        return this;
    }

    // 事件绑定
    bindEvents() {
        dom.on(this.options.element, 'click', `${this.options.navSelector}>li`, (e, el) => {
            let index = dom.index(el);
            let children = this.options.element.querySelector(this.options.paneSelector).children;
            dom.uniqueClass(el, this.options.activeClassName);
            dom.uniqueClass(children[index], this.options.activeClassName);
        });
        return this;
    }

    // 默认状态
    setDefaultTab() {
        this.options.element.querySelector(`${this.options.navSelector}>li:first-child`).click();
        return this;
    }
}