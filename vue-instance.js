function vueInstancePlugin(Vue) {
  Vue.$_instanceMap = {};

  Vue.getInstance = function(name) {
    return Vue.$_instanceMap[name];
  };

  Vue.mixin({
    created: function() {
      const vueInstanceName = this.$options.vueInstanceName;

      if (!vueInstanceName) {
        return;
      }

      if (Vue.$_instanceMap[vueInstanceName]) {
        console.warn(
          `${vueInstanceName} instance already exist, so that new ${vueInstanceName} instance was not stored`
        );
        return;
      }

      Vue.$_instanceMap[vueInstanceName] = this;
    },
    destroyed: function() {
      const vueInstanceName = this.$options.vueInstanceName;

      delete Vue.$_instanceMap[vueInstanceName];
    }
  });
}
