function correrArchivo(acumulador, filesCH){
    btnStepbyStep.style.display='none';
    let listMonitor = [];
    let listPrinter = [];
    let time = 0;
    
    let namesPrint= ''
    
    for(let i=0 ; i<filesCH.length; i++){
        let file = filesCH[i];
        

        
        // alert(`Ahora corre el programa siguiente que es: ${file.name}`)
        setTimeout(function(){
            namesPrint += `${file.name} `
            for(let instruccion = 0; instruccion<file.lineas.length; instruccion++){
                console.log(file.lineas[instruccion][1]);
                // debugger;
                
                if (file.lineas[instruccion][1].trim().includes('//')) {
                    continue;
                }
                if(file.lineas[instruccion][1].toLowerCase() =='lea') {//Preguntar al Profe
                    for (let variable = 0; variable < file.variables.length; variable++) {
                        // debugger;
                        if (file.lineas[instruccion][2] == file.variables[variable].nombre) {
                        let newValue = prompt(`Ingrese el VALOR de la variable ${file.variables[variable].nombre}`);
                        file.variables[variable].valor = String(newValue);
                        console.log(file.variables[variable]);
                        }
                    }
                    console.log('lea');
                    
                    
                }else if(file.lineas[instruccion][1].toLowerCase() =='cargue') {
                    // debugger;
                    for (let variable = 0; variable < file.variables.length; variable++) {

                        if (file.lineas[instruccion][2].trim() === file.variables[variable].nombre) {
                        acumulador = String(file.variables[variable].valor);
                        }
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='almacene') {
                    for(almacene of file.variables){
                        if(file.lineas[instruccion][2] == almacene.nombre){
                            // console.log(`valor de ${almacene.nombre} = ${almacene.valor}`);
                            almacene.valor = acumulador;
                        }
                    }
                    
                }else if(file.lineas[instruccion][1].trim().toLowerCase() === 'vaya') {
                for(etiquetas of file.etiquetas) {
                    if(etiquetas.nombre== file.lineas[instruccion][2].trim()) {
                        if(etiquetas.sobrepasa == false  && etiquetas.valor < file.lineas[instruccion-1]) {
                            instruccion = Number(etiquetas.valor) - 2;
                        }else{
                            alert(`La etiqueta ${etiquetas.nombre} con un valor de ${etiquetas.valor}, sobrepasa la longitud del archivo que es= ${file.lineas.length}`);
                            location.reload()
                        }
                    }
                }
            }else if(file.lineas[instruccion][1].trim().toLowerCase() =='vayasi') {
                // debugger;
                if(Number(acumulador) > 0) {
                    for(e of file.etiquetas) {
                        if(file.lineas[instruccion][2].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa == false) {
                            console.log('Entró a la recursión');
                            instruccion = Number(e.valor) - 2;
                        }
                    }

                } else if(acumulador < 0) {
                    for(e of file.etiquetas) {
                    if(file.lineas[instruccion][3].trim().toLowerCase() == e.nombre.trim().toLowerCase() && e.sobrepasa === false) {
                        console.log('Entró a la recursión');
                        instruccion = Number(e.valor) - 2;
                    } 
                    }
                }
                console.log('Me salí x2');
            

            }else if(file.lineas[instruccion][1].toLowerCase() == 'sume') {
                    for(sume of file.variables){
                        if(file.lineas[instruccion][2] == sume.nombre){
                            acumulador=Number(acumulador)
                            acumulador=Number(acumulador) + Number(sume.valor);
                        }
                    }
                    
                }else if(file.lineas[instruccion][1].toLowerCase() =='reste') {
                    for(reste of file.variables){
                        if(file.lineas[instruccion][2] == reste.nombre){
                            acumulador-= reste.valor;
                        }else if(file.lineas[instruccion][2] == 'acumulador'){
                        acumulador = 0
                        }
                        
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='multiplique') {
                    for(multi of file.variables){
                        if(file.lineas[instruccion][2] == multi.nombre){
                            acumulador= acumulador * multi.valor;
                        }
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='divida') {
                    for(div of file.variables){
                        if(file.lineas[instruccion][2] == div.nombre && div.valor != 0){
                            acumulador= acumulador / div.valor;
                        }
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='potencia') {
                    for(potencia of file.variables){
                        if(file.lineas[instruccion][2] == potencia.nombre && potencia.valor.isInteger()){
                            acumulador= acumulador ** potencia.valor;
                        }
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='modulo') {
                    for(mod of file.variables){
                        if(file.lineas[instruccion][2] == mod.nombre){
                            let modulo= acumulador % mod.valor;
                            alert(`El modulo de ${acumulador} % ${mod.valor} = ${modulo}(linea ${mod.id})`);
                        }
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='concatene') {
                    for(concatene of file.variables){
                        if(file.lineas[instruccion][2].trim() == concatene.nombre){
                            let cad= acumulador +' '+ concatene.valor;
                            inputAcumulador.type= 'text';
                            acumulador = cad;
                        }
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='elimine') {
                    
                    let lol = file.lineas[instruccion][2].trim()
                    acumulador=acumulador.replaceAll(lol,'')

                }else if(file.lineas[instruccion][1].trim() =='Y') {
                    let primerOperando = 0;
                    let segundoOperando = 0;
                    for(v of file.variables) {
                        if(file.lineas[instruccion][2].trim() == v.nombre) {
                            primerOperando = v.valor;
                            
                        }
                        if (file.lineas[instruccion][3].trim() == v.nombre) {
                            
                            segundoOperando = v.valor;
                            
                        }
                        if(file.lineas[instruccion][4].trim() == v.nombre) {
                            
                            if(primerOperando && segundoOperando == 1) {
                                v.valor = 1;
                                
                            } else if (primerOperando && segundoOperando == 0) {
                                v.valor = 0;
                                
                            }
                        }
                    }
                }else if(file.lineas[instruccion][1].trim() =='O') {
                    let primerOperando = 0;
                    let segundoOperando = 0;
                    for(v of file.variables) {
                        if(file.lineas[instruccion][2].trim() == v.nombre) {
                            
                            primerOperando = v.valor;
                            console.log(`El valor de ${v.nombre} = ${v.valor}`);
                        }
                        if (file.lineas[instruccion][3].trim() == v.nombre) {
                            
                            segundoOperando = v.valor;
                            console.log(`El valor de ${v.nombre} = ${v.valor}`)
                        }
                        if(file.lineas[instruccion][4].trim() == v.nombre) {
                            
                            if(primerOperando || segundoOperando == 1) {
                                v.valor = 1;
                                console.log(`El valor de ${v.nombre} = ${v.valor}`)
                            }else if (primerOperando || segundoOperando == 0) {
                                v.valor = 0;
                                console.log(`El valor de ${v.nombre} = ${v.valor}`)
                            }
                        }
                    }
                }else if(file.lineas[instruccion][1].trim() =='NO') {
                    let enNegativo 
                    for(v of file.variables){
                    if(file.lineas[instruccion][2].trim()==v.nombre){
                        if(v.tipo == 'L') {
                        if(v.valor == 0) {
                            enNegativo = 1;
                        } else {
                            enNegativo = 0;
                        }
                        }
                    }
                    }
                    console.log(`${file.lineas[instruccion][1]} = ${v.valor}`);
                    for(v of file.variables){
                    if(file.lineas[instruccion][3].trim() == v.nombre) {
                        v.valor = enNegativo;
                    }
                    }
                    console.log(`${file.lineas[instruccion][1]} = ${v.valor}`);
                }else if(file.lineas[instruccion][1].toLowerCase() =='muestre') {
                    if(file.lineas[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                        monitor.innerHTML= `El resultado del(os)
                        programas(${namesPrint}) 
                        (${file.lineas[instruccion][2]})
                         es: ${acumulador}`;
                    }
                    else{
                        for(muestre of file.variables ){
                            if(file.lineas[instruccion][2].trim() == muestre.nombre){
                                    
                                    monitor.innerHTML= `El resultado del(os)
                                    programas(${namesPrint}) 
                                    (${file.lineas[instruccion][2]}) es igual a --> ${muestre.valor}`;
                            }  
                        } 
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() =='imprima') {
                    if(file.lineas[instruccion][2].toUpperCase().trim() == 'ACUMULADOR'){
                        impresora.innerHTML= `El resultado del(os)
                        programas(${namesPrint}) 
                        (${file.lineas[instruccion][2]})
                         es: ${acumulador}`;
                    }
                    else{
                        for(muestre of file.variables ){
                            if(file.lineas[instruccion][2].trim() == muestre.nombre){
                                    
                                    impresora.innerHTML= `El resultado del(os)
                                    programas(${namesPrint}) 
                                    (${file.lineas[instruccion][2]}) es igual a --> ${muestre.valor}`;
                            }  
                        } 
                    }
                }else if(file.lineas[instruccion][1].toLowerCase() == 'extraiga'){
                    longitud= acumulador.length;
                    console.log(`la longitud del acumulador es ${longitud}`);
                    let extraer = [];
                    for(i=0; i<Number(file.lineas[instruccion][2]); i++) {
                        extraer.push(acumulador[i]);
                    }
                    acumulador = extraer.join('');
                    
                }else if(file.lineas[instruccion][1].toLowerCase() =='retorne') {
                    acumulador= 0;
                    showMemory(file.lineas[instruccion][2],file,acumulador);
                    // alert('PROGRAMA TERMINADO')
                    // debugger;
                    
                }else if(file.lineas[instruccion][1].toLowerCase() =='raiz') { /* toma la raiz cuadrada del código */
                    for(raiz of file.variables){    
                        if(file.lineas[instruccion][2].trim() == raiz.nombre){
                            let ra= raiz.valor;
                            let resultadoRaiz= Math.sqrt(ra);
                            
                        }
                    }
                    console.log(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);
                    alert(`La Raiz Cuadrada del Número${raiz.valor} = ${resultadoRaiz}`);

                }
                console.log(`acumulador> ${acumulador}`);
                showMemory(file.lineas[instruccion][2],file,acumulador);
            }
        },time)
        time+= 5000
        
    }
}