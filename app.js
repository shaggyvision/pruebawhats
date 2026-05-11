
const INSTANCE_ID = 'TU_INSTANCE';
const TOKEN = 'TU_TOKEN';

const SHEET_ID = '1iwg8R-yQbfPXoqkjVkLhZaTls7oaTdpEXvIdMx2yCXY';
const SHEET_NAME = 'happy';

const plantillas = {

cumple:
`🎂 ¡Feliz cumpleaños {nombre}!

Te deseamos un excelente día lleno de alegría 🥳`,

evento:
`🎉 Hola {nombre}

Te invitamos cordialmente a:
{evento}

¡Esperamos contar contigo! 😄`,

promo:
`🔥 Hola {nombre}

Tenemos promociones especiales para ti 😎`

};

const plantilla = document.getElementById('plantilla');
const mensaje = document.getElementById('mensaje');
const preview = document.getElementById('previewBox');

mensaje.value = plantillas.cumple;
preview.innerText = plantillas.cumple;

plantilla.addEventListener('change',()=>{

mensaje.value = plantillas[plantilla.value];
actualizarPreview();

});

mensaje.addEventListener('input',actualizarPreview);

function actualizarPreview(){

preview.innerText = mensaje.value
.replace('{nombre}','Carlos')
.replace('{evento}','Gran apertura Happy CRM');

}

// Navegación

const menus = document.querySelectorAll('.menu');

menus.forEach(menu=>{

menu.addEventListener('click',()=>{

document
.querySelectorAll('.menu')
.forEach(item=>item.classList.remove('active'));

menu.classList.add('active');

document
.querySelectorAll('.page')
.forEach(page=>page.classList.add('hidden'));

const destino = menu.dataset.page;

document
.getElementById(destino + 'Page')
.classList.remove('hidden');

});

});

let contactosGlobal = [];

async function cargarContactos(){

try{

const sheetURL =
`https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;

const response = await fetch(sheetURL);

const contactos = await response.json();

contactosGlobal = contactos;

document.getElementById('totalContactos').innerText = contactos.length;

renderTabla(contactos);

agregarLog('✅ Contactos cargados');

}catch(error){

agregarLog('❌ Error cargando contactos');

}

}

function renderTabla(contactos){

const tabla = document.getElementById('tablaContactos');

tabla.innerHTML = '';

contactos.forEach(contacto=>{

tabla.innerHTML += `
<tr>
<td>${contacto.Nombre || ''}</td>
<td>${contacto.Numero || ''}</td>
<td>${contacto.Evento || ''}</td>
</tr>
`;

});

}

async function enviarATodos(){

if(!contactosGlobal.length){

await cargarContactos();

}

let enviados = 0;
let errores = 0;

for(let i=0; i<contactosGlobal.length; i++){

const contacto = contactosGlobal[i];

let texto = mensaje.value;

texto = texto.replaceAll('{nombre}', contacto.Nombre || '');
texto = texto.replaceAll('{evento}', contacto.Evento || '');

const body = {
token:TOKEN,
to:contacto.Numero,
body:texto
};

const url =
`https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`;

try{

await fetch(url,{
method:'POST',
headers:{
'Content-Type':'application/json'
},
body:JSON.stringify(body)
});

enviados++;

document.getElementById('enviados').innerText = enviados;

agregarLog(`✅ Mensaje enviado a ${contacto.Nombre}`);

}catch(error){

errores++;

document.getElementById('errores').innerText = errores;

agregarLog(`❌ Error con ${contacto.Nombre}`);

}

const porcentaje =
((i + 1) / contactosGlobal.length) * 100;

document.getElementById('progressBar').style.width =
porcentaje + '%';

document.getElementById('status').innerText =
`Enviando ${i + 1} de ${contactosGlobal.length}`;

await esperar(3000);

}

document.getElementById('status').innerText =
'🚀 Campaña finalizada';

}

function esperar(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}

function agregarLog(texto){

const log = document.getElementById('log');

log.innerHTML += texto + '<br>';

log.scrollTop = log.scrollHeight;

}

cargarContactos();
actualizarPreview();
