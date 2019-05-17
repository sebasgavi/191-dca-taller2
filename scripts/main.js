var inputNombre = document.getElementById('nombre');
window.nombre = '';
inputNombre.addEventListener('input', function(){
    console.log(inputNombre.value);
    window.nombre = inputNombre.value;
});

new p5(function(sketch){

    var logica = new Logica(sketch);

    sketch.setup = function(){
        sketch.createCanvas(400,400);
    }

    sketch.preload = function(){
        logica.precargar();
    }

    sketch.draw = function(){
        logica.pintar();
    }

    sketch.mousePressed = function(){
        logica.mouse();
    }

    sketch.keyPressed = function(){
        logica.teclado();
    }
});