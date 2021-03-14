const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const nivelActual = document.getElementById('nivel')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuiencia()
        setTimeout(() => {
            this.siguienteNivel()
        }, 500);        
    }

    inicializar() {
        this.toggleBtnEmpezar()
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.nivel = 1
        nivelActual.innerHTML = 'Nivel: ' + this.nivel
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuiencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    trasnformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    trasnformarColorANumero(numero) {
        switch (numero) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3 
        }
    } 

    iluminarSecuencia() {
        for (let index = 0; index < this.nivel; index++) {
            const color = this.trasnformarNumeroAColor(this.secuencia[index])
            setTimeout(() => this.iluminarColor(color), 1000 * index); 
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => {
            this.colores[color].classList.remove('light') 
        }, 500);
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminareventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.trasnformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                nivelActual.innerHTML = 'Nivel: ' + this.nivel
                this.eliminareventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                }else{
                    setTimeout(() => this.siguienteNivel(), 1500)
                }
            }

        }else{
            this.perdioElJuego()
        }   
    }

    ganoElJuego(){
        swal("Felicitaciones", "Ganaste el juego!", "success").then(() => {
            this.inicializar()
        })
    }

    perdioElJuego(){
        swal("Perdiste", "Siguelo intentando", "error").then(() => {
            this.eliminareventosClick()
            this.inicializar()
        })
    }

}

function empezarJuego() {
    window.juego = new Juego()
}