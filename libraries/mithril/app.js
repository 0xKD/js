(function() {
  var todo = {};

  todo.Todo = function(data) {
    this.description = m.prop(data.description);
    this.done = m.prop(false);
  };

  todo.TodoList = Array;

  todo.vm = (function(){
    var vm = {};
    vm.init = function() {
      vm.list = new todo.TodoList();
      vm.description = m.prop("");

      vm.add = function() {
        if (vm.description()) {
          vm.list.push(new todo.Todo({description: vm.description()}));
          vm.description("");
        }
      };
    };
    return vm;
  }());

  todo.controller = function(){
    todo.vm.init();
  };

  todo.view = function() {
    return m("div", [
      m("input", {
        value: todo.vm.description(),
        onchange: m.withAttr("value", todo.vm.description)
      }),
      m("button", {onclick: todo.vm.add}, "Add"),
      m("ul", [
        todo.vm.list.map(function(task, index) {
          return m("li", [
            m("label", {class: "task-done-" + task.done()}, task.description(), [
              m("input[type=checkbox]", {
                onclick: m.withAttr("checked", task.done),
                checked: task.done()
              })
            ])
          ]);
        })
      ])
    ]);
  };

  m.mount(document.getElementById('app'), {
    controller: todo.controller,
    view: todo.view
  });
}());
