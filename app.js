
const plantillas = {

cumple:
`🎂 Feliz cumpleaños {nombre}`,

evento:
`🎉 Hola {nombre}
Te invitamos a {evento}`,

promo:
`🔥 Hola {nombre}
Tenemos promociones especiales`

};

const plantilla = document.getElementById('plantilla');
const mensaje = document.getElementById('mensaje');

mensaje.value = plantillas.cumple;

plantilla.addEventListener('change',()=>{

mensaje.value = plantillas[plantilla.value];

});

function mostrarPagina(id, elemento){

document
.querySelectorAll('.page')
.forEach(page=>{

page.classList.add('oculto');

});

document
.getElementById(id)
.classList.remove('oculto');

document
.querySelectorAll('.menu')
.forEach(menu=>{

menu.classList.remove('active');

});

elemento.classList.add('active');

}

async function cargarContactos(){

const contactos = [
{
Nombre:'Carlos',
Numero:'9930000000',
Evento:'Cumpleaños'
},
{
Nombre:'Ana',
Numero:'9931111111',
Evento:'Promoción'
}
];

document.getElementById('totalContactos').innerText =
contactos.length;

const tabla = document.getElementById('tablaContactos');

tabla.innerHTML = '';

contactos.forEach(contacto=>{

tabla.innerHTML += `
<tr>
<td>${contacto.Nombre}</td>
<td>${contacto.Numero}</td>
<td>${contacto.Evento}</td>
</tr>
`;

});

}

async function enviarATodos(){

document.getElementById('status').innerText =
'🚀 Enviando mensajes...';

for(let i=0; i<=100; i+=10){

document.getElementById('progress').style.width =
i + '%';

await esperar(200);

}

document.getElementById('enviados').innerText = 2;

document.getElementById('status').innerText =
'✅ Campaña finalizada';

}

function esperar(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}

cargarContactos();
