let memoria = [];
var lFinal = [];
var numVar=0;

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




function apagar() {
    location.reload()
    kernel.disabled = false;
    memoriaInput.disabled = false;
    btnApagar.style.display = 'none';
    btnEncender.style.display = 'inline-block';
    modo.innerHTML = 'Modo kernel';
    files.disabled = true;
}

file.addEventListener('change', leerArchivo);

function leerArchivo(evento) {
    //console.log(evento.target.files);
    for(let i=0; i<evento.target.files.length; i++) {
    document.getElementById('instrucciones').innerHTML = "";
    document.getElementById('variables').innerHTML = "";
    document.getElementById('etiquetas').innerHTML = "";
    let archivo = evento.target.files[i];
    let name= evento.target.files[i].name;
    procesarArchivo(archivo, function(result) {
    let lArchivo = [];
    lArchivo = result.split('\n');
    for(let i=0; i<lArchivo.length; i++) {
        if(lArchivo[i] == "") {
            lArchivo.splice(i, 1);
            i--;
        }
    }
    for(let i=0; i<lArchivo.length; i++) {
        if(lArchivo[i].length == 1) {
            lArchivo.splice(i, 1);
            i--;
        }
        if(lArchivo[i].includes('//')) {
            lArchivo.splice(i,1);
            i--;
        }
    }

    let listaPrueba = [];
    let listaFile=[];
    for(instruccion of lArchivo) {
        instruccion=instruccion.trim()
        listaPrueba.push(instruccion.split(' '))
        listaFile.push(instruccion.split(' '))
    }
    for(l of lArchivo) {
        for(let j = 0; j< l.length; j++) {
            if(l[j] == '') {
                l.splice(j,1);
                j--
            }else{
                l[j] = l[j].trim();
            }
        }
    }
    for(l of listaPrueba) {
      for(let j = 0; j< l.length; j++) {
          if(l[j] == '') {
              l.splice(j,1);
              j--;
          } else {
              l[j] = l[j].trim();
          }

      }
  }
    
    let bool = verificarSintaxis(listaPrueba);
    sum = sum + +listaPrueba.length + numVar;
    // console.log(sum);
    console.log(listaPrueba);
    console.log(`Sum es = ${sum} y kernel es = ${kernel.value}`);
    if(bool.length === 0 && (sum + Number(kernel.value)) <= Number(memoriaInput.value)) {
          let cf = 0;
          let arrayVariablesIndividual=[];
          for(l of listaPrueba) {
            if(l[0].toString().toLowerCase() == 'nueva') {
              let valor = [];
              if(l[2].toUpperCase()== 'C') {
                  for(let i = 4; i<l.length; i++) {
                      valor.push(l[i]);
                  }
                  
                  valor = valor.toString();
                  valor = valor.replaceAll(',', " ");
                  let total = Number(listaPrueba.length)+Number(kernel.value)+1;
                  arrayVariables.push(new Nueva(total, l[1], l[2], valor, name));
                  arrayVariablesIndividual.push(new Nueva(total, l[1], l[2], valor, zeroFill(numId,3)))
                  listaPrueba.push([total, arrayVariables[cf].nombre, arrayVariables[cf].valor]); //Aquí se agregan las variables
                  cf++;
              } else {
                let total = Number(listaPrueba.length)+Number(kernel.value)+1;
                arrayVariables.push(new Nueva(total, l[1], l[2], l[3], name));
                arrayVariablesIndividual.push(new Nueva(total, l[1], l[2], l[3], zeroFill(numId,3)));
                listaPrueba.push([total, arrayVariables[cf].nombre, arrayVariables[cf].valor]);  //Aquí se agregan la variables 
                cf++;
              }
            }
          }
          for(let i = 0; i<listaPrueba.length; i++) {
            for(let j = 0; j<Number(memoriaInput.value); j++) {
              if(listaPrueba[i][0] == j) {
                listaPrueba[i].splice(0, 1)
              }
            }
          }
          numVar=arrayVariables.length


        for(instruccion of listaPrueba) {
          // while (listaPrueba.length <= listaPrueba[listaPrueba.length-1][0]) {
            
          // }
            lFinal.push(instruccion)
        }
        let cont = Number(kernel.value) + 1;
        let caracteres=[]
        for(recorrer of lFinal) {
            if(recorrer[0] == cont) {
                recorrer.shift();
            }
            cont++
        }
        let w = Number(kernel.value)+1;
        let e = Number(kernel.value)+1;
        for(k of listaFile){
          k.unshift(e)
          caracteres.push(k.toString().replaceAll(',',' '))
          e++;
        }
        


        for(k of lFinal) {
            k.unshift(w);
            w++;
        }
      
        
        
        let contador = 0;
        let lAcumulador= [0, 'Acumulador']
        let arrayMemoria= []; 
        let mostrarOperaciones = [];
        let contenemos;
        
        
        let suma = +kernel.value + +lFinal.length;
        
        arrayMemoria.push(lAcumulador);
        for(let s=1; s<=Number(memoriaInput.value); s++) {
            if(s<=kernel.value) {
                arrayMemoria.push(`${s} CHSO_V2021`);
            } else if(s>kernel.value && s<=suma){
                arrayMemoria.push(lFinal[contador]);
                contenemos = lFinal[contador].toString().replaceAll(',',' ')
                mostrarOperaciones.push(contenemos);
                contador++; 
            } else {
                arrayMemoria.push(`${s} - - - - - - `)
            }

        }
        console.log(mostrarOperaciones);
        
        // console.log(arrayMemoria);
        // document.getElementById('memoria').innerHTML = arrayMemoria.join('<br></br>');
        instrucciones = arrayMemoria.slice(+kernel.value+1, +suma+1);
        //Mostrar operaciones en el contenedor sin comas
        
        let listaVariables = [];
        let listaEtiquetas = []; //Lista para variables y etiquetas para Mostrar en el div
        for(linea of instrucciones) {
            if(linea[1].toString().toLowerCase()== 'nueva') {
                listaVariables.push(linea)
            } else if(linea[1].toString().toLowerCase() == 'etiqueta') {
            let bandera;
            if(linea[3] > instrucciones.length) {
                bandera = true;
            } else {
                bandera = false;
            }
            arrayEtiquetas.push(new Etiqueta(linea[0], linea[2], linea[3], bandera));
            listaEtiquetas.push(linea);
            }
        }
        
        // Seguimiento de variables en contenedor MEMORIA
        
          //ARRAY DE INTERFAZ 
          



          // Agrega en el footer las lineas
            // id
          listId.push(zeroFill(numId,3))
          numId++;
            //PRGRAMA
          listPrograma.push(name)
            // INs
          listIns.push(listaPrueba.length-arrayVariablesIndividual.length)
            //RB
          listRb.push(listaPrueba[0][0])
            //RLC
          listRlc.push(listaPrueba[listaPrueba.length-1][0]-arrayVariablesIndividual.length)
            //RLP
          let rlpValor= listaPrueba[listaPrueba.length-1][0];
          listRlp.push(Number(rlpValor))

          // agrega en el interfaz
          idColumn.innerHTML= listId.join('</br>');
          programa.innerHTML= listPrograma.join('</br>');
          ins.innerHTML= listIns.join('</br>');
          rb.innerHTML= listRb.join('</br>');
          rlc.innerHTML= listRlc.join('</br>');
          rlp.innerHTML= listRlp.join('</br>');


        let sinEspacios= [];
        let contar;
        for(m of arrayMemoria) {
          contar = m.toString().replaceAll(',', ' ');
          sinEspacios.push(contar);
        }
        
        document.getElementById('memoria').innerHTML = sinEspacios.join('<br></br>');
        
        
        
        document.getElementById('instrucciones').innerHTML= caracteres.join('<br></br>');
        for(l of listaVariables) {
          let va = document.createElement('span');
          va.append(`${l[0]} ${l[2]}`);
          document.getElementById('variables').appendChild(va);
        }
        for(l of listaEtiquetas) {
          let eti = document.createElement('span');
          eti.append(`${l[0]} ${l[2]}`);
          document.getElementById('etiquetas').appendChild(eti);
        }
        ejecutar.style.display = 'inline-block';
        btnStepbyStep.style.display='inline-block'

      }else {
          if(sum + Number(kernel.value) >  Number(memoriaInput.value)){
            alert(`Error: se excede el espacio de memoria`)
            document.getElementById('instrucciones').innerHTML = 'Error de sintaxis';
            
          }
          else{
              for (let err = 0; err < bool.length; err++) {
                alert(bool[err]);
              }
              location.reload()
          }
        }
      })
    }
  }
    function verificarSintaxis(lista) {

        let errores = [];
      
        //Listas para almacenar los nombres y valores de las variables
        let valoresVariables = [0];
        let nombreVariables = ['acumulador'];
      
        //Etiquetas
        direccionEtiqueta = [];
        nombreEtiqueta = [];
      
        for(let instruccion=0; instruccion < lista.length; instruccion++) {
      
          let linea = "";
      
          for (let index = 0; index < lista[instruccion].length; index++) {
            linea += " " + lista[instruccion][index];
          }
      
          if(lista[instruccion][0].toLowerCase() == 'nueva') {
                
            if (lista[instruccion].length > 4) {
              errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
            }else if (lista[instruccion].length < 3) {
              errores.push("Error de sintaxis, menos de 3 operadores especificados: " + linea);
            }
            switch (lista[instruccion][2]) {
      
              case "C":
                if (lista[instruccion].length == 3) {
                  valoresVariables.push("");
                }
                break;
      
              case "I":
                if (lista[instruccion].length > 3) {
                  let num = lista[instruccion][3]; 
                  let verificList = [1,2,3,4,5,6,7,8,9,0]
                  for (let i = 0; i < lista[instruccion].length; i++) {
                    if (!(verificList.includes(Number(num)))){
                        errores.push("Error de sintaxis, el tipo de dato no es un entero: " + linea);
                        break;
                    }
                  }
                }else{
                  valoresVariables.push("0");
                }
                break;
              
              case "R":
                if (lista[instruccion].length > 3) {
                  let num = lista[instruccion][3]; 
                  let verificList = ["1","2","3","4","5","6","7","8","9","0","."]
                  for (let i = 0; i < lista[instruccion].length; i++) {
                    if (!((verificList.includes(num)))){
                        errores.push("Error de sintaxis, el tipo de dato no es un Real/Decimal: " + linea);
                        break;
                    }
                  }
                }else{
                  valoresVariables.push("0");
                }
                break;
      
              case "L":
                if (lista[instruccion].length > 3) {
                  if (!(lista[instruccion][3]==("0")) && !(lista[instruccion][3]==("1"))) {
                    errores.push("Error de sintaxis, el tipo de dato no es un Boolean: " + linea);
                    break;
                  }
      
                } else {
                  valoresVariables.push("0");
                }
                break;
      
              default:
                errores.push("Error de sintaxis, no se reconoce el tipo de variable: " + linea);
            }
       
            nombreVariables.push(lista[instruccion][1]);
            if (lista[instruccion].length == 4) {
              valoresVariables.push(lista[instruccion][3]);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='lea') {
            
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
      
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='cargue') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada: " + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='almacene') {
            
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='vaya') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='vayasi') {
      
            if (lista[instruccion].length > 3) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 3) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='etiqueta') {
      
            if (lista[instruccion].length > 3) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 3) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            
            let num = lista[instruccion][2]; 
            let verificList = "1234567890";
            for (let i = 0; i < num.length; i++) {
              if (!(verificList.includes(num[i]))){
                errores.push("Error de sintaxis, el tipo de dato no es un número: " + linea);
              }
            }
            direccionEtiqueta.push(instruccion[2]);
            nombreEtiqueta.push(lista[instruccion][1]);
            
          }else if(lista[instruccion][0].toLowerCase() =='sume') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada  :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='reste') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() == 'multiplique') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='divida') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada  :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() == 'potencia') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() == 'modulo') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='concatene') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada :" + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='elimine') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
                errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
                errores.push("La variable " + lista[instruccion][1] + " no ha sido creada: " + linea);
            }
      
          }else if(lista[instruccion][0] =='Y') {
      
            if (lista[instruccion].length > 4) {
              errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 4) {
              errores.push("Error de sintaxis, menos de 4 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada: " + linea);
            }else{
              if (!(nombreVariables.includes(lista[instruccion][2]))) {
                errores.push("La variable " + lista[instruccion][2] + " no ha sido creada: " + linea);
              }else{
                if (!(nombreVariables.includes(lista[instruccion][3]))) {
                  errores.push("La variable " + lista[instruccion][3] + " no ha sido creada: " + linea);
                }
              }
            }
      
          }else if(lista[instruccion][0] == 'O') {
      
            if (lista[instruccion].length > 4) {
              errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 4) {
              errores.push("Error de sintaxis, menos de 4 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada:" + linea);
            }else{
              if (!(nombreVariables.includes(lista[instruccion][2]))) {
                errores.push("La variable " + lista[instruccion][2] + " no ha sido creada: " + linea);
              }else{
                if (!(nombreVariables.includes(lista[instruccion][3]))) {
                  errores.push("La variable " + lista[instruccion][3] + " no ha sido creada: " + linea);
                }
              }
      
            }
      
          }else if(lista[instruccion][0].toUpperCase() =='NO') {
      
            if (lista[instruccion].length > 3) {
              errores.push("Error de sintaxis, más de 3 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 3) {
              errores.push("Error de sintaxis, menos de 4 operadores especificados: " + linea);
            }
            if (!( lista[instruccion].includes(lista[instruccion][1]))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada: " + linea);
            }else{
              if (!( lista[instruccion].includes(lista[instruccion][2]))) {
                errores.push("La variable " + lista[instruccion][2] + " no ha sido creada: " + linea);
              }
            }
      
          }else if(lista[instruccion][0].toLowerCase() == 'muestre') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1])) && !(lista[instruccion][1]==("acumulador")) ) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada: " + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() == 'imprima') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 2) {
              errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
            }
            if (!(nombreVariables.includes(lista[instruccion][1])) && !(lista[instruccion][1]==("acumulador"))) {
              errores.push("La variable " + lista[instruccion][1] + " no ha sido creada: " + linea);
            }
      
          }else if(lista[instruccion][0].toLowerCase() =='retorne') {
      
            if (lista[instruccion].length > 2) {
              errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
            }
            if (lista[instruccion].length < 1) {
              errores.push("Error de sintaxis, menos de 1 operadores especificados: " + linea);
            }
          } else {
            errores.push("No se reconoce la intrucción: " + linea);
          }
        }
        return errores;
      }


function procesarArchivo(ch, callback) {
    var reader = new FileReader();
    reader.readAsText(ch);
    reader.onload = function () {
        callback(reader.result);
    }
}

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
function correrArchivo(lista,inicio,fin, arrayEtiquetas, arrayVariables, acumulador){
    
    console.log(lista);
    for(let instruccion = inicio; instruccion<fin; instruccion++){
        

        if(lista[instruccion][1].toLowerCase() =='lea') {//Preguntar al Profe
            for(nombreVar of arrayVariables){
                if(nombreVar.nombre == lista[instruccion][2].trim()){
                    let valorNew =prompt(`Ingrese el valor de la variable ${lista[instruccion][2]}`);
                    nombreVar.valor= valorNew;
                    
                }
            }
            console.log('lea');
            
        }else if(lista[instruccion][1].toLowerCase() =='cargue') {
          
            for(cargar of arrayVariables){
                if(lista[instruccion][2] == cargar.nombre){
                    acumulador=cargar.valor;
                }
            }
            inputAcumulador.value = acumulador;
            
            

        }else if(lista[instruccion][1].toLowerCase() =='almacene') {
            for(almacene of arrayVariables){
                if(lista[instruccion][2] == almacene.nombre){
                    almacene.valor = acumulador;
                    
                }
            }
            
            inputAcumulador.value=acumulador;
            
            
        }else if(lista[instruccion][1].trim().toLowerCase() === 'vaya') {
          for(etiquetas of arrayEtiquetas) {
              if(etiquetas.nombre== lista[instruccion][2].trim()) {
                  if(etiquetas.sobrepasa == false  && etiquetas.valor < lista[instruccion-1]) {
                    instruccion = Number(etiquetas.valor)-2;
                  }
              }
          }
      }else if(lista[instruccion][1].trim().toLowerCase() =='vayasi') {
          if(acumulador > 0) {
            for(e of arrayEtiquetas) {
              if(lista[instruccion][2].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa == false) {
                console.log('Entró a la recursión');
                instruccion = Number(e.valor)-2;
              } else {
              }
            }
          } else if(acumulador < 0) {
            for(e of arrayEtiquetas) {
              if(lista[instruccion][3].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa === false) {
                console.log('Entró a la recursión');
                instruccion = Number(e.valor)-2;
              } 
            }
          }
          console.log('Me salí x2');
          console.log(inicio);
          console.log(fin);
          console.log(instruccion);

      }else if(lista[instruccion][1].toLowerCase() == 'sume') {
            for(sume of arrayVariables){
                if(lista[instruccion][2] == sume.nombre){
                    acumulador=Number(acumulador)
                    acumulador=Number(acumulador) + Number(sume.valor);
                }
                inputAcumulador.value =acumulador;
            }
            
        }else if(lista[instruccion][1].toLowerCase() =='reste') {
            for(reste of arrayVariables){
                if(lista[instruccion][2] == reste.nombre){
                    acumulador-= reste.valor;
                }else if(lista[instruccion][2] == 'acumulador'){
                  acumulador = 0
                }
                inputAcumulador.value = acumulador;
            }
        }else if(lista[instruccion][1].toLowerCase() =='multiplique') {
            for(multi of arrayVariables){
                if(lista[instruccion][2] == multi.nombre){
                    acumulador= acumulador * multi.valor;
                }
            }
        }else if(lista[instruccion][1].toLowerCase() =='divida') {
            for(div of arrayVariables){
                if(lista[instruccion][2] == div.nombre && div.valor != 0){
                    acumulador= acumulador / div.valor;
                }
            }
        }else if(lista[instruccion][1].toLowerCase() =='potencia') {
            for(potencia of arrayVariables){
                if(lista[instruccion][2] == potencia.nombre && potencia.valor.isInteger()){
                    acumulador= acumulador ** potencia.valor;
                }
            }
        }else if(lista[instruccion][1].toLowerCase() =='modulo') {
            for(mod of arrayVariables){
                if(lista[instruccion][2] == mod.nombre){
                    let modulo= acumulador % mod.valor;
                    alert(`El modulo de ${acumulador} % ${mod.valor} = ${modulo}(linea ${mod.id})`);
                }
            }
        }else if(lista[instruccion][1].toLowerCase() =='concatene') {
            for(concatene of arrayVariables){
                if(lista[instruccion][2].trim() == concatene.nombre){
                    let cad= acumulador +' '+ concatene.valor;
                    inputAcumulador.type= 'text';
                    acumulador = cad;
                    inputAcumulador.value = acumulador;
                }
            }
        }else if(lista[instruccion][1].toLowerCase() =='elimine') {
            
            let lol = lista[instruccion][2].trim()
            acumulador=acumulador.replaceAll(lol,'')
            inputAcumulador.value=acumulador;

        }else if(lista[instruccion][1].trim() =='Y') {
            let primerOperando = 0;
            let segundoOperando = 0;
            for(v of arrayVariables) {
                if(lista[instruccion][2].trim() == v.nombre) {
                    primerOperando = v.valor;
                    
                }
                if (lista[instruccion][3].trim() == v.nombre) {
                    
                    segundoOperando = v.valor;
                    
                }
                if(lista[instruccion][4].trim() == v.nombre) {
                    
                    if(primerOperando && segundoOperando == 1) {
                        v.valor = 1;
                        
                    } else if (primerOperando && segundoOperando == 0) {
                        v.valor = 0;
                        
                    }
                }
            }
        }else if(lista[instruccion][1].trim() =='O') {
            let primerOperando = 0;
            let segundoOperando = 0;
            for(v of arrayVariables) {
                if(lista[instruccion][2].trim() == v.nombre) {
                    
                    primerOperando = v.valor;
                    console.log(`El valor de ${v.nombre} = ${v.valor}`);
                }
                if (lista[instruccion][3].trim() == v.nombre) {
                    
                    segundoOperando = v.valor;
                    console.log(`El valor de ${v.nombre} = ${v.valor}`)
                }
                if(lista[instruccion][4].trim() == v.nombre) {
                    
                    if(primerOperando || segundoOperando == 1) {
                        v.valor = 1;
                        console.log(`El valor de ${v.nombre} = ${v.valor}`)
                    }else if (primerOperando || segundoOperando == 0) {
                        v.valor = 0;
                        console.log(`El valor de ${v.nombre} = ${v.valor}`)
                    }
                }
            }
        }else if(lista[instruccion][1].trim() =='NO') {
            let enNegativo 
            for(v of arrayVariables){
              if(lista[instruccion][2].trim()==v.nombre){
                if(v.tipo == 'L') {
                  if(v.valor == 0) {
                    enNegativo = 1;
                  } else {
                    enNegativo = 0;
                  }
                }
              }
            }
            console.log(`${lista[instruccion][1]} = ${v.valor}`);
            for(v of arrayVariables){
              if(lista[instruccion][3].trim() == v.nombre) {
                v.valor = enNegativo;
              }
            }
            console.log(`${lista[instruccion][1]} = ${v.valor}`);
        }else if(lista[instruccion][1].toLowerCase() =='muestre') {
            if(lista[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                monitor.innerHTML= `El resultado de (${lista[instruccion][2]}) es: ${acumulador}`;
            }
            else{
                for(muestre of arrayVariables ){
                    if(lista[instruccion][2].trim() == muestre.nombre){
                            
                            monitor.innerHTML= `El resultado de (${lista[instruccion][2]}) es igual a --> ${muestre.valor}`;
                    }  
                } 
            }
        }else if(lista[instruccion][1].toLowerCase() =='imprima') {
            if(lista[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                impresora.innerHTML= `El resultado de (${lista[instruccion][2]}) es: ${acumulador}`;
            }
            else{
                for(muestre of arrayVariables ){
                    if(lista[instruccion][2].trim() == muestre.nombre){
                            
                            impresora.innerHTML= `El resultado de (${lista[instruccion][2]})es igual a ------> ${muestre.valor}`;
                    }  
                } 
            }
        }else if(lista[instruccion][1].toLowerCase() == 'extraiga'){
            longitud= acumulador.length;
            console.log(`la longitud del acumulador es ${longitud}`);
            let extraer = [];
            for(i=0; i<Number(lista[instruccion][2]); i++) {
                extraer.push(acumulador[i]);
            }
            acumulador = extraer.join('');
            inputAcumulador.value=acumulador;
            /* acumulador = acumulador.slice(Number(instruccion[2]));
            console.log(acumulador); */
            // inputAcumulador.value = acumulador;
            // acumulador=acumulador.slice(Number(lista[instruccion][2]));
            // console.log(acumulador);
            // 
        }else if(lista[instruccion][1].toLowerCase() =='retorne') {
            acumulador= 0;
            alert('PROGRAMA TERMINADO')
            
        }else if(lista[instruccion][1].toLowerCase() =='raiz') { /* toma la raiz cuadrada del código */
            for(raiz of arrayVariables){    
                if(lista[instruccion][2].trim() == raiz.nombre){
                    let ra= raiz.valor;
                    let resultadoRaiz= Math.sqrt(ra);
                    
                }
            }
            console.log(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
            alert(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);

        }
        showMemory(lista[instruccion][2],lista, arrayVariables,acumulador);
    }
}
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
  console.log('entra al ejecutar porgrama');
  correrArchivo(instrucciones, 0,instrucciones.length, arrayEtiquetas, arrayVariables,0);
  
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
        
        document.getElementById('memoria').innerHTML = sinEspacios.join('<br></br>');

}

