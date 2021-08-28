

let memoria = [];
let listaArchivos = []
var numVar=0; //Es contador que cuenta las "VARIABLES" que hay por archivo

let contadorPasoApaso = 0;
var sum = 0;


var arrayVariables = [];
var instrucciones = [];

// De izquierda a derecha en la interfaz
var file = document.getElementById('files');
let btnEncender = document.getElementById('encender');
let btnApagar = document.getElementById('apagar');


let kernel = document.getElementById('kernel');
let memoriaInput = document.getElementById('memoria-input');
let inputAcumulador= document.getElementById('acumulador');
let acomulador = inputAcumulador.value;
var ejecutar = document.getElementById('correrPrograma')//nuevo
let divMemoria = document.getElementById('memoria');




// variables del contenedor footer
let idColumn= document.getElementById('idColumn');
let programa= document.getElementById('programa');
let ins= document.getElementById('ins');
let rb= document.getElementById('rb');
let rlc= document.getElementById('rlc');
let rlp= document.getElementById('rlp');


// no importantes 
let monitor= document.getElementById('monitor-result');//diferente
let modo = document.getElementById('modo');
let impresora= document.getElementById('impresora-result');//diferente
let cerrar = document.getElementById('cerrar');
let infoFooter= document.getElementById('footer-home');
let btnStepbyStep=document.getElementById('stepByStep');

//  array de Id 
let listId= [];
let numId= 0;
//  array de programa
let listPrograma=[];
let listIns=[];
let listRb=[];
let listRlc=[];
let listRlp=[];


file.addEventListener('change', leerArchivo);


function moMemoria() {
    divMemoria.style.display = 'block';
    cerrar.style.display = 'inline-block';
}
function cerrarDiv() {
    divMemoria.style.display = 'none';
    cerrar.style.display = 'none'
}
function ejecutarPasoAPaso(){
  stepByStep(acomulador,filesCH);
  
};


function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}
// let CEP=0
function ejecutarPrograma(){
  console.log('entra al ejecutar programa');
  console.log(`acomulador input${acomulador}`);
  correrArchivo(acomulador,filesCH);
  // CEP++;
  ejecutar.style.display= 'none'
}

function showMemory(varChange,lista,acum){//entra el [2]
  // debugger
  for(l of lista.variables){
      if(varChange== l.nombre){
        for(v of listaArchivos){
          if(varChange === v[1]){
            v[3]=l.valor;
          }
        }
      } 
  }


  let contador = 0;

        let lAcumulador= [acum, 'Acumulador']
        let arrayMemoria= []; 

        let suma = +kernel.value + +listaArchivos.length ;
         
        if(typeof acum == 'object') {
          acum=0;
        }
        arrayMemoria.push(lAcumulador);
        for(let s=1; s<=Number(memoriaInput.value); s++) {
            if(s<=kernel.value) {
                arrayMemoria.push(`${s} CHSO_V2021`);
            } else if(s>kernel.value && s<=suma){
              let commentIndexMemory = listaArchivos[contador].findIndex(comment => comment =='//');
              if (commentIndexMemory !== -1) {
                listaArchivos[contador].splice(commentIndexMemory,1);
              }
                arrayMemoria.push(listaArchivos[contador]);
                  listaArchivos[contador].toString().replaceAll(',',' ');
                  contador++; 
            } else {
                arrayMemoria.push(`${s} - - - - - - `)
            }
  
        }

        let sinEspacios= [];
        let contar;
        for(m of arrayMemoria) {
          contar = m.toString().replaceAll(',', ' ');
          sinEspacios.push(contar);
        }
        
        divMemoria.innerHTML = sinEspacios.join('<br></br>');
        inputAcumulador.value=acum;
}
// console.log(CEP);

