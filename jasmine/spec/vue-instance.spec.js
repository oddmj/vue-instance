describe("vue-instance", function() {
  describe("Vue instance", function() {
    const instanceName = "myApp";

    beforeEach(function() {
      Vue.$_instanceMap = {};
    });

    it("when options has 'vueInstanceName' property, Vue.getInstance() with 'vueInstanceName' return that instance", function() {
      new Vue({
        vueInstanceName: instanceName
      });

      expect(Vue.getInstance(instanceName).constructor).toBe(Vue);
    });

    it("when options hasn't 'vueInstanceName' property, that Vue instance doesn't stored", function() {
      new Vue({});

      expect(Vue.$_instanceMap).toEqual({});
    });

    it("when same name instance exist, Vue.getInstance() return first stored instance", function() {
      const firstInstance = new Vue({
        vueInstanceName: instanceName
      });

      new Vue({
        vueInstanceName: instanceName
      });

      expect(Vue.getInstance(instanceName)).toBe(firstInstance);
    });

    it("when Vue instance destoryed, Vue.getInstance() return undefined", function() {
      const instance = new Vue({
        vueInstanceName: instanceName
      });

      instance.$destroy();

      expect(Vue.getInstance(instanceName)).toBeUndefined();
    });
  });
});
