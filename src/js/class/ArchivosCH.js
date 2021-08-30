class ArchivosCH{
    static contadorId = 0;
    constructor(name, lineas, fpMemoria, fpvMemoria, ipMemory, etiquetas, variables, io, cpu, ti, priority, initialRr, endingRr, acumulator){
         this._id = ++ArchivosCH.contadorId;
         this._name = name;
         this._lineas = lineas;//
         this._fpMemoria = fpMemoria; //muestra el numero donde acaba topdo con memoria sin variables
         this._fpvMemoria = fpvMemoria; //muestra el numero donde acaba todo con memoria con variables
         this._ipMemory = ipMemory; //initial position
         this._etiquetas = etiquetas;
         this._variables = variables;
         this._io = io;
         this._cpu = cpu;
         this._ti = ti //Tiempo de llegada del archivo
         this._priority = priority; //Es el algoritmo seleccinado desde el input select
         this._initialRr= initialRr;
         this._endingRr = endingRr;
         this._acumulator = acumulator;
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
    get etiquetas(){
        return this._etiquetas;
    }
    get variables(){
        return this._variables;
    }
    get io(){
        return this._io;
    }
    get cpu(){
        return this._cpu;
    }
    get ti(){
        return this._ti;
    }
    get priority(){
        return this._priority;
    }
    get initialRr(){
        return this._initialRr;
    }
    get endingRr(){
        return this._endingRr;
    }
    get acumulator(){
        return this._acumulator;
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
    set etiquetas(etiquetas){
        this._etiquetas = etiquetas;
    }
    set variables(variables){
        this._variables = variables;
    }
    set io(io){
        this._io = io;
    }
    set cpu(cpu){
        this._cpu = cpu;
    }
    set ti(ti){
        this._ti = ti;
    }
    set priority(priority){
        this._priority = priority;
    }
    set initialRr(initialRr){
        this._initialRr = initialRr;
    }
    set endingRr(endingRr){
        this._endingRr = endingRr;
    }
    set acumulator(acumulator){
        this._acumulator = acumulator;
    }


}
