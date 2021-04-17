function createDialog(html) {

    const div = document.createElement('div')
    div.innerHTML = html
    document.body.appendChild(div)

    return div
}
// 创建单例
function getSingle(fn) {
    let instance;

    return function () {
        if (!instance) {
            instance = fn.apply(this, arguments)
        }
        return instance
    }
}




const bindEvent = getSingle( () => createDialog('dialog'))


const render = function () {
    console.log('开始渲染')
    bindEvent()
}

render()

render()

render()