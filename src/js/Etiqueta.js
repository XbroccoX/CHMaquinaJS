class Etiqueta { 
    constructor(id, nombre, valor, sobrepasa) {
        this._id = id;
        this._nombre = nombre;
        this._sobrepasa = sobrepasa;
        this._valor= valor;
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
    get sobrepasa() {
        return this._sobrepasa;
    }
    set sobrepasa (sobrepasa) {
        this._sobrepasa = sobrepasa;
    }
    get valor() {
        return this._valor;
    }
    set valor (valor) {
        this._valor = valor;
    }
}
