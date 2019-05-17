class Logica{

    constructor(app){
        this.app = app;

        this.margen = 50;
        this.pos = new p5.Vector(this.app.random(0, this.app.width - this.margen), 300);
        this.vel = new p5.Vector(5, 5);

        var nombresGuardados = JSON.parse(localStorage.getItem('nombres'));
        this.nombres = [];
        if(nombresGuardados != null){
            this.nombres = nombresGuardados;
        }
        

        this.mover = this.mover.bind(this);
        setInterval(this.mover, 100);


        this.lista = [];
        for(var i = 0; i < 10; i++){
            this.lista.push(new Bola(this.app.random(10)));
        }

        this.lista.sort(function(bolaA, bolaB){
            if(bolaA.tam < bolaB.tam){
                return -1;
            } else if(bolaA.tam > bolaB.tam) {
                return 1;
            } 
            return 0;
        });

        

    }

    precargar(){
        this.gif = this.app.createImg('/imagenes/elgif.gif');
        this.gif.size(50, 50);
    }

    getDireccion(){
        if(this.pos.y + this.vel.y > this.app.height - this.margen){
            return this.app.random(Math.PI, Math.PI * 2);
        }
        if(this.pos.x + this.vel.x > this.app.width - this.margen){
            return this.app.random(Math.PI / 2, Math.PI * .75);
        }

        var r = this.app.random(0, 10);
        if(r <= 2){
            return this.app.random(0, Math.PI * 2);
        }

        return this.vel.heading();
    }

    mover(){
        var a = this.getDireccion();
        this.vel.set(5, 0);
        this.vel.rotate(a);
        this.pos.add(this.vel);        
    }

    mouse(){
        this.pos.add(this.vel);

        this.nombres.push(window.nombre);
        localStorage.setItem('nombres', JSON.stringify(this.nombres));
    }

    teclado(){
        this.vel.rotate(this.app.random(0, Math.PI * 2));
    }

    pintar(){
        this.app.background(200);

        this.app.stroke(0);

        this.app.text(window.nombre, this.pos.x, this.pos.y);

        this.app.fill(20, 200, 200);
        this.app.line(0,0,this.pos.x, this.pos.y);
        this.app.ellipse(this.pos.x, this.pos.y, 10, 10);

        this.app.fill(20, 200, 20);
        this.app.line(this.pos.x, this.pos.y, this.pos.x + this.vel.x, this.pos.y + this.vel.y);
        this.app.ellipse(this.pos.x + this.vel.x, this.pos.y + this.vel.y, 5, 5);

        this.app.stroke(200,0,0);
        this.app.line(0, this.app.height - this.margen, this.app.width, this.app.height - this.margen);
        this.app.line(this.app.width - this.margen, 0, this.app.width - this.margen, this.app.height);

        this.gif.position(this.pos.x, this.pos.y);

        for(let i = 0; i < this.nombres.length; i++){
            this.app.text(this.nombres[i], 20, 30 + 15 * i);
        }
    }
}

class Bola{
    constructor(tam){
        this.tam = tam;
    }
}