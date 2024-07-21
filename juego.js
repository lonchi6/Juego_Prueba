let jugador;
let alturaobj;
let disparos = [];
let enemigo;
let suelo;
let bordederecho, bordeizq, bordearr, bordeabj;
let canvasWidth = 800;
let canvasHeight = 800;
let velocidad_e = 0.01;
let contador_hit = 0;
let contador_kill=0;


function setup() {
    new Canvas(800, 800);
    world.gravity = 1;
    
    jugador = new Sprite();
    jugador.width = 50;
    jugador.height = 50;
    jugador.shape = 'circle';
    jugador.diameter = 50;
    jugador.image = './assets/img/personaje/personaje1.png';
    jugador.rotation = 50;
    jugador.friction = 0.1; // Ajustar la fricción del jugador si es necesario
    jugador.damping = 0.9;
    jugador.drag = 10;
    jugador.position.x=400;
    jugador.position.y=700;
    jugador.collider = 'none';

    
    

    enemigo = crearEnemigo(); // Crear el enemigo inicialmente


    disparo = new Group();
    disparo.speed = 3;
    disparo.width = 5;
    disparo.height = 5;
    disparo.diameter = 50;
    disparo.shape = 'circle';

    bordederecho = new Sprite();
    bordederecho.width = 1;
    bordederecho.height = canvasHeight;
    bordederecho.position.x = canvasWidth;
    bordederecho.collider = 'static';

    bordeizq = new Sprite();
    bordeizq.width = 1;
    bordeizq.height = canvasHeight;
    bordeizq.position.x = 0;
    bordeizq.collider = 'static';

    bordearr = new Sprite();
    bordearr.width = canvasWidth;
    bordearr.height = 1;
    bordearr.position.y = 0;
    bordearr.collider = 'static';

    bordeabj = new Sprite();
    bordeabj.width = canvasWidth;
    bordeabj.height = 1;
    bordeabj.position.y = canvasHeight;
    bordeabj.collider = 'static';
}

function draw() {
    cruceta();
    cursorSprite.moveTowards(0,0,2);
    movimiento();
    tiro();
    colisionPj();
    enemigos();
    
    for (let i = disparos.length - 1; i >= 0; i--) {
        let d = disparos[i];
        if (d.collides(bordederecho) || d.collides(bordeizq) || d.collides(bordearr) || d.collides(bordeabj)) {
            d.remove(); // Elimina el disparo si está fuera de los límites del canvas
            disparos.splice(i, 1); // Elimina el disparo del array
        } else if (d.collides(enemigo)) {
            contador_hit++;
            d.remove();
            disparos.splice(i, 1);
            velocidad_e -= 0.001;
        }
    }

    jugador.rotateTowards(mouse, 0.1, 92);
    enemigo.rotateTowards(jugador, 0.1,92);
    cursorSprite.position.x = mouse.x;
    cursorSprite.position.y = mouse.y;
    clear();
    background('grey');
}
function fondos(){
    suelo = new Sprite();
    suelo.image = "./assets/img/fondo/fondo.png";
    suelo.collider ='none';
    suelo.scale=2.5;
}
function movimiento() {
    if (kb.pressing('up') && kb.pressing('left')) {
        jugador.position.y -= 2.82; // Ajuste para mantener la velocidad diagonal constante
        jugador.position.x -= 2.82;
    } else if (kb.pressing('up') && kb.pressing('right')) {
        jugador.position.y -= 2.82;
        jugador.position.x += 2.82;
    } else if (kb.pressing('down') && kb.pressing('left')) {
        jugador.position.y += 2.82;
        jugador.position.x -= 2.82;
    } else if (kb.pressing('down') && kb.pressing('right')) {
        jugador.position.y += 2.82;
        jugador.position.x += 2.82;
    } else {
        if (kb.pressing('up')) {
            jugador.position.y -= 4;
        } else if (kb.pressing('left')) {
            jugador.position.x -= 4;
        } else if (kb.pressing('right')) {
            jugador.position.x += 4;
        } else if (kb.pressing('down')) {
            jugador.position.y += 4;
        }
    }
}

function tiro() {
    if (mouse.presses()) {
        let d = new disparo.Sprite();
        d.position.x = jugador.position.x; // Establecer la posición inicial del disparo en la posición del jugador
        d.position.y = jugador.position.y;
        d.moveTowards(mouse, 0.1);
        disparos.push(d);
    }
}

function colisionPj() {
    if (jugador.collides(bordederecho)) {
        jugador.position.x -= 10;
    }
}
function cruceta(){
    cursorSprite = new Sprite();
    cursorSprite.width = 10;
    cursorSprite.height = 10;
    cursorSprite.image = './assets/img/personaje/puntero.png';
    cursorSprite.collider = 'none';
    cursorSprite.scale = 0.1;

}
function crearEnemigo() {
    let e = new Sprite();
    e.width = 80;
    e.height = 80;
    e.shape = 'circle';
    e.diameter = 60;
    e.image = './assets/img/personaje/zombie.png';
    e.rotation = 50;
    e.friction = 0.1; // Ajustar la fricción del enemigo si es necesario
    e.damping = 0.9;
    e.drag = 10;
    return e;
}

function enemigos() {
    enemigo.moveTowards(jugador, velocidad_e);
    
    if (contador_hit >= 3) {
        enemigo.remove();
        contador_kill++;
        document.getElementById('contador').textContent = contador_kill;
        contador_hit = 0;
        velocidad_e=0.01;
        enemigo = crearEnemigo(); // Crear un nuevo enemigo
    }
}

