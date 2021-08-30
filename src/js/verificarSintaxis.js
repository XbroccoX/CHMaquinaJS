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
        

        contIO++;
        contCPU += Math.floor(Math.random() * 9) + 1;



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
        
        contCPU++;

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
        
        contCPU++;

      }else if(lista[instruccion][0].toLowerCase() =='vaya') {
  
        if (lista[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (lista[instruccion].length < 2) {
            errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
  
        contCPU++;

      }else if(lista[instruccion][0].toLowerCase() =='vayasi') {
  
        if (lista[instruccion].length > 3) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (lista[instruccion].length < 3) {
            errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }


        contCPU++;
  
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


        contCPU++;
  
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


        contCPU++;
  
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


        contCPU++;
  
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

        contCPU++;
  
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

        contCPU++;
  
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

        contCPU++;
  
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


        contCPU++;
  
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

        contCPU++;
  
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


        contCPU++;
  
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


        contCPU++;
  
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


        contCPU++;
  
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

        contIO++;
        contCPU += Math.floor(Math.random() * 9) + 1;
  
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
        
        contIO++;
        contCPU += Math.floor(Math.random() * 9) + 1;


      }else if (lista[instruccion][0].trim().toLowerCase() == 'extraiga') {

        if (lista[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (lista[instruccion].length < 1) {
          errores.push("Error de sintaxis, menos de 1 operadores especificados: " + linea);
        }
        contCPU++;


      }else if(lista[instruccion][0].toLowerCase() =='retorne') {
  
        if (lista[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (lista[instruccion].length < 1) {
          errores.push("Error de sintaxis, menos de 1 operadores especificados: " + linea);
        }
      } else if(!lista[instruccion][0].trim().includes('//')){
        errores.push("No se reconoce la intrucción: " + linea);
      }
    }
    return errores;
  }