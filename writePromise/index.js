/* 手写Promise */
const Promise = function(executor) {
  let _this = this;
  _this._status = 'pending'; // 定义当前状态
  _this.successCallBack = undefined;
  _this.failCallBack = undefined;
  _this.error = undefined; // 用来存储，传递reject信息以及错误信息
  setTimeout(_ => {
    try {
      executor(_this.resolve.bind(this), _this.reject.bind(this));
    } catch (e) {
      _this.error = e
      if (_this.callBackDefer && _this.callBackDefer.fail) {
        _this.callBackDefer.fail(e)
      } else if (_this._catch) {
        _this._catch(e)
      } else {
        throw new Error('un catch')
      }
    }
  })
}

Promise.prototype = {
  constructor: Promise,
  onResolve: function(params) {
    if (_this._status === 'pending') {
      this._status = 'success'
      this.resolve(params)
    }
  },
  resolve: function(params) {
    let _this = this;
    let successCallback = _this.successCallback;
    if (successCallback) {
      _this.defer(successCallback.bind(_this, params));
    }
  },
  defer: function(callBack) {
    let _this = this;
    let result;
    let defer = _this.callBackDefer.success;
    if (_this.$$status === 'fail' && !_this.catchErrorFunc) {
        defer = _this.callBackDefer.fail;
    }
    try {
        result = callBack();
    } catch (e) {
        result = e;
        defer = _this.callBackDefer.fail;
    }
    if (result && result instanceof Promi) {
        result.then(_this.callBackDefer.success, _this.callBackDefer.fail);
        return '';
    }
    defer(result)
  },
  onReject: function(error) {
    if (_this._status === 'pending') {
      this._status = 'fail'
      this.reject(error)
    }
  },
  reject: function(error) {
    let _this = this
    _this.error = error
    let failCallBack = _this.failCallBack
    let _catch = _this._catch
    if (failCallBack) {
      _this.defer(failCallBack.bind(_this, error));
    } else if (_catch) {
      _catch(error)
    } else {
      setTimeout(_ => { throw new Error('un catch promise') }, 0)
    }
  },
  then: function(success, fail) {
    let _this = this;
    let resetFail = e => e;
    if (fail) {
      resetFail = fail;
      _this.catchErrorFunc = true;
    }
    let newPromise = new Promise(_ => {})
    _this.callBackDefer = {
      success: newPromise.onResolve.bind(newPromise),
      fail: newPromise.onReject.bind(newPromise)
    }
    _this.successCallBack = success
    _this.failCallBack = fail
    return newPromise
  },
  catch: function(catchCallBack = () => {}) {
    this._catch = catchCallBack
  }
}

Promise.prototype.reject = function(params) {
  let _this = this
  if (_this._status === 'pending') {
    _this._status = 'fail'
    if (!_this.failCallBack) return 
    let result = _this.failCallBack(params)
    if (result && result instanceof Promise) {
      result.then(_this.successDefer, _this.failDefer)
      return ''
    }
    _this.successDefer(result)
  }
}

module.exports = Promise