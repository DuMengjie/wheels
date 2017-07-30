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
};