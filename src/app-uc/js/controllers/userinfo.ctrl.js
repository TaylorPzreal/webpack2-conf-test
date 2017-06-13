export default (ngModule) => {

  ngModule.controller('UCUserinfoCtrl', ['$scope', ($scope) => {
    console.warn('User info');

    // some test code

    /**
     * Person 对象
     */
    function Person() {

      this.name = null;
      this.age = null;
      this.location = null;
      this.phone = null;
    }

    Person.prototype.setInfo = (obj) => {

      this.name = obj.name;
      this.age = obj.age;
      this.location = obj.location;
      this.phone = obj.phone;
    };

    Person.prototype.getInfo = () => {

      console.warn(this.name, this.age, this.location, this.phone);
    };

    const person1 = new Person();
    person1.setInfo({
      name: '小明',
      age: 24,
      location: 'Beijing',
      phone: 13344445555
    });
    person1.getInfo();

    const person2 = new Person();
    person2.setInfo({
      name: '小李',
      age: 20,
      location: 'US',
      phone: 15546467878
    });
    person2.getInfo();

  }]);
};
