(function () {
    function sketch(processing) {
        processing.size(300, 300);
        processing.background(205, 225, 255);

        var Ball = function () {
            this.x = 150;
            this.y = 100;
            this.dx = 2;
            this.dy = 4;
            this.radius = 25;
        };

        Ball.prototype.bounce = function () {
            processing.background(205, 225, 255);
            this.x += this.dx;
            this.y += this.dy;
            if ((this.x + this.radius / 2) > processing.width ||
                (this.x - this.radius / 2) < 0) {
                this.dx *= -1;
            }
            if ((this.y + this.radius / 2) > processing.height ||
                (this.y - this.radius / 2) < 0) {
                this.dy *= -1;
            }
            processing.noStroke();
            processing.fill(45, 65, 225, 225);
            processing.ellipse(this.x, this.y, this.radius, this.radius);
        };

        var b = new Ball();

        processing.draw = function () {
            b.bounce();
        };
    }

    var canvas = document.getElementById('ball');
    var processingInstance = new Processing(canvas, sketch);
})();