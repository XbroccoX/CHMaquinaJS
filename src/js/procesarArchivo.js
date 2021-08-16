
filesCH = []


var initialPosition = 0;
  console.log(initialPosition);
function leerArchivo(evento) {

  let archivoCH= new ArchivosCH()


    console.log(evento.target.files)
    for(let i=0; i<evento.target.files.length; i++) {

    document.getElementById('instrucciones').innerHTML = "";
    document.getElementById('variables').innerHTML = "";
    document.getElementById('etiquetas').innerHTML = "";

    let archivo = evento.target.files[i];

    let name= evento.target.files[i].name; 
    
    archivoCH.ipMemory = initialPosition;
    archivoCH.name = name;


    console.log(archivoCH);
    //GUARDA EL NOMBRE DEL ARCHIVO A CARGAR

    procesarArchivo(archivo, function(result) {
      let lArchivo = []; //LINEAS PERO SIN ID


    lArchivo = result.split('\n');
      

    //funcion que elimina espacios, comentarios entre otros
      for(let i=0; i<lArchivo.length; i++) {
        if(lArchivo[i] == "") {
          lArchivo.splice(i, 1);
          i--;
        }
        if(lArchivo[i].length == 1) {
          lArchivo.splice(i, 1);
          i--;
        }
        if(lArchivo[i].includes('//')) {
          lArchivo.splice(i,1);
          i--;
        }
      }
     
        
        
      





    let listaPrueba = [];//LISTA DE LOS ARCHIVOS ORGANIZADOS CON EL ID QUE APARECE EN LA INTERFAZ
    
    
    let listaFile=[]; //LISTA DEL ARCHIVO CARGADO EN ESE MOMENTO

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
          }else {
              l[j] = l[j].trim();
          }

      }
    }
    for(l of listaFile) {
      for(let j = 0; j< l.length; j++) {
          if(l[j] == '') {
              l.splice(j,1);
              j--;
          }else {
              l[j] = l[j].trim();
          }

      }
    }
    
    let bool = verificarSintaxis(listaPrueba); //bool trae la lista de los errores

    let cf = 0;
    let arrayVariablesIndividual=[];
    let idVariables = Number(listaFile.length)+Number(kernel.value)+1;



    for(l of listaPrueba) {
            
      if(l[0].toString().toLowerCase() == 'nueva') {

        let valor = [];

        if(l[2].toUpperCase() == 'C') {
          for(let i = 3; i<l.length; i++) {
              valor.push(l[i]);
          }
            
            valor = valor.toString();
            valor = valor.replaceAll(',', " ");

            let idVariables = Number(listaPrueba.length)+Number(kernel.value)+1;
            arrayVariables.push(new Nueva(idVariables, l[1], l[2], valor, name));
            arrayVariablesIndividual.push(new Nueva(idVariables, l[1], l[2], valor, zeroFill(numId,3)))

            // se agrega en el array de interfaz
            listaPrueba.push([idVariables, arrayVariables[cf].nombre, arrayVariables[cf].valor]); //Aquí se agregan las variables
            cf++;
        } else {
          let idVariables = Number(listaPrueba.length)+Number(kernel.value)+1;
          arrayVariables.push(new Nueva(idVariables, l[1], l[2], l[3], name));
          arrayVariablesIndividual.push(new Nueva(idVariables, l[1], l[2], l[3], zeroFill(numId,3)));

          // se agrega en el array del archivo
          listaPrueba.push([idVariables, arrayVariables[cf].nombre, arrayVariables[cf].valor]);  //Aquí se agregan la variables 
          cf++;
        }
      }
    }
    
    arrayVariablesFile=[];
//Array de variables en FileCH
    archivoCH.lineas = listaFile;
    
  
    sumArchivo = archivoCH.lineas.length;

    
    for(file of filesCH){
      sumArchivo +=  file.lineas.length;
    }

    
  
    for(l of listaFile) {
      if(l[0].toString().toLowerCase() == 'nueva') {

        let valor = [];

        if(l[2].toUpperCase() == 'C') {
            for(let i = 3; i<l.length; i++) {
                valor.push(l[i]);
            }
            
            valor = valor.toString();
            valor = valor.replaceAll(',', " ");
            
            arrayVariablesFile.push(new Nueva(idVariables, l[1], l[2], valor, name));
            idVariables++;
            
            archivoCH.variables = arrayVariablesFile;

            // se agrega en el array de interfaz
            // listaPrueba.push([idVariables, arrayVariables[cf].nombre, arrayVariables[cf].valor]); //Aquí se agregan las variables
            // cf++;
        } else {

            arrayVariablesFile.push(new Nueva(idVariables, l[1], l[2], l[3], name));
            archivoCH.variables = arrayVariablesFile;
            idVariables++;

          // se agrega en el array del archivo
          // listaPrueba.push([idVariables, arrayVariables[cf].nombre, arrayVariables[cf].valor]);  //Aquí se agregan la variables 
          // cf++;
        }
      }
    }
    

  archivoCH.fpMemoria = sumArchivo + Number(kernel.value);

  archivoCH.fpvMemoria = sumArchivo + archivoCH.variables.length + Number(kernel.value);

  
    console.log(sumArchivo);
    numVar=arrayVariables.length;
    sum = sum + +sumArchivo + numVar;
    

    // console.log(sum);
    console.log(`Sum es = ${sum} y kernel es = ${kernel.value}`);

    
    if(bool.length === 0 && (sum + Number(kernel.value)) <= Number(memoriaInput.value)) {


          

          
          
          for(let i = 0; i<listaPrueba.length; i++) {
            for(let j = 0; j<Number(memoriaInput.value); j++) {
              if(listaPrueba[i][0] == j) {
                listaPrueba[i].splice(0, 1)
              }
            }
          }
          console.log(listaPrueba);
          //sin id, con variables, y archivos
          

          


        for(instruccion of listaPrueba) {
          
            lFinal.push(instruccion)// Este es el array en STRING()
        }

        let cont = Number(kernel.value) + 1;
        let caracteres=[]
        for(recorrer of lFinal) {
            if(recorrer[0] == cont) {
                recorrer.shift();
            }
            cont++
        }
        
        
        //llena de id, la lista a mostrar en el navegador
        let w = Number(kernel.value)+1;
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
          listIns=`<div>${listaPrueba.length-arrayVariablesIndividual.length}</div></br>`;
          // listIns.push(listaPrueba.length-arrayVariablesIndividual.length)
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
          ins.innerHTML= listIns
          rb.innerHTML= listRb.join('</br>');
          rlc.innerHTML= listRlc.join('</br>');
          rlp.innerHTML= listRlp.join('</br>');


        let sinEspacios= [];
        let contar;
        for(m of arrayMemoria) {
          contar = m .toString().replaceAll(',', ' ');
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





        


        filesCH.push(archivoCH)
        console.log(initialPosition);
          for(lines of archivoCH.lineas){
            lines.unshift(initialPosition)
            initialPosition++;
          }
        initialPosition =  archivoCH.fpMemoria + 1
        initialVariables= initialPosition;
        console.log(filesCH.length);
        console.log(filesCH)

        for (let i = 0; i < filesCH.length; i++) {
          console.log(filesCH[i].variables);
          for(lineVariable of filesCH[i].variables){
            console.log(lineVariable.id);
            lineVariable.id = initialVariables;
            initialVariables++;
          }
        }
        console.log(filesCH);


        
        
      })
      
    }
  }
  





  function procesarArchivo(ch, callback) {
    var reader = new FileReader();
    reader.readAsText(ch);
    reader.onload = function () {
        callback(reader.result);
    }
}
