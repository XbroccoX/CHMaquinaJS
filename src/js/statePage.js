function encender() {
    if (Number(memoriaInput.value) > 9999) {
        alert('EL ESPACIO DE MEMORIA HA EXCEDIDO');
        apagar();
    }
    kernel.disabled=true;
    memoriaInput.disabled=true;
    btnEncender.style.display = 'none';
    btnApagar.style.display = 'inline-block';
    
    modo.innerHTML = 'Modo usuario';
    cerrar.style.display='block';
    files.disabled = false;

    // ARRAY DE SISTEMA OPERATIVO Y KERNEL CON LIMITE DE MEMORIA
    let memoriaMostrar = [];


    let lAcumulador = [0,' Acumulador']
    memoriaMostrar.push(lAcumulador.toString().replaceAll(',',' '));
    // console.log(memoriaMostrar);
    for(let i = 1; i<Number(memoriaInput.value)+1; i++) {
        if(i <= Number(kernel.value)) {
            let so = [i];
            
            so.push('CHSO_V2021');
            memoriaMostrar.push(so.toString().replaceAll(',',' '));
        } else{
            memoriaMostrar.push(`${i} - - - - `)
        }
    }
    document.getElementById('memoria').style.display = 'block';
    document.getElementById('memoria').innerHTML = memoriaMostrar.join('<br></br>');
}

function apagar() {
    location.reload()
    kernel.disabled = false;
    memoriaInput.disabled = false;
    btnApagar.style.display = 'none';
    btnEncender.style.display = 'inline-block';
    modo.innerHTML = 'Modo kernel';
    files.disabled = true;
}