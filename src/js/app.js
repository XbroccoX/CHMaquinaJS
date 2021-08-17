


let memoria = [];

var numVar=0; //Es contador que cuenta las "VARIABLES" que hay por archivo

let contadorPasoApaso = 0;
var sum = 0;

var arrayEtiquetas = [];
var arrayVariables = [];
var instrucciones = [];

// De izquierda a derecha en la interfaz
var file = document.getElementById('files');
let btnEncender = document.getElementById('encender');
let btnApagar = document.getElementById('apagar');


let kernel = document.getElementById('kernel');
let memoriaInput = document.getElementById('memoria-input');
let inputAcumulador= document.getElementById('acumulador');
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
  stepByStep(instrucciones,contadorPasoApaso,arrayEtiquetas,arrayVariables);
  
};






function stepByStep(lista, contadorPasoAPaso, arrayEtiquetas, arrayVariables){
    if(lista[contadorPasoAPaso][1].toLowerCase() == 'nueva') {
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      
      confirm(`La instruccion es ${unSpace}`)
    }else if(lista[contadorPasoAPaso][1].toLowerCase() == 'etiqueta') {
      
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
    }
    else if(lista[contadorPasoAPaso][1].toLowerCase() =='lea') {//Preguntar al Profe
      for(nombreVar of arrayVariables){
          if(nombreVar.nombre == lista[contadorPasoAPaso][2].trim()){
              let valorNew =prompt(`Ingrese el valor de la variable ${lista[contadorPasoAPaso][2]}`);
              nombreVar.valor= valorNew;
          }
      }
      console.log('lea');
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
      
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='cargue') {
    console.log('entra al cargue');
      for(cargar of arrayVariables){
          if(lista[contadorPasoAPaso][2] == cargar.nombre){
              acumulador=cargar.valor;
              console.log(acumulador);
          }
      }
      inputAcumulador.value = acumulador;
      console.log(acumulador);
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='almacene') {
      for(almacene of arrayVariables){
          if(lista[contadorPasoAPaso][2] == almacene.nombre){
              almacene.valor = acumulador;
          }
      }
      inputAcumulador.value=acumulador;
      
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].trim().toLowerCase() === 'vaya') {
    for(etiquetas of arrayEtiquetas) {
        if(etiquetas.nombre== lista[contadorPasoAPaso][2].trim()) {
            if(etiquetas.sobrepasa == false) {
              contadorPasoApaso = Number(etiquetas.valor)-2;
            }
        }
    }
    console.log('Me salí');
    let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ');

 confirm(`La instruccion es ${unSpace}`);
}else if(lista[contadorPasoAPaso][1].trim().toLowerCase() =='vayasi') {
    if(acumulador > 0) {
      for(e of arrayEtiquetas) {
        if(lista[contadorPasoAPaso][2].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa == false) {
          if(e.valor < lista.length && e.valor >= 0) {
            contadorPasoApaso = Number(e.valor)-2;
          } else {
            alert(`El valor de ${e.nombre} es mayor a la cantidad de instrucciones del programa`)
          }
        }
      }
    } else if(acumulador < 0) {
      for(e of arrayEtiquetas) {
        if(lista[contadorPasoAPaso][3].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa === false) {
          if(e.valor < lista.length && e.valor >= 0) {
            contadorPasoApaso = Number(e.valor)-2;
          } else {
            alert(`El valor de ${e.nombre} es mayor a la cantidad de instrucciones del programa`)
          }
        }
      }
    }
    let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ');

 confirm(`La instruccion es ${unSpace}`);
}else if(lista[contadorPasoAPaso][1].toLowerCase() =='sume') {
      for(sume of arrayVariables){
          if(lista[contadorPasoAPaso][2] == sume.nombre){
            acumulador=Number(acumulador)
            acumulador=Number(acumulador) + Number(sume.valor);
          }
          inputAcumulador.value =acumulador;
      }
      confirm(`el contador va en: ${contadorPasoAPaso}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='reste') {
      for(reste of arrayVariables){
          if(lista[contadorPasoAPaso][2] == reste.nombre){
              acumulador-= reste.valor;
          }else if(lista[contadorPasoAPaso][2] == 'acumulador'){
            acumulador = 0
          }
          inputAcumulador.value = acumulador;
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='multiplique') {
      for(multi of arrayVariables){
          if(lista[contadorPasoAPaso][2] == multi.nombre){
              acumulador= acumulador * multi.valor;
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='divida') {
      for(div of arrayVariables){
          if(lista[contadorPasoAPaso][2] == div.nombre && div.valor != 0){
              acumulador= acumulador / div.valor;
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='potencia') {
      for(potencia of arrayVariables){
          if(lista[contadorPasoAPaso][2] == potencia.nombre && potencia.valor.isInteger()){
              acumulador= acumulador ** potencia.valor;
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='modulo') {
      for(mod of arrayVariables){
          if(lista[contadorPasoAPaso][2] == mod.nombre){
              let modulo= acumulador % mod.valor;
              alert(`El modulo de ${acumulador} % ${mod.valor} = ${modulo}(linea ${mod.id})`);
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='concatene') {
      for(concatene of arrayVariables){
          if(lista[contadorPasoAPaso][2].trim() == concatene.nombre){
              let cad= acumulador +' '+ concatene.valor;
              inputAcumulador.type= 'text';
              acumulador = cad;
              inputAcumulador.value = acumulador;
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='elimine') {
      console.log(acumulador);
      let lol = lista[contadorPasoAPaso][2].trim()
      acumulador=acumulador.replaceAll(lol,'')
      inputAcumulador.value=acumulador;
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].trim() =='Y') {
      let primerOperando = 0;
      let segundoOperando = 0;
      for(v of arrayVariables) {
          if(lista[contadorPasoAPaso][2].trim() == v.nombre) {
              console.log(v.valor);
              primerOperando = v.valor;
              console.log(`El valor de ${v.nombre} = ${v.valor}`)
          }
          if (lista[contadorPasoAPaso][3].trim() == v.nombre) {
              console.log(v.valor);
              segundoOperando = v.valor;
              console.log(`El valor de ${v.nombre} = ${v.valor}`)
          }
          if(lista[contadorPasoAPaso][4].trim() == v.nombre) {
              console.log(v.nombre);
              if(primerOperando && segundoOperando == 1) {
                  v.valor = 1;
                  console.log(`El valor de ${v.nombre} = ${v.valor}`)
              } else if (primerOperando && segundoOperando == 0) {
                  v.valor = 0;
                  console.log(`El valor de ${v.nombre} = ${v.valor}`)
              }
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].trim() =='O') {
      let primerOperando = 0;
      let segundoOperando = 0;
      for(v of arrayVariables) {
          if(lista[contadorPasoAPaso][2].trim() == v.nombre) {
              console.log(v.valor);
              primerOperando = v.valor;
              console.log(`El valor de ${v.nombre} = ${v.valor}`);
          }
          if (lista[contadorPasoAPaso][3].trim() == v.nombre) {
              console.log(v.valor);
              segundoOperando = v.valor;
              console.log(`El valor de ${v.nombre} = ${v.valor}`)
          }
          if(lista[contadorPasoAPaso][4].trim() == v.nombre) {
              console.log(v.nombre);
              if(primerOperando || segundoOperando == 1) {
                  v.valor = 1;
                  console.log(`El valor de ${v.nombre} = ${v.valor}`)
              }else if (primerOperando || segundoOperando == 0) {
                  v.valor = 0;
                  console.log(`El valor de ${v.nombre} = ${v.valor}`)
              }
          }
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].trim() =='NO') {
    let enNegativo 
    for(v of arrayVariables){
      if(lista[contadorPasoAPaso][2].trim()==v.nombre){
        if(v.tipo == 'L') {
          if(v.valor == 0) {
            enNegativo = 1;
          } else {
            enNegativo = 0;
          }
        }
      }
    }
    console.log(`${lista[contadorPasoAPaso][1]} = ${v.valor}`);
    for(v of arrayVariables){
      if(lista[contadorPasoAPaso][3].trim() == v.nombre) {
        v.valor = enNegativo;
      }
    }
    console.log(`${lista[contadorPasoAPaso][1]} = ${v.valor}`);

  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='muestre') {
      if(lista[contadorPasoAPaso][2].toUpperCase().trim() == 'ACUMULADOR'){
          monitor.innerHTML= `El resultado de (${lista[contadorPasoAPaso][2]}) es: ${acumulador}`;
      }
      else{
          for(muestre of arrayVariables ){
              if(lista[contadorPasoAPaso][2].trim() == muestre.nombre){
                      console.log(muestre.valor);
                      monitor.innerHTML= `El resultado de (${lista[contadorPasoAPaso][2]}) es igual a --> ${muestre.valor}`;
              }  
          } 
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='imprima') {
      if(lista[contadorPasoAPaso][2].toUpperCase().trim() == 'ACUMULADOR'){
          impresora.innerHTML= `El resultado de (${lista[contadorPasoAPaso][2]}) es: ${acumulador}`;
      }
      else{
          for(muestre of arrayVariables ){
              if(lista[contadorPasoAPaso][2].trim() == muestre.nombre){
                      console.log(muestre.valor);
                      impresora.innerHTML= `El resultado de (${lista[contadorPasoAPaso][2]})es igual a ------> ${muestre.valor}`;
              }  
          } 
      }
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase() == 'extraiga'){
      longitud= acumulador.length;
      console.log(`la longitud del acumulador es ${longitud}`);
      let extraer = [];
      for(i=0; i<Number(lista[contadorPasoAPaso][2]); i++) {
          extraer.push(acumulador[i]);
      }
      acumulador = extraer.join('');
      inputAcumulador.value=acumulador;
      /* acumulador = acumulador.slice(Number(contadorPasoAPaso[2]));
      console.log(acumulador); */
      // inputAcumulador.value = acumulador;
      // acumulador=acumulador.slice(Number(lista[contadorPasoAPaso][2]));
      // console.log(acumulador);
      // 
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }else if(lista[contadorPasoAPaso][1].toLowerCase().trim() =='retorne') {
      
    let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
    confirm(`La instruccion es ${unSpace}`)
    btnStepbyStep.style.display='none';
  }else if(lista[contadorPasoAPaso][1].toLowerCase() =='raiz') { /* toma la raiz cuadrada del código */
      for(raiz of arrayVariables){    
          if(lista[contadorPasoAPaso][2].trim() == raiz.nombre){
              let ra= raiz.valor;
              let resultadoRaiz= Math.sqrt(ra);
              
          }
      }
      console.log(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
      alert(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
      let unSpace= lista[contadorPasoAPaso].toString().replaceAll(',',' ')
      confirm(`La instruccion es ${unSpace}`)
  }
  showMemory(lista[contadorPasoAPaso][2],lista, arrayVariables,acumulador);
  contadorPasoApaso++;
  
}


function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function ejecutarPrograma(){
  console.log('entra al ejecutar programa');
  correrArchivo(instrucciones, 0,instrucciones.length, arrayEtiquetas, arrayVariables,0,filesCH);
  
  ejecutar.style.display= 'none'
}

function showMemory(varChange,lista, variables,acum){//entra el [2]
  for(l of lista){
      if(varChange== l[1]){
        for(v of variables){
          if (varChange == v.nombre && varChange) {
            l[2]=v.valor;
          }
        }
    }
  }
  let contador = 0;
        
        
        
        let suma = +kernel.value + +lista.length;
        
        if(typeof acum == 'object') {
          acum=0;
        }
        let lAcumulador= [acum, 'Acumulador'];
        let arrayMemoria= []; 
        let mostrarOperaciones = [];
        let contenemos;
        arrayMemoria.push(lAcumulador);
        for(let s=1; s<Number(memoriaInput.value); s++) {
            if(s<=kernel.value) {
                arrayMemoria.push(`${s} CHSO_V2021`);
            } else if(s>kernel.value && s<=suma){
                arrayMemoria.push(lista[contador]);
                contenemos = lista[contador].toString().replaceAll(',',' ')
                mostrarOperaciones.push(contenemos);
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

}

