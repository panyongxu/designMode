/**
     * 动画算法
     * @param {动画已消耗的时间} t 
     * @param {小球原始位置} b 
     * @param {小球目标位置} c 
     * @param {动画持续的总时间} d 
     * @returns 
     */
const tween = {

    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};

/**
 * 创建小球动画
 * 1. 定义 Animate 类
 * 2. 动画 start 方法
 * 3. 动画 update 方法 更新位置
 * 4. 动画 step 方法 每一帧需要移动的位置
 * 
 */


class Animate {
    constructor(dom) {
        // 要进行动画的dom元素
        this.dom = dom
        // 开始动画时间
        this.startTime = 0
        // 动画开始位置
        this.startPos = 0
        // 动画结束位置
        this.endPos = 0
        // 动画持续时间
        this.duration = null
        // 动画算法
        this.easying = null
        // 需要改变的dom属性名称
        this.propertyName = null

    }
    /**
     * 
     * @param {属性名} propertyName 
     * @param {结束位置} endPos 
     * @param {持续时间} duration 
     * @param {动画} easying 
     */
    start(propertyName, endPos, duration, easying) {
        this.startTime = + new Date()
        this.startPos = this.dom.getBoundingClientRect()[propertyName]
        this.propertyName = propertyName
        this.endPos = endPos
        this.duration = duration
        this.easying = tween[easying]

        let timeId = setInterval(() => {
            if (this.step() === false) {
                clearInterval(timeId)
                return
            }


        }, 16);
    }

    update(pos) {
        this.dom.style[this.propertyName] = pos + 'px'
    }

    step() {
        const nowTime = +(new Date());
        // 当前时间大于总时间加开始时间 说明动画已经结束 修正最后位置
        if (nowTime >= this.duration + this.startTime) {
            this.update(this.endPos)
            return false
        }
        let pos = this.easying( nowTime - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
        // 获取当前动画位置 去更新
        this.update(pos)
        return true
    }
}




const animate = new Animate(document.getElementById('id'))

// animate.start('left', 500, 1000, 'linear')













