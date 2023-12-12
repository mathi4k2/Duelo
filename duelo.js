class carta {
    constructor (name,cost){
        this.name=name;
        this.cost=cost;
    }
}

class unit extends carta {
    constructor(name,cost,power,res){
        super(name,cost);
        this.power=power;
        this.res=res;
    }
    attack (target){
        target.res-= this.power;
    }
}

class effect extends carta {
    constructor(name,cost,description,powerEffect,resEffect){
        super(name,cost);
        this.powerEffect=powerEffect;
        this.resEffect=resEffect;
        this.description=description;
    }

    applyEffect(target) {
        if (target instanceof unit){
            if (this.powerEffect !== undefined) {
                target.power += this.powerEffect;
            }

            if (this.resEffect !== undefined) { 
                target.res += this.resEffect;
            }
        }
    }
}

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.vida = 20;
        this.mano = [];
        this.cartasEnJuego = [];
    }

    recibirDanio(danio) {
        this.vida -= danio;
        console.log(`${this.nombre} ha recibido ${danio} puntos de daño. Vida restante: ${this.vida}`);
    }

    jugarCarta(cartas, objetivo) {
        if (cartas instanceof Array) {
            cartas.forEach(carta => {
                // Lógica para jugar una carta y aplicar efectos
                if (carta instanceof effect) {
                    carta.applyEffect(objetivo);
                    console.log(`${this.nombre} juega "${carta.name}" en "${objetivo.name}"`);
                } else if (carta instanceof unit) {
                    this.cartasEnJuego.push(carta);
                    console.log(`${this.nombre} convoca a "${carta.name}"`);
                }
            });
        } else {
            // Lógica para jugar una sola carta y aplicar efectos
            if (cartas instanceof effect) {
                cartas.applyEffect(objetivo);
                console.log(`${this.nombre} juega "${cartas.name}" en "${objetivo.name}"`);
            } else if (cartas instanceof unit) {
                this.cartasEnJuego.push(cartas);
                console.log(`${this.nombre} convoca a "${cartas.name}"`);
            }
        }
    }

    atacar(objetivo) {
        this.cartasEnJuego.forEach(carta => {
            if (carta instanceof unit) {
                carta.attack(objetivo);
                console.log(`${this.nombre} tiene el ataque "${carta.name}" -> "${objetivo.name}"`);
            }
        });
    }
}

// Crear cartas
const ninjaredbelt = new unit('Ninja Cinturón Rojo', 3, 3, 4);
const ninjablackbelt = new unit('Ninja Cinturón Negro', 4, 5, 4);
const hardalgo = new effect('Algoritmo duro', 2, 'aumentar la resistencia del objetivo en 3', undefined, 3);
const recject = new effect('Rechazo de promesa no controlada', 1, 'reducir la resistencia del objetivo en 2', undefined, -2);
const coupleprog = new effect('Programación en pareja', 3, 'aumentar el poder del objetivo en 2', 2, undefined);

// Crear jugadores
const jugador1 = new Jugador("Jugador 1");
const jugador2 = new Jugador("Jugador 2");

// Turno 1
jugador1.jugarCarta(ninjaredbelt, null);

// Turno 1
jugador1.jugarCarta(hardalgo, ninjaredbelt);

// Turno 2
jugador2.jugarCarta(ninjablackbelt, null);

// Turno 2
jugador2.jugarCarta(recject, ninjaredbelt);

// Turno 3
jugador1.jugarCarta(coupleprog, ninjaredbelt);

// Turno 3
jugador1.atacar(ninjablackbelt);
