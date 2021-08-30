filesStateList= [];
function runSrtn(filesCH) {
    let acumulador= '0';


    for (let file = 0; file < filesCH.length; file++) {

      if (filesStateList[file] === undefined) {
        filesStateList.push(filesCH[file]);
      }

      if (filesStateList.length === filesCH.length) {
        filesStateList = filesStateList.sort(
          (a, b) => Number(a.cpu) - Number(b.cpu)
        );
      }

      if (filesCH.length > 1 && file < filesCH.length - 1) {
        filesStateList = filesStateList.sort(
          (a, b) => Number(a.cpu) - Number(b.cpu)
        );
        file = 0;
        filesStateList[file].endingRr = filesCH[file + 1].ti - 1;
      } else {
        filesStateList[0].endingRr = filesStateList[0].lineas.length - 1;
        filesStateList[0].cpu = 1000;
        file = 0;
      }

      acumulador = filesStateList[0].acumulator;

     

      for(let instruccion = filesStateList[file].initialRr; instruccion < filesStateList[file].endingRr; instruccion++){
        console.log(filesStateList[file].lineas[instruccion][1]);
        console.log(filesStateList[file].name, filesStateList[file].lineas[instruccion]);
        
        if (filesStateList[file].lineas[instruccion][1].trim().includes('//')) {
            continue;
        }
        if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='lea') {
            for (let variable = 0; variable < filesStateList[file].variables.length; variable++) {
                // debugger;
                if (filesStateList[file].lineas[instruccion][2] == filesStateList[file].variables[variable].nombre) {
                let newValue = prompt(`Ingrese el VALOR de la variable ${filesStateList[file].variables[variable].nombre}`);
                filesStateList[file].variables[variable].valor = String(newValue);
                console.log(filesStateList[file].variables[variable]);
                }
            }
            console.log('lea');
            
            
            
            
        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='cargue') {
            // debugger;
            for (let variable = 0; variable < filesStateList[file].variables.length; variable++) {

                if (filesStateList[file].lineas[instruccion][2].trim() === filesStateList[file].variables[variable].nombre) {
                acumulador = String(filesStateList[file].variables[variable].valor);
                }
            }
            
        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='almacene') {
            for(almacene of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == almacene.nombre){
                    // console.log(`valor de ${almacene.nombre} = ${almacene.valor}`);
                    almacene.valor = acumulador;
                }
            }
            
            
        }else if(filesStateList[file].lineas[instruccion][1].trim().toLowerCase() === 'vaya') {
        for(etiquetas of filesStateList[file].etiquetas) {
            if(etiquetas.nombre== filesStateList[file].lineas[instruccion][2].trim()) {
                if(etiquetas.sobrepasa == false  && etiquetas.valor < filesStateList[file].lineas[instruccion-1]) {
                    instruccion = Number(etiquetas.valor) - 2;
                }else{
                    alert(`La etiqueta ${etiquetas.nombre} con un valor de ${etiquetas.valor}, sobrepasa la longitud del archivo que es= ${filesStateList[file].lineas.length}`);
                    location.reload()
                }
            }
        }
        

    }else if(filesStateList[file].lineas[instruccion][1].trim().toLowerCase() =='vayasi') {
        // debugger;
        if(Number(acumulador) > 0) {
            for(e of filesStateList[file].etiquetas) {
                if(filesStateList[file].lineas[instruccion][2].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa == false) {
                    console.log('Entró a la recursión');
                    instruccion = Number(e.valor) - 2;
                }
            }

        } else if(acumulador < 0) {
            for(e of filesStateList[file].etiquetas) {
            if(filesStateList[file].lineas[instruccion][3].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa === false) {
                console.log('Entró a la recursión');
                instruccion = Number(e.valor) - 2;
            } 
            }
        }
        console.log('Me salí x2');
        
    

    }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() == 'sume') {
            for(sume of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == sume.nombre){
                    acumulador=Number(acumulador)
                    acumulador=Number(acumulador) + Number(sume.valor);
                }
            }
            
            
        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='reste') {
            for(reste of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == reste.nombre){
                    acumulador-= reste.valor;
                }else if(filesStateList[file].lineas[instruccion][2] == 'acumulador'){
                acumulador = 0
                }
                
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='multiplique') {
            for(multi of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == multi.nombre){
                    acumulador= acumulador * multi.valor;
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='divida') {
            for(div of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == div.nombre && div.valor != 0){
                    acumulador= acumulador / div.valor;
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='potencia') {
            for(potencia of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == potencia.nombre && potencia.valor.isInteger()){
                    acumulador= acumulador ** potencia.valor;
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='modulo') {
            for(mod of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2] == mod.nombre){
                    let modulo= acumulador % mod.valor;
                    alert(`El modulo de ${acumulador} % ${mod.valor} = ${modulo}(linea ${mod.id})`);
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='concatene') {
            for(concatene of filesStateList[file].variables){
                if(filesStateList[file].lineas[instruccion][2].trim() == concatene.nombre){
                    let cad= acumulador +' '+ concatene.valor;
                    inputAcumulador.type= 'text';
                    acumulador = cad;
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='elimine') {
            
            let lol = filesStateList[file].lineas[instruccion][2].trim()
            acumulador=acumulador.replaceAll(lol,'')
            

        }else if(filesStateList[file].lineas[instruccion][1].trim() =='Y') {
            let primerOperando = 0;
            let segundoOperando = 0;
            for(v of filesStateList[file].variables) {
                if(filesStateList[file].lineas[instruccion][2].trim() == v.nombre) {
                    primerOperando = v.valor;
                    
                }
                if (filesStateList[file].lineas[instruccion][3].trim() == v.nombre) {
                    
                    segundoOperando = v.valor;
                    
                }
                if(filesStateList[file].lineas[instruccion][4].trim() == v.nombre) {
                    
                    if(primerOperando && segundoOperando == 1) {
                        v.valor = 1;
                        
                    } else if (primerOperando && segundoOperando == 0) {
                        v.valor = 0;
                        
                    }
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].trim() =='O') {
            let primerOperando = 0;
            let segundoOperando = 0;
            for(v of filesStateList[file].variables) {
                if(filesStateList[file].lineas[instruccion][2].trim() == v.nombre) {
                    
                    primerOperando = v.valor;
                    console.log(`El valor de ${v.nombre} = ${v.valor}`);
                }
                if (filesStateList[file].lineas[instruccion][3].trim() == v.nombre) {
                    
                    segundoOperando = v.valor;
                    console.log(`El valor de ${v.nombre} = ${v.valor}`)
                }
                if(filesStateList[file].lineas[instruccion][4].trim() == v.nombre) {
                    
                    if(primerOperando || segundoOperando == 1) {
                        v.valor = 1;
                        console.log(`El valor de ${v.nombre} = ${v.valor}`)
                    }else if (primerOperando || segundoOperando == 0) {
                        v.valor = 0;
                        console.log(`El valor de ${v.nombre} = ${v.valor}`)
                    }
                }
            }
            

        }else if(filesStateList[file].lineas[instruccion][1].trim() =='NO') {
            let enNegativo 
            for(v of filesStateList[file].variables){
            if(filesStateList[file].lineas[instruccion][2].trim()==v.nombre){
                if(v.tipo == 'L') {
                if(v.valor == 0) {
                    enNegativo = 1;
                } else {
                    enNegativo = 0;
                }
                }
            }
            }
            console.log(`${filesStateList[file].lineas[instruccion][1]} = ${v.valor}`);
            for(v of filesStateList[file].variables){
            if(filesStateList[file].lineas[instruccion][3].trim() == v.nombre) {
                v.valor = enNegativo;
            }
            }
            
            console.log(`${filesStateList[file].lineas[instruccion][1]} = ${v.valor}`);

            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='muestre') {
            if(filesStateList[file].lineas[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                monitor.innerHTML= `El resultado del(os)
                programas(${filesStateList[file].name}) 
                (${filesStateList[file].lineas[instruccion][2]})
                 es: ${acumulador}`;
            }
            else{
                for(muestre of filesStateList[file].variables ){
                    if(filesStateList[file].lineas[instruccion][2].trim() == muestre.nombre){
                            
                            monitor.innerHTML= `El resultado del(os)
                            programas(${filesStateList[file].name}) 
                            (${filesStateList[file].lineas[instruccion][2]}) es igual a --> ${muestre.valor}`;
                    }  
                } 
            }
            
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='imprima') {
            if(filesStateList[file].lineas[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                impresora.innerHTML= `El resultado del(os)
                programas(${filesStateList[file].name}) 
                (${filesStateList[file].lineas[instruccion][2]})
                 es: ${acumulador}`;
            }
            else{
                for(muestre of filesStateList[file].variables ){
                    if(filesStateList[file].lineas[instruccion][2].trim() == muestre.nombre){
                            
                            impresora.innerHTML= `El resultado del(os)
                            programas(${filesStateList[file].name}) 
                            (${filesStateList[file].lineas[instruccion][2]}) es igual a --> ${muestre.valor}`;
                    }  
                } 
            }
            
            

        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() == 'extraiga'){
            longitud= acumulador.length;
            console.log(`la longitud del acumulador es ${longitud}`);
            let extraer = [];
            for(i=0; i<Number(filesStateList[file].lineas[instruccion][2]); i++) {
                extraer.push(acumulador[i]);
            }
            acumulador = extraer.join('');
            

            
        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='retorne') {
            acumulador= 0;
            showMemory(filesStateList[file].lineas[instruccion][2],file,acumulador);
            // alert('PROGRAMA TERMINADO')
            // debugger;
            
        }else if(filesStateList[file].lineas[instruccion][1].toLowerCase() =='raiz') { /* toma la raiz cuadrada del código */
            for(raiz of filesStateList[file].variables){    
                if(filesStateList[file].lineas[instruccion][2].trim() == raiz.nombre){
                    let ra= raiz.valor;
                    let resultadoRaiz= Math.sqrt(ra);
                    
                }
            }
            console.log(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
            alert(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
            

        }
        // console.log(`acumulador> ${acumulador}`);
        showMemory(filesStateList[file].lineas[instruccion][2],filesStateList[file],acumulador);
      }

      filesStateList[file].initialRr = filesStateList[file].endingRr;

      filesStateList[file].cpu -= filesStateList[file].endingRr - filesStateList[file].ti;

      filesStateList[file].acumulator = acumulador;
      filesStateList[file] = filesStateList[file];

      for (let miniFile of filesStateList) {
        if (miniFile.cpu > 500) {
          file = filesCH.length;
        } else {
          if (filesStateList.length === filesCH.length) {
            file = filesStateList.length - 2;
          } else {
            file = filesStateList.length - 1;
          }
          break;
        }
      }

      // debugger;
    }

    for (let miniStateList = 0; miniStateList < filesStateList.length; miniStateList++) {
      filesCH[miniStateList] = filesStateList[miniStateList];
    }

    return [filesCH];
}