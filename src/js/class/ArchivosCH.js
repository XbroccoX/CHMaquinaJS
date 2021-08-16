class ArchivosCH{
    static contadorId = 0;
    constructor(name, lineas, fpMemoria, fpvMemoria, ipMemory, etiquetas, variables){
         this._id = ++ArchivosCH.contadorId;
         this._name = name;
         this._lineas = lineas;//
         this._fpMemoria = fpMemoria; //muestra el numero donde acaba topdo con memoria sin variables
         this._fpvMemoria = fpvMemoria; //muestra el numero donde acaba todo con memoria con variables
         this._ipMemory = ipMemory; //initial position
        //  this._listaMostrar = listaMostrar;//pantalla
        //  this._listaImprimir = listaImprimir;//impresora
         this._etiquetas = etiquetas;
         this._variables = variables;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get lineas(){
        return this._lineas;
    }
    get fpMemoria(){
        return this._fpMemoria;
    }
    get fpvMemoria(){
        return this._fpvMemoria;
    }
    get ipMemory(){//kernel +1
        return this._ipMemory;
    }
    // get listaMostrar(){
    //     return this._listaMostrar;
    // }
    // get listaImprimir(){
    //     return this._listaImprimir;
    // }
    get etiquetas(){
        return this._etiquetas;
    }
    get variables(){
        return this._variables
    }
    
    set name(name){
        this._name = name;
    }
    set lineas(lineas){
        this._lineas= lineas;
    }
    set fpMemoria(fpMemoria){
        this._fpMemoria = fpMemoria;
    }
    set fpvMemoria(fpvMemoria){
        this._fpvMemoria = fpvMemoria;
    }
    set ipMemory(ipMemory){
        this._ipMemory = ipMemory;
    }
    // set listaMostrar(listaMostrar){
    //     this._listaMostrar=listaMostrar;
    // }
    // set listaImprimir(listaImprimir){
    //     this._listaImprimir = listaImprimir;
    // }
    set etiquetas(etiquetas){
        this._etiquetas = etiquetas;
    }
    set variables(variables){
        this._variables = variables;
    }


}
// _id: string = '';
// _name: string = '';
// // instructions amount
// _amountInst: number = 0;
// // initial position in memory
// ipMemory: string = '';
// // final position in memory
// fpMemory: string = '';
// // final position with variables in memory
// fpvMemory: string = '';
// // final position with variables in memory
// codeLines: string[] = [];
// tags: Tag[] = [];
// variables: Variable[] = [];
// // list to show
// listToShow: any[] = [];
// // list to print
// listToPrint: any[] = [];