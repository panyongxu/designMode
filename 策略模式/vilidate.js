
// 验证规则
const rulesFunction = {
    maxlength: function (value, length, errMessage) {
        if (value.toString().length > length) {
            alert(errMessage)
            return false
        }
        return true
    },
    isEmpty: function (value, errMessage) {
        if (!value) {
            alert(errMessage)
            return false
        }
        return true
    }
}

class Validate {
    constructor() {
        // 校验列表
        this.list = []

    }
    /**
     * 添加校验规则
     * @param {dom元素} dom 
     * @param {规则} rules  
     * [
            {
                name: 'isEmpty',
                errMessage: '请输入姓名'
            },
            {
                name: 'maxlength:5',
                errMessage: '最大名称为5个字符'
            }
        ]
     * @param {错误提示信息} errMessage 
     */
    add(dom, rules, ) {
        // 遍历rules数组 往list添加
        rules.forEach(rule => {
            const {errMessage, name} = rule
            // maxlength:5 ruleName 为 方法名, other为其他参数
            const [ruleName, other] = name.split(':')
            this.list.push(
                {
                    dom,
                    ruleName,
                    other,
                    errMessage
                }
            )
        })

    }

    start(callback) {
        /**
         * status 验证返回值状态
         * rule 当前验证的规则
         * value 当前验证dom元素的value
         * errMessage 报错信息
         * args 需要传给 规则函数的参数
         */
        let status, rule, value, errMessage, args;
        for (let i = 0, length = this.list.length; i < length; i++) {
            rule = this.list[i]
            value = rule.ruleName.value
            errMessage = rule.errMessage

            args = [ errMessage]
            if(rule.other) {
                args.unshift(rule.other)
            }
            args.unshift(rule.dom.value)

            // 执行校验方法
            status = rulesFunction[rule.ruleName].apply( rule.dom, args)
            if (!status) {
                // 状态为 false 直接返回
                callback(status)
                return
            }
        }

        callback(status)
    }
}


const validate = new Validate()
const form = document.querySelector('#form')
const button = document.getElementById('button')
validate.add(form.name, [
    {
        name: 'isEmpty',
        errMessage: '请输入姓名'
    },
    {
        name: 'maxlength:5',
        errMessage: '最大名称为5个字符'
    }
])


button.onclick = function () {
    validate.start(status => {
        if (!status) {
            console.log('验证不通过')
        } else {
            console.log('通过')
        }

    })
}
