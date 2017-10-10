let dom = {
    // 添加事件侦听器
    on: function(element, eventType, selector, fn) {
        element.addEventListener(eventType, e => {
            let el = e.target;
            // 过滤非目标元素
            while(!el.matches(selector)) {
                if(element === el) {
                    el === null;
                    break;
                }
                el = el.parentNode;
            }  
            el && fn.call(el, e, el);  
        });
        return element;
    },

    // 滑动事件
    onSwipe: function(element, fn) {
        // x0, y0记录初始位置
        let x0, y0;
        element.addEventListener('touchstart', function(e) {
            x0 = e.touches[0].clientX;
            y0 = e.touches[0].clientY;
        });
        element.addEventListener('touchmove', function(e) {
            if(!x0 || !y0) {
                return ;
            }
            // xDiff，yDiff分别代表x,y轴移动距离
            let xDiff = e.touches[0].clientX - x0;
            let yDiff = e.touches[0].clientY - y0;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                fn.call(element, e, 'right')
                } else {
                fn.call(element, e, 'left')
                }
            } else {
                if (yDiff > 0) {
                fn.call(element, e, 'down')
                } else {
                fn.call(element, e, 'up')
                }
            }
            x0 = undefined;
            y0 = undefined;
        });
    },

    // 获取元素的序号
    index: function(element) {
        let siblings = element.parentNode.children;
        for (let index = 0; index < siblings.length; index++) {
            if(siblings[index] === element) {
                return index;
            }
        }
        return -1;
    },

    // 重置唯一类名
    uniqueClass: function(element, className) {
        dom.every(element.parentNode.children, el => {
            el.classList.remove(className);
        });
        element.classList.add(className);
        return element;
    },

    every: function(nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i], i);
        }
        return nodeList;
    },

    // 创建DOM
    create: function(html, children) {
        var template = document.createElement('template');
        template.innerHTML = html.trim();
        let node = template.content.firstChild;
        if (children) {
            dom.append(node, children);
        }
        return node;
    },

    // 在后面添加DOM节点数组
    append: function(parent, children) {
        // children不是数组将其转化
        if (children.length === undefined) {
            children = [children];
        }
        for (let i = 0; i < children.length; i++) {
            parent.appendChild(children[i]);
        }
        return parent;
    },

    // 在前面添加节点数组
    prepend: function(parent, children) {
        if (children.length === undefined) {
            children = [children]
        }
        for (let i = children.length - 1; i >= 0; i--) {
            if (parent.firstChild) {
                parent.insertBefore(children[i], parent.firstChild);
            } else {
                parent.appendChild(children[i]);
            }
        }
        return parent;
    },

    // 删除子节点
    removeChildren: function(element) {
        while (element.hasChildNodes()) {
            element.removeChildren(element.lastChild);
        }
        return this;
    },

    // 触发事件
    dispatchEvent: function(element, eventType, detail) {
        let event = new CustomEvent('pageChange', { detail });
        element.dispatchEvent(event);
        return this;
    }
};