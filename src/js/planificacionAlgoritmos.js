function ordenarAlgoritmos  (filesCH, algorithmToUse, quantum){
    // console.log(quantum);
    // console.log(filesCH);
    // console.log(algorithmToUse);

    if (algorithmToUse === 'fcfs'){ //orden de llegada
        filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));
        // console.log(`entra al FCFS`);
    
    
    }else if (algorithmToUse === 'sjf'){ //dependiendo el n[umero de linea de menor a mayor
        filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));

        //   contId2 = +filesCH[filesCH.length - 1].fpvMemory + 1;

      filesCH = filesCH.sort(
        (a, b) => Number(a.lineas.length) - Number(b.lineas.length)
      );


    }else if (algorithmToUse === 'prioridad') { // dependiendo la prioridad si es mayor es mas importante 

        filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));
  
        // contId2 = +filesCH[filesCH.length - 1].fpvMemoria + 1;
  
        filesCH = filesCH.sort(
          (a, b) => Number(b.priority) - Number(a.priority)
        );
    }else if (algorithmToUse === 'RR') {

        for (let file of filesCH) {
          file.endingRr = quantum;
        }
  
        filesCH.sort((a, b) => Number(a.id) - Number(b.id));
  
    }else if (algorithmToUse === 'RRP') {

        filesCH = filesCH.sort((a, b) => Number(a.id) - Number(b.id));
  
  
        filesCH = filesCH.sort(
          (a, b) => Number(b.priority) - Number(a.priority)
        );
  
        for (let file of filesCH) {
          file.endingRr = quantum;
        }
  
    }else if (algorithmToUse === 'srtn') {

        filesCH.sort((a, b) => Number(a.id) - Number(b.id));
  
        // contId2 = +filesArrayFake[filesArrayFake.length - 1].fpvMemory + 1;
  
      }

}