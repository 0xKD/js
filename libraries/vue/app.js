function randColor() {
  return parseInt(Math.random() * 256);
}

function getRandRgb() {
  return 'rgb(' + randColor() + ', ' + randColor() + ', ' + randColor() + ')';
}

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
      items: ["Red", "Green", "Blue", "Yellow"]
    }
  });
}());
