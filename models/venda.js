const prompt = require("prompt-sync")();

const db = [];

const corretor = require("./corretor.js");
const imovel = require("./imovel.js");
const cliente = require("./cliente.js");

let proxId = 1;

const model = (id = proxId++) => {
    let id_corretora = 0
    if(corretor.index()) {
        id_corretor = parseInt(prompt("ID do corretor: "));
    } else {
        console.log("Cadastre um corretor para inserir uma venda");
    }
    if(imovel.index()) {
        id_imovel = parseInt(prompt("ID do imovel: "));
    } else {
        console.log("Cadastre um imovel para inserir uma venda");
    }
    if(cliente.index()) {
        id_cliente = parseInt(prompt("ID do cliente: "));
    } else {
        console.log("Cadastre um cliente para inserir uma venda");
    }
  
    if (
      id_corretor != "" &&
      id_imovel != "" &&
      id_cliente != "" &&
      corretor.show(id_corretor)
    ) {
      return {
        id,
        id_corretora,
        id_cliente,
        id_corretor
      };
    }
  
    console.log("Dados inválidos");
  };
  
  const store = () => {
    const novo = model();
  
    if (novo) {
      db.push(novo);
  
      console.log("Registro concluido com sucesso!");
    }
  };
  
  const index = () => {
    if (db.length == 0) {
      console.log("Nenhum registro encontrado.");
      return false;
    }
  
    db.forEach((el) => console.log(el));
    return true;
  };
  
  const show = (id) => db.find((el) => el.id == id);
  
  const update = () => {
    if (index()) {
      const id = parseInt(prompt("ID: "));
  
      const indice = db.findIndex((el) => el.id == id);
  
      if (indice != -1) {
        const novo = model(id);
  
        if (novo) {
          db[indice] = novo;
          console.log("Registro atualizado com sucesso.");
        }
      } else {
        console.log("Registro não encontrado");
      }
    }
  };
  
  const destroy = () => {
      if(index()) {
          const id = parseInt(prompt("ID: "));
  
          const indice = db.findIndex(el => el.id == id);
  
          if(indice != -1) {
              db.splice(indice, 1);
              console.log("Registro excluído com sucesso");
          } else {
              console.log("Registro não encontrado")
          }
      }
  }
  
  module.exports = {
      store,
      index,
      show,
      update,
      destroy
  }