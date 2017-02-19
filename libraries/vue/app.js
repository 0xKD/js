function randColor() {
  return parseInt(Math.random() * 256);
}

function getRandRgb() {
  return 'rgb(' + randColor() + ', ' + randColor() + ', ' + randColor() + ')';
}

var num = 3;

// custom component
Vue.component('my-list', {
  template: '<ul>' +
    '<li v-for="item in items">{{ item }}</li>' +
  '</ul>',
  /*
   * the component will accept the following custom attributes
   * used like this: v-bind:items="some_thing"
   */
  props: ['items']
});

Vue.component('descr', {
  template: '<p class="small text-muted inline">' +
    '<mark>#app-{{ num++ }}</mark>' +
    '<span class="font-italic">({{ csthings }})</span>' +
  '</p>',
  props: ['things'],
  computed: {
    csthings: function() {
      return this.things.join(', ');
    }
  }
});

(function() {
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello, World!'
    }
  });

  var app2 = new Vue({
    el: '#app-2',
    data: {
      hoverText: "IS THIS SPARTA? " + new Date(),
      message: "Watch me",
      unchanged: true,
      style: {
        color: '#4e4e4e',
      }
    },
    /*
     * Methods used in the DOM must be specified.
     * Else, page rendering breaks, and subsequent code fails to run.
     */
    methods: {
      changeColor: function() {
        this.unchanged = false;
        this.style.color = getRandRgb();
      }
    }
  });

  var app3 = new Vue({
    el: '#app-3',
    data: {
      things: ['two-way binding', 'interpolation'],
      input1: null,
      items: ["Red", "Green", "Blue", "Yellow"]
    }
  });

  var app4 = new Vue({
    el: '#app-4',
    data: {
      fruits: ['Mango', 'Orange', 'Pineapple', 'Tomato']
    }
  });
}());
