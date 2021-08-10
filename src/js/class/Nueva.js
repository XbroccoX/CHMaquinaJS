class Nueva { 
    constructor(id, nombre, tipo, valor, idPrograma) {
        this._id = id;
        this._nombre = nombre;
        this._tipo = tipo;
        this._valor= valor;
        this._idPrograma = idPrograma;
    }
    get id() {
        return this._id;
    }
    set id (id) {
        this._id = id;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre (nombre) {
        this._nombre = nombre;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo (tipo) {
        this._tipo = tipo;
    }
    get valor() {
        return this._valor;
    }
    set valor (valor) {
        this._valor = valor;
    }
    get idPrograma(){
        return this._idPrograma;
    }
}

