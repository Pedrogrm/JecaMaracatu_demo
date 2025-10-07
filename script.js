/* ----------------------------
  Sabores do Brasil - protótipo
  HTML + CSS + JS puro
   - point & click
   - mesas/clientes com paciência
   - pedidos aleatórios
   - montar prato e entregar
-----------------------------*/

const INGREDIENTES_VISUAIS = []; // se quiser mapear imagens, use aqui
let pontos = 0;
let highscore = Number(localStorage.getItem("sb_highscore") || 0);

const pedidosPossiveis = [
  { nome: "Feijoada", ingredientes: ["Feijão", "Carne", "Arroz"], valor: 15 },
  { nome: "Moqueca", ingredientes: ["Peixe", "Coco", "Farinha"], valor: 18 },
  { nome: "Baião de Dois", ingredientes: ["Arroz", "Feijão", "Farinha"], valor: 12 },
  { nome: "Acarajé", ingredientes: ["Farinha", "Feijão", "Vinagrete"], valor: 14 }
];

const mesas = [
  { id: 1, estado: "vazio", pedido: null, paciencia: 0, pacienciaInterval: null, el: null },
  { id: 2, estado: "vazio", pedido: null, paciencia: 0, pacienciaInterval: null, el: null },
  { id: 3, estado: "vazio", pedido: null, paciencia: 0, pacienciaInterval: null, el: null }
];

let pratoAtual = []; // lista de ingredientes selecionados para o prato
let pedidoAtivo = null; // pedido mostrado no hud (vinculado ao cliente atualmente pedindo)

/* --------- helpers DOM --------- */
const el = id => document.getElementById(id);
const q = sel => document.querySelector(sel);
const qq = sel => document.querySelectorAll(sel);

/* ---------- inicialização ---------- */
function init(){
  // referencias de DOM
  mesas.forEach(m=>{
    m.el = el(`cliente-${m.id}`);
  });

  // ligar botões de ingredientes
  qq(".ing").forEach(btn=>{
    btn.addEventListener("click", ()=> {
      const ing = btn.dataset.ing;
      adicionarIngrediente(ing);
    });
  });

  el("limpar").addEventListener("click", limparPrato);
  el("entregar").addEventListener("click", entregarPedido);
  el("start").addEventListener("click", iniciarJogo);
  el("reset").addEventListener("click", reiniciarJogo);

  atualizarHUD();
  mostrarHighscore();
}

/* ---------- HUD ---------- */
function atualizarHUD(){
  el("pontos").textContent = pontos;
  el("pedido-nome").textContent = pedidoAtivo ? pedidoAtivo.nome : "—";
}
function mostrarHighscore(){
  el("highscore").textContent = highscore;
}

/* ---------- fluxo de clientes ---------- */

// função que tenta trazer um novo cliente para mesas vazias
function tentarChegada(){
  mesas.forEach(mesa=>{
    if(mesa.estado === "vazio"){
      // probabilidade de chegada: 25% por ciclo (ajuste conforme quiser)
      if(Math.random() < 0.25){
        sentarCliente(mesa);
      }
    }
  });
}

// senta e faz o pedido depois de um tempo curto
function sentarCliente(mesa){
  const sprite = mesa.el.querySelector(".sprite");
  sprite.textContent = "😊";
  mesa.estado = "sentando";
  mesa.el.classList.remove("oculto");
  mesa.el.classList.add("visivel");
  

  // depois de 1.2s -> cliente faz pedido
  setTimeout(()=>{
    const p = escolherPedidoAleatorio();
    mesa.pedido = p;
    mesa.estado = "esperandoComida";
    mesa.paciencia = 100; // 100% de paciência
    mostrarPedidoNaMesa(mesa);
    iniciarPaciencia(mesa);

    // se não há pedidoAtivo, o HUD passa a mostrar esse pedido
    if(!pedidoAtivo) {
      pedidoAtivo = p;
      atualizarHUD();
    }
  }, 1200);
}

// mostra balão de pedido no DOM
function mostrarPedidoNaMesa(mesa){
  const texto = mesa.el.querySelector(".pedido-text");
  texto.textContent = mesa.pedido.nome;
  // reseta barra de paciência visual
  const fill = mesa.el.querySelector(".barra-fill");
  fill.style.width = mesa.paciencia + "%";
}

// inicia decremento de paciência da mesa
function iniciarPaciencia(mesa){
  if(mesa.pacienciaInterval) clearInterval(mesa.pacienciaInterval);
    mesa.pacienciaInterval = setInterval(()=>{
    mesa.paciencia -= 4; // decresce 4% por tick (ajuste dificuldade)
    if(mesa.paciencia < 0) mesa.paciencia = 0;
    const fill = mesa.el.querySelector(".barra-fill");
    fill.style.width = mesa.paciencia + "%";
    

    // se o jogador não entregar a tempo, cliente vai embora e penaliza
    if(mesa.paciencia <= 0){
      const sprite = mesa.el.querySelector(".sprite");
      sprite.textContent = "😡";
      clearInterval(mesa.pacienciaInterval);
      clienteVaiEmbora(mesa, true);
    }
  }, 1000);
    const sprite = mesa.el.querySelector(".sprite");
    sprite.textContent = "😊";
}

// cliente come e vai embora (quando recebe prato certo)
function clienteCome(mesa){
  clearInterval(mesa.pacienciaInterval);
  mesa.estado = "comendo";
  // anima com emoji feliz
  const sprite = mesa.el.querySelector(".sprite");
  sprite.textContent = "😋";
  // esconder balão
  mesa.el.querySelector(".balão").style.opacity = 0.5;
  setTimeout(()=>{
    clienteVaiEmbora(mesa, false);
  }, 3000);
}

// cliente vai embora (se demorou ou depois de comer)
function clienteVaiEmbora(mesa, penalizar=false){
  // penaliza se foi por impaciência
  if(penalizar){
    pontos = Math.max(0, pontos - 5);
    atualizarHUD();
  }

  const modal = el("modal-receitas");
const btnReceitas = el("ver-receitas");
const spanClose = modal.querySelector(".close");
const listaReceitas = el("lista-receitas");

btnReceitas.addEventListener("click", ()=>{
  // popula lista
  listaReceitas.innerHTML = "";
  pedidosPossiveis.forEach(p=>{
    const li = document.createElement("li");
    li.textContent = `${p.nome}: ${p.ingredientes.join(", ")}`;
    listaReceitas.appendChild(li);
  });
  modal.classList.add("visivel");
});

spanClose.addEventListener("click", ()=> modal.classList.remove("visivel"));
window.addEventListener("click", e=>{
  if(e.target === modal) modal.classList.remove("visivel");
});


  // resetar visual
  mesa.el.querySelector(".balão").style.opacity = 1;
  mesa.el.querySelector(".pedido-text").textContent = "—";
  mesa.el.querySelector(".barra-fill").style.width = "100%";
  mesa.el.classList.remove("visivel");
  mesa.el.classList.add("oculto");

  mesa.estado = "vazio";
  mesa.pedido = null;
  if(mesa.pacienciaInterval) { clearInterval(mesa.pacienciaInterval); mesa.pacienciaInterval = null; }

  // se o pedido que estava no HUD era este, limpar HUD ou mostrar outro pedido em fila
  if(pedidoAtivo && !existePedidoAtivoEmMesas()){
    pedidoAtivo = null;
  }
  atualizarHUD();
}

// checa se existe algum pedido ativo nas mesas
function existePedidoAtivoEmMesas(){
  return mesas.some(m=> m.pedido !== null);
}

/* ---------- montagem de prato ---------- */
function adicionarIngrediente(ing){
  // só permite adicionar se tiver algum pedido nas mesas
  if(!existePedidoAtivoEmMesas()){
    flashMensagem("Não há pedidos!");
    return;
  }
  pratoAtual.push(ing);
  renderPrato();
}

function renderPrato(){
  const area = el("prato");
  area.innerHTML = "";
  pratoAtual.forEach(x=>{
    const d = document.createElement("div");
    d.className = "prato-item";
    d.textContent = x;
    area.appendChild(d);
  });
}

function limparPrato(){
  pratoAtual = [];
  renderPrato();
}

/* ---------- entrega do pedido ---------- */
function entregarPedido(){
  if(!existePedidoAtivoEmMesas()){
    flashMensagem("Nenhum cliente esperando comida!");
    return;
  }
  // achar primeira mesa que está esperando comida (FIFO)
  const mesa = mesas.find(m=> m.pedido !== null && m.estado === "esperandoComida");
  if(!mesa){
    flashMensagem("Cliente não está pedindo agora.");
    return;
  }

  const pedido = mesa.pedido;
  // checa igualdade: todos os ingredientes do pedido devem estar presentes e quantidade igual
  const ok = pedido.ingREDIENTS_CORRECT ? true : comparaIngredientes(pedido.ingredientes, pratoAtual);

  if(ok){
    // sucesso
    pontos += pedido.valor || 10;
    // atualiza highscore se necessário
    if(pontos > highscore){
      highscore = pontos;
      localStorage.setItem("sb_highscore", highscore);
      mostrarHighscore();
    }
    atualizarHUD();
    clienteCome(mesa);
    limparPrato();
    pedidoAtivo = existePedidoAtivoEmMesas() ? mesas.find(m=>m.pedido!==null).pedido : null;
    atualizarHUD();
  } else {
    // errado: perde pontos e cliente fica irritado (perde mais paciência)
    pontos = Math.max(0, pontos - 5);
    atualizarHUD();
    // penaliza paciencia
    mesa.paciencia = Math.max(0, mesa.paciencia - 25);
    const fill = mesa.el.querySelector(".barra-fill");
    fill.style.width = mesa.paciencia + "%";
    flashMensagem("Pedido errado!");
  }
}

/* compara ingredientes: o pedido e o prato devem ter mesma lista (sem considerar ordem) */
function comparaIngredientes(arrayPedido, arrayPrato){
  if(arrayPrato.length !== arrayPedido.length) return false;
  // contar ocorrências
  const count = (arr) => arr.reduce((acc, v) => (acc[v]= (acc[v]||0)+1, acc), {});
  const a = count(arrayPedido);
  const b = count(arrayPrato);
  return Object.keys(a).every(k => a[k] === b[k]);
}

/* ---------- utilitários ---------- */

function escolherPedidoAleatorio(){
  return pedidosPossiveis[Math.floor(Math.random()*pedidosPossiveis.length)];
}

function flashMensagem(text){
  // mensagem curta na HUD (usa pedido-nome temporariamente)
  const elNome = el("pedido-nome");
  const antes = elNome.textContent;
  elNome.textContent = text;
  setTimeout(()=> {
    elNome.textContent = pedidoAtivo ? pedidoAtivo.nome : "—";
  }, 1200);
}

/* ---------- controle do jogo (start/reset) ---------- */
let cicloChegada = null;

function iniciarJogo(){
  // se já estiver rodando, ignora
  if(cicloChegada) return;
  pontos = 0;
  pedidoAtivo = null;
  limparPrato();
  atualizarHUD();

  // ciclo que tenta trazer clientes
  cicloChegada = setInterval(tentarChegada, 1900);

  // também atualiza HUD periodicamente
  setInterval(atualizarHUD, 800);
}

function reiniciarJogo(){
  // limpar timers
  if(cicloChegada) { clearInterval(cicloChegada); cicloChegada = null; }
  // reset mesas
  mesas.forEach(m=>{
    if(m.pacienciaInterval) clearInterval(m.pacienciaInterval);
    m.estado = "vazio";
    m.pedido = null;
    m.paciencia = 0;
    m.el.classList.remove("visivel");
    m.el.classList.add("oculto");
    m.el.querySelector(".pedido-text").textContent = "—";
    m.el.querySelector(".barra-fill").style.width = "100%";
    m.el.querySelector(".sprite").textContent = "🙂";
  });
  pontos = 0;
  pedidoAtivo = null;
  limparPrato();
  atualizarHUD();
}

// Modal receitas
const modal = el("modal-receitas");
const btnReceitas = el("ver-receitas");
const spanClose = modal.querySelector(".close");
const listaReceitas = el("lista-receitas");

btnReceitas.addEventListener("click", ()=>{
  listaReceitas.innerHTML = "";
  pedidosPossiveis.forEach(p=>{
    const li = document.createElement("li");
    li.textContent = `${p.nome}: ${p.ingredientes.join(", ")}`;
    listaReceitas.appendChild(li);
  });
  modal.classList.add("visivel");
});

spanClose.addEventListener("click", ()=> modal.classList.remove("visivel"));
window.addEventListener("click", e=>{
  if(e.target === modal) modal.classList.remove("visivel");
});

// Fogão
// el("cozinhar").addEventListener("click", ()=>{
//   if(pratoAtual.length === 0){
//     flashMensagem("Adicione ingredientes antes de cozinhar!");
//     return;
//   }
//   flashMensagem("Cozinhando... 🔥");
//   setTimeout(()=>{
//     flashMensagem("Prato pronto! 🍽️");
//   }, 1200);
// });

/* ---------- start ---------- */
window.addEventListener("load", ()=>{
  init();
});
