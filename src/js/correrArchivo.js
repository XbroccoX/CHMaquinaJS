function correrArchivo(lista,inicio,fin, arrayEtiquetas, arrayVariables, acumulador, filesCH){
    
    let listMonitor = [];
    let listPrinter = [];



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