# designMode
设计模式 Javascript

## 单例模式

主要通过Javascript闭包来实现维护

```
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
```

## 策略模式

主要通过把方法外置，通过调用传入的方法来实现

```

```