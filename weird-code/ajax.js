function request(type = '', url = '', callBack = null) {
  const wrapper = {
    type,
    url,
    callBack,
    noproxy: this,
    request: new XMLHttpRequest(),
    send() {
      const a = this;
      if (typeof this.noproxy.callBack !== 'function') {
        return {
          then: (func) => {
            this.callBack = func;
            this.applyCurrentProperties();
            this.request.send('');
          },
        };
      }
      return this.request.send('');
    },
    applyCurrentProperties() {
      if (typeof this.noproxy.type === 'string' && typeof this.noproxy.url === 'string') {
        this.request.open(this.noproxy.type, this.noproxy.url);
      }
      if (typeof this.noproxy.callBack === 'function') {
        const callBack = this.noproxy.callBack;
        this.on.load = function () {
          callBack(this.response);
        };
      }
    },
  };
  wrapper.on = new Proxy(wrapper, {
    get(target, key) {
      return function addEventListener(func) {
        target.request.addEventListener(key, func);
        return target.on;
      };
    },
    set(target, key, value) {
      target.request.addEventListener(key, value);
    },
  });
  wrapper.applyCurrentProperties();
  wrapper.noproxy = wrapper;
  return new Proxy(wrapper, {
    get(target, key) {
      if (key.match(/on|request|send|applyCurrentProperties|noproxy/g)) {
        return target[key];
      } else if (key in target) {
        return function set(value) {
          target[key] = value;
          target.applyCurrentProperties();
          return target;
        };
      }
      return target.request[key];
    },
    set(target, key, value) {
      if (key in target) {
        target[key] = value;
      } else {
        target.request[key] = value;
      }
    },
  });
}
