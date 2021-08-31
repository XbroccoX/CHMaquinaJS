filesStateList = [];
quantumCounter = 0;

function roundRobin (filesCH, quantum){
    let acumulador


    for (let file = 0; file < filesCH.length; file++) {
      
      if (filesStateList.length < filesCH.length) {
        acumulador = '0';
      } else {
        acumulador = filesStateList[file][1];
      }

      for(let instruccion = filesCH[file].initialRr; instruccion < filesCH[file].endingRr; instruccion++){
        console.log(filesCH[file].lineas[instruccion][1]);
        console.log(filesCH[file].name, filesCH[file].lineas[instruccion]);
        
        if (filesCH[file].lineas[instruccion][1].trim().includes('//')) {
            continue;
        }
        if(filesCH[file].lineas[instruccion][1].toLowerCase() =='lea') {
            for (let variable = 0; variable < filesCH[file].variables.length; variable++) {
                // debugger;
                if (filesCH[file].lineas[instruccion][2] == filesCH[file].variables[variable].nombre) {
                let newValue = prompt(`Ingrese el VALOR de la variable ${filesCH[file].variables[variable].nombre}`);
                filesCH[file].variables[variable].valor = String(newValue);
                }
            }
            console.log('lea');
            
            
            
            
        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='cargue') {
            // debugger;
            for (let variable = 0; variable < filesCH[file].variables.length; variable++) {

                if (filesCH[file].lineas[instruccion][2].trim() === filesCH[file].variables[variable].nombre) {
                acumulador = String(filesCH[file].variables[variable].valor);
                }
            }
            
        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='almacene') {
            for(almacene of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == almacene.nombre){
                    // console.log(`valor de ${almacene.nombre} = ${almacene.valor}`);
                    almacene.valor = acumulador;
                }
            }
            
            
        }else if(filesCH[file].lineas[instruccion][1].trim().toLowerCase() === 'vaya') {
        for(etiquetas of filesCH[file].etiquetas) {
            if(etiquetas.nombre== filesCH[file].lineas[instruccion][2].trim()) {
                if(etiquetas.sobrepasa == false  && etiquetas.valor < filesCH[file].lineas[instruccion-1]) {
                    instruccion = Number(etiquetas.valor) - 2;
                }else{
                    alert(`La etiqueta ${etiquetas.nombre} con un valor de ${etiquetas.valor}, sobrepasa la longitud del archivo que es= ${filesCH[file].lineas.length}`);
                    location.reload()
                }
            }
        }
        

    }else if(filesCH[file].lineas[instruccion][1].trim().toLowerCase() =='vayasi') {
        // debugger;
        if(Number(acumulador) > 0) {
            for(e of filesCH[file].etiquetas) {
                if(filesCH[file].lineas[instruccion][2].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa == false) {
                    console.log('Entró a la recursión');
                    instruccion = Number(e.valor) - 2;
                }
            }

        } else if(acumulador < 0) {
            for(e of filesCH[file].etiquetas) {
            if(filesCH[file].lineas[instruccion][3].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa === false) {
                console.log('Entró a la recursión');
                instruccion = Number(e.valor) - 2;
            } 
            }
        }
        console.log('Me salí x2');
        
    

    }else if(filesCH[file].lineas[instruccion][1].toLowerCase() == 'sume') {
            for(sume of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == sume.nombre){
                    acumulador=Number(acumulador)
                    acumulador=Number(acumulador) + Number(sume.valor);
                }
            }
            
            
        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='reste') {
            for(reste of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == reste.nombre){
                    acumulador-= reste.valor;
                }else if(filesCH[file].lineas[instruccion][2] == 'acumulador'){
                acumulador = 0
                }
                
            }
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='multiplique') {
            for(multi of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == multi.nombre){
                    acumulador= acumulador * multi.valor;
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='divida') {
            for(div of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == div.nombre && div.valor != 0){
                    acumulador= acumulador / div.valor;
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='potencia') {
            for(potencia of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == potencia.nombre && potencia.valor.isInteger()){
                    acumulador= acumulador ** potencia.valor;
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='modulo') {
            for(mod of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2] == mod.nombre){
                    let modulo= acumulador % mod.valor;
                    alert(`El modulo de ${acumulador} % ${mod.valor} = ${modulo}(linea ${mod.id})`);
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='concatene') {
            for(concatene of filesCH[file].variables){
                if(filesCH[file].lineas[instruccion][2].trim() == concatene.nombre){
                    let cad= acumulador +' '+ concatene.valor;
                    inputAcumulador.type= 'text';
                    acumulador = cad;
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='elimine') {
            
            let lol = filesCH[file].lineas[instruccion][2].trim()
            acumulador=acumulador.replaceAll(lol,'')
            

        }else if(filesCH[file].lineas[instruccion][1].trim() =='Y') {
            let primerOperando = 0;
            let segundoOperando = 0;
            for(v of filesCH[file].variables) {
                if(filesCH[file].lineas[instruccion][2].trim() == v.nombre) {
                    primerOperando = v.valor;
                    
                }
                if (filesCH[file].lineas[instruccion][3].trim() == v.nombre) {
                    
                    segundoOperando = v.valor;
                    
                }
                if(filesCH[file].lineas[instruccion][4].trim() == v.nombre) {
                    
                    if(primerOperando && segundoOperando == 1) {
                        v.valor = 1;
                        
                    } else if (primerOperando && segundoOperando == 0) {
                        v.valor = 0;
                        
                    }
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].trim() =='O') {
            let primerOperando = 0;
            let segundoOperando = 0;
            for(v of filesCH[file].variables) {
                if(filesCH[file].lineas[instruccion][2].trim() == v.nombre) {
                    
                    primerOperando = v.valor;
                    console.log(`El valor de ${v.nombre} = ${v.valor}`);
                }
                if (filesCH[file].lineas[instruccion][3].trim() == v.nombre) {
                    
                    segundoOperando = v.valor;
                    console.log(`El valor de ${v.nombre} = ${v.valor}`)
                }
                if(filesCH[file].lineas[instruccion][4].trim() == v.nombre) {
                    
                    if(primerOperando || segundoOperando == 1) {
                        v.valor = 1;
                        console.log(`El valor de ${v.nombre} = ${v.valor}`)
                    }else if (primerOperando || segundoOperando == 0) {
                        v.valor = 0;
                        console.log(`El valor de ${v.nombre} = ${v.valor}`)
                    }
                }
            }
            

        }else if(filesCH[file].lineas[instruccion][1].trim() =='NO') {
            let enNegativo 
            for(v of filesCH[file].variables){
            if(filesCH[file].lineas[instruccion][2].trim()==v.nombre){
                if(v.tipo == 'L') {
                if(v.valor == 0) {
                    enNegativo = 1;
                } else {
                    enNegativo = 0;
                }
                }
            }
            }
            console.log(`${filesCH[file].lineas[instruccion][1]} = ${v.valor}`);
            for(v of filesCH[file].variables){
            if(filesCH[file].lineas[instruccion][3].trim() == v.nombre) {
                v.valor = enNegativo;
            }
            }
            
            console.log(`${filesCH[file].lineas[instruccion][1]} = ${v.valor}`);

            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='muestre') {
            if(filesCH[file].lineas[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                monitor.innerHTML= `El resultado del(os)
                programas(${filesCH[file].name}) 
                (${filesCH[file].lineas[instruccion][2]})
                 es: ${acumulador}`;
            }
            else{
                for(muestre of filesCH[file].variables ){
                    if(filesCH[file].lineas[instruccion][2].trim() == muestre.nombre){
                            
                            monitor.innerHTML= `El resultado del(os)
                            programas(${filesCH[file].name}) 
                            (${filesCH[file].lineas[instruccion][2]}) es igual a --> ${muestre.valor}`;
                    }  
                } 
            }
            
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='imprima') {
            if(filesCH[file].lineas[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                impresora.innerHTML= `El resultado del(os)
                programas(${filesCH[file].name}) 
                (${filesCH[file].lineas[instruccion][2]})
                 es: ${acumulador}`;
            }
            else{
                for(muestre of filesCH[file].variables ){
                    if(filesCH[file].lineas[instruccion][2].trim() == muestre.nombre){
                            
                            impresora.innerHTML= `El resultado del(os)
                            programas(${filesCH[file].name}) 
                            (${filesCH[file].lineas[instruccion][2]}) es igual a --> ${muestre.valor}`;
                    }  
                } 
            }
            
            

        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() == 'extraiga'){
            longitud= acumulador.length;
            console.log(`la longitud del acumulador es ${longitud}`);
            let extraer = [];
            for(i=0; i<Number(filesCH[file].lineas[instruccion][2]); i++) {
                extraer.push(acumulador[i]);
            }
            acumulador = extraer.join('');
            

            
        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='retorne') {
            acumulador= 0;
            showMemory(filesCH[file].lineas[instruccion][2],file,acumulador);
            // alert('PROGRAMA TERMINADO')
            // debugger;
            
        }else if(filesCH[file].lineas[instruccion][1].toLowerCase() =='raiz') { /* toma la raiz cuadrada del código */
            for(raiz of filesCH[file].variables){    
                if(filesCH[file].lineas[instruccion][2].trim() == raiz.nombre){
                    let ra= raiz.valor;
                    let resultadoRaiz= Math.sqrt(ra);
                    
                }
            }
            console.log(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
            alert(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
            

        }
        // console.log(`acumulador> ${acumulador}`);
        // debugger;
        
        showMemory(filesCH[file].lineas[instruccion][2],filesCH[file],acumulador);
        
      }

      filesCH[file].initialRr += quantum;
      filesCH[file].endingRr += quantum;
      
      if (filesCH[file].endingRr > filesCH[file].lineas.length) {
        
        filesCH[file].endingRr = filesCH[file].lineas.length;
        
        if (quantumCounter !== quantum) {
          quantumCounter = quantum - 1;
        }

      }
     
      if (filesStateList.length < filesCH.length) {
        filesStateList.push([filesCH[file], acumulador]);
      }

      filesStateList[file] = [filesCH[file], acumulador];
      
      if (file === filesCH.length - 1 && quantumCounter < quantum) {
        file = -1;
        quantumCounter += 1;
      } 
            
    }
    return [filesCH];

  
}