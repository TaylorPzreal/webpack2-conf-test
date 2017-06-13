export default (ngModule) => {
  ngModule.controller('UCCollectionCtrl', ['$scope', ($scope) => {
    console.warn('收藏信息');

    // 建造者模式
    const Human = function (param) {
      
      this.skill = param && param.skill || '保密';
      this.hobby = param && param.hobby || '保密';
    };

    Human.prototype = {
      getSkill: function () {
        return this.skill;
      },
      getHobby: function () {
       return this.hobby;
      }
    };

    const Named = function (name) {
      
      const that = this;

      (function (name, that) {
        that.wholeName = name;
        if(name.indexOf(' ') > -1) {
          that.FirstName = name.slice(0, name.indexOf(' '));
          that.SecondName = name.slice(name.indexOf(' '));
        }
      })(name, that);
    };

    const Work = function (work) {

      const that = this;

      (function (work, that) {
        switch(work) {
          case 'code':
            that.work = '工程师';
            that.workDescript = '沉迷编程不能自拔';
            break;
            case 'UI':
            default: 
            that.work = '设计师';
            that.workDescript = 'Beautify the world.';
        }
      })(work, that);
    };

    Work.prototype.changeWork = function (work) {
      this.work = work;
    };

    Work.prototype.changeDescript = function (descript) {
      this.workDescript = descript;
    };

    const Collection = function (...colc) {
      this.collection = colc.length > 0 ? colc.join(', ') : '暂无收藏';
    };

    Collection.prototype.addCollection = function (...colc) {
      this.collection = this.collection === '暂无收藏' ? `${colc.join(', ')}` : `, ${colc.join(', ')}`;
    };

    const Person = function (name, work) {

      const _person = new Human();

      _person.name = new Named(name);
      _person.work = new Work(work);
      _person.collection = new Collection();

      return _person;
    };

    const person = new Person('wang xiaoming', 'code');

    console.warn(person);
    console.warn(person.name.FirstName, person.name.SecondName, person.work.work, person.work.workDescript, person.skill, person.getSkill(), person.collection.collection);
    person.collection.addCollection('UI', 'UE', 'Bar', 'CodeMan');
    console.warn(person.collection.collection);

  }]);
};
