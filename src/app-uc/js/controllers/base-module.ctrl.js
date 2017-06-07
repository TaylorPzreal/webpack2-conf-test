export default (ngModule) => {

  ngModule.controller('BaseModuleCtrl', ['$scope', ($scope) => {
    console.warn('基本个人中心根模型信息');
  }]);


  // Singleton example.
  const singleton = (() => {

    // Instance stores  a referene to the Singleton.
    let instance;

    function init() {

      function privateMethod() {
        console.warn('this is private methoe.');
      }

      const privateVariable = 'this is private variable.';
      const privateNumber = Math.random();

      return {
        publicMethod: () => {
          console.warn('this is public method.');
        },
        publicProperty: 'this is public property.',
        getRandomNumber: () => privateNumber
      };
    }

    return {
      initInstance: () => {
        if(!instance) {
          instance = init();
        }
        return instance;
      }
    };

  })();

  const singleton1 = singleton.initInstance();
  const singleton2 = singleton.initInstance();

  console.warn('singleton test: ', singleton1.getRandomNumber === singleton2.getRandomNumber);


  // Publish/Subscribe Implementation
  const pubsub = {};

  ((myObject) => {

    // Storage for topics that can be broadcast or listened to.
    const topics = {};
    let subUid = -1;

    // Publish or broadcast events of interest with a specific topic name and arguments such as the data to pass alone.
    myObject.publish = (topic, args) => {
      if (!topics[topic]) {
        return  false;
      }

      const subscribers = topics[topic];
      let len = subscribers ? subscribers.length : 0;

      while(len--) {
        subscribers[len].func(topic, args);
      }

      return this;
    };

      // Subscribe to events of interest with a specific topic name and a callback function,
      // to be executed  when the topic/event is observed.
    myObject.subscribe = (topic, func) => {

      if (!topics[topic]) {
        topics[topic] = [];
      }

      const token = (++subUid).toString();
      topics[topic].push({
        token,
        func
      });
      return token;
    };

    // Unsubscribe from a specific topic, based on tokenized reference to the subscription.
    myObject.unsubscribe = (token) => {

      for (const m in topics) {
        if (topics[m]) {
          for(let i = 0, j = topics[m].length; i < j; i++) {
            if (topics[m][i].token === token) {
              topics[m].splice(i, 1);
              return token;
            }
          }
        }
      }
      return this;
    };

  })(pubsub);

  // 订阅
  const subscription = pubsub.subscribe('inbox/newMessage', (topics, data) => {
    console.warn('Logging', topics, ': ', data);
  });

  // 发布
  pubsub.publish('inbox/newMessage', 'hello public/subscribe world.');

  setTimeout(() => {
    pubsub.publish('inbox/newMessage', [1, 2, 'uuu']);

    pubsub.publish('inbox/newMessage', {
      name: 'Morning',
      age: 18
    });
  }, 2000);

  setTimeout(() => {
    pubsub.unsubscribe(subscription);

    pubsub.publish('inbox/newMessage', 'sent message ... ');
  }, 5000);
};
