function setupModal(btnId, modalId) {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  const span = modal.querySelector(".fechar");

  if (!btn || !modal || !span) return; // Evita erros se algo faltar

  // Abre o modal
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fecha pelo "X"
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fecha clicando fora
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ----------------------------
// ⚙️ Configura os modais
// ----------------------------
setupModal("btnAbrirConfig", "config");
setupModal("btnAbrirLoja", "loja");
setupModal("btnAbrirReceitas", "receitas");
setupModal("btnAbrirPerfil", "perfil");

// ----------------------------
// 🔉 Botões das Configurações
// ----------------------------
const btnSom = document.getElementById("btnSom");
let somAtivado = true;

if (btnSom) {
  btnSom.onclick = () => {
    somAtivado = !somAtivado;
    btnSom.textContent = somAtivado ? "🔊 Som: Ativado" : "🔇 Som: Desativado";
  };
}

const btnLinguagem = document.getElementById("btnLinguagem");
let idiomaAtual = "pt";

if (btnLinguagem) {
  btnLinguagem.onclick = () => {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    btnLinguagem.textContent =
      idiomaAtual === "pt"
        ? "🌐 Linguagem: Português"
        : "🌐 Language: English";
  };
}

const btnJacquin = document.getElementById("btnJacquin");
if (btnJacquin) {
  btnJacquin.onclick = () => {
    alert("VOCE É VERGONHAA DA POFESSON!");
  };
}

// ----------------------------
// 💰 Lógica da Loja (Power-ups)
// ----------------------------
let dinheiro = 500;
let velocidade = 1;
let paciencia = 0;
let bonus = 0;

function atualizarDinheiro() {
  const display = document.getElementById("dinheiro-quantidade");
  if (display) display.textContent = dinheiro;
}

function comprarPowerUp(custo, efeito) {
  if (dinheiro >= custo) {
    dinheiro -= custo;
    efeito();
    atualizarDinheiro();
    alert("Compra realizada com sucesso!");
  } else {
    alert("Dinheiro insuficiente!");
  }
}

// Botões da loja
const btnVelocidade = document.getElementById("btnAumentarVelocidade");
const btnVida = document.getElementById("btnAumentarVida");
const btnDano = document.getElementById("btnAumentarDano");

if (btnVelocidade) {
  btnVelocidade.addEventListener("click", () =>
    comprarPowerUp(100, () => {
      velocidade += 0.1;
      console.log("Velocidade agora:", velocidade.toFixed(2));
    })
  );
}

if (btnVida) {
  btnVida.addEventListener("click", () =>
    comprarPowerUp(150, () => {
      paciencia += 5;
      console.log("Paciência agora:", paciencia);
    })
  );
}

if (btnDano) {
  btnDano.addEventListener("click", () =>
    comprarPowerUp(200, () => {
      bonus += 0.05;
      console.log("Bônus agora:", (bonus * 100).toFixed(1) + "%");
    })
  );
}

atualizarDinheiro();

// // Configurações
// const ConfigModal = document.getElementById("config");
// const btnConfig = document.getElementById("btnAbrirConfig");
// const spanConfig = ConfigModal.querySelector(".fechar");

// btnConfig.onclick = function () {
//   ConfigModal.style.display = "block";
// };

// spanConfig.onclick = function () {
//   ConfigModal.style.display = "none";
// };

// window.addEventListener("click", function (event) {
//   if (event.target === ConfigModal) {
//    ConfigModal.style.display = "none";
//   }
// });

// // Loja
// const lojaModal = document.getElementById("loja");
// const btnLoja = document.getElementById("btnAbrirLoja");
// const spanLoja = lojaModal.querySelector(".fechar");

// btnLoja.onclick = function () {
//   lojaModal.style.display = "block";
// };

// spanLoja.onclick = function () {
//   lojaModal.style.display = "none";
// };

// window.addEventListener("click", function (event) {
//   if (event.target === lojaModal) {
//     lojaModal.style.display = "none";
//   }
// });

// // Receitas
// const receitasModal = document.getElementById("receitas");
// const btnReceitas = document.getElementById("btnAbrirReceitas");
// const spanReceitas = receitasModal.querySelector(".fechar");

// btnReceitas.onclick = function () {
//   receitasModal.style.display = "block";
// };

// spanReceitas.onclick = function () {
//   receitasModal.style.display = "none";
// };

// window.addEventListener("click", function (event) {
//   if (event.target === receitasModal) {
//     receitasModal.style.display = "none";
//   }
// });

// // Perfil
// const PerfilModal = document.getElementById("perfil");
// const btnPerfil = document.getElementById("btnAbrirPerfil");
// const spanPerfil = PerfilModal.querySelector(".fechar");

// btnPerfil.onclick = function () {
//   PerfilModal.style.display = "block";
// };

// spanPerfil.onclick = function () {
//   PerfilModal.style.display = "none";
// };

// window.addEventListener("click", function (event) {
//   if (event.target === PerfilModal) {
//     PerfilModal.style.display = "none";
//   }
// });

// // __________________________________________________

// // Botoes das configurações
// // Botão de som - alternar texto
// const btnSom = document.getElementById("btnSom");
// let somAtivado = true;

// btnSom.onclick = () => {
//   somAtivado = !somAtivado;
//   btnSom.textContent = somAtivado ? "🔊 Som: Ativado" : "🔇 Som: Desativado";
// };

// // Botão de linguagem - alternar idioma (simulado)
// const btnLinguagem = document.getElementById("btnLinguagem");
// let idiomaAtual = "pt";

// btnLinguagem.onclick = () => {
//   idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
//   btnLinguagem.textContent =
//     idiomaAtual === "pt" ? "🌐 Linguagem: Português" : "🌐 Language: English";
// };

// // Botão de Jacquin - easter egg
// const btnJacquin = document.getElementById("btnJacquin");

// btnJacquin.onclick = () => {
//   alert("VOCE É VERGONHAA DA POFESSON!");
// };

// //  _______________________________________________________________

// // ----------------------------
// // 🧩 Função genérica para modais
// // ----------------------------
// function setupModal(btnId, modalId) {
//   const btn = document.getElementById(btnId);
//   const modal = document.getElementById(modalId);
//   const span = modal.querySelector(".fechar");

//   // Abre o modal
//   btn.addEventListener("click", () => {
//     modal.style.display = "block";
//   });

//   // Fecha pelo "X"
//   span.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // Fecha clicando fora
//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// }

// // ----------------------------
// // ⚙️ Configura os modais
// // ----------------------------
// setupModal("btnAbrirConfig", "config");
// setupModal("btnAbrirLoja", "loja");
// setupModal("btnAbrirReceitas", "receitas");
// setupModal("btnAbrirPerfil", "perfil");

// // ----------------------------
// // 💰 Lógica da Loja (Power-ups)
// // ----------------------------
// let dinheiro = 500;
// let velocidade = 1;
// let paciencia = 0;
// let bonus = 0;

// // Atualiza display do dinheiro (se existir)
// function atualizarDinheiro() {
//   const display = document.getElementById("dinheiro-quantidade");
//   if (display) display.textContent = dinheiro;
// }

// // Função genérica de compra
// function comprarPowerUp(custo, efeito) {
//   if (dinheiro >= custo) {
//     dinheiro -= custo;
//     efeito();
//     atualizarDinheiro();
//     alert("Compra realizada com sucesso!");
//   } else {
//     alert("Dinheiro insuficiente!");
//   }
// }

// // Botões da loja
// const btnVelocidade = document.getElementById("btnAumentarVelocidade");
// const btnVida = document.getElementById("btnAumentarVida");
// const btnDano = document.getElementById("btnAumentarDano");

// if (btnVelocidade) {
//   btnVelocidade.addEventListener("click", () =>
//     comprarPowerUp(100, () => {
//       velocidade += 0.1;
//       console.log("Velocidade agora:", velocidade.toFixed(2));
//     })
//   );
// }

// if (btnVida) {
//   btnVida.addEventListener("click", () =>
//     comprarPowerUp(150, () => {
//       paciencia += 5;
//       console.log("Paciência agora:", paciencia);
//     })
//   );
// }

// if (btnDano) {
//   btnDano.addEventListener("click", () =>
//     comprarPowerUp(200, () => {
//       bonus += 0.05;
//       console.log("Bônus agora:", (bonus * 100).toFixed(1) + "%");
//     })
//   );
// }

// // Inicializa display de dinheiro
// atualizarDinheiro();

