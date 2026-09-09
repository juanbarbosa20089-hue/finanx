import { useState } from "react";
import "./App.css";

const bancos = [
  {
    nome: "Nubank",
    descricao: "Conectar conta",
    icone: "💜",
  },
  {
    nome: "Itaú",
    descricao: "Conectar conta",
    icone: "🟧",
  },
  {
    nome: "Bradesco",
    descricao: "Conectar conta",
    icone: "🔴",
  },
  {
    nome: "Banco do Brasil",
    descricao: "Conectar conta",
    icone: "💙",
  },
  {
    nome: "Santander",
    descricao: "Conectar conta",
    icone: "🔥",
  },
  {
    nome: "Caixa",
    descricao: "Conectar conta",
    icone: "🔷",
  },
  {
    nome: "Inter",
    descricao: "Conectar conta",
    icone: "🟠",
  },
];

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("Receita");

  const [modalInicial, setModalInicial] = useState(false);
  const [modalBancos, setModalBancos] = useState(false);
  const [bancoSelecionado, setBancoSelecionado] = useState(null);

  const receitas = transacoes
    .filter((t) => t.tipo === "Receita")
    .reduce((total, t) => total + t.valor, 0);

  const despesas = transacoes
    .filter((t) => t.tipo === "Despesa")
    .reduce((total, t) => total + t.valor, 0);

  const saldo = receitas - despesas;

  function formatarMoeda(numero) {
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function adicionarTransacao(e) {
    e.preventDefault();

    if (!descricao || !valor) return;

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: Number(valor),
      tipo,
    };

    setTransacoes([novaTransacao, ...transacoes]);
    setDescricao("");
    setValor("");
  }

  function abrirConexao() {
    setModalInicial(true);
  }

  function continuarParaBancos() {
    setModalInicial(false);
    setModalBancos(true);
  }

  function selecionarBanco(banco) {
    setBancoSelecionado(banco);
    setModalBancos(false);
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-area">
          <h1>Finanx</h1>
          <p>Seu gerenciamento financeiro em um só lugar.</p>
        </div>

        <button className="top-button" onClick={abrirConexao}>
          <span>＋</span> Conectar conta
        </button>
      </header>

      <main className="container">

        <section className="hero">
          <div className="hero-content">
            <span className="hero-label">FINANX PRO</span>

            <h2>
              Olá, seja bem-vindo <span>👋</span>
            </h2>

            <p>
              Acompanhe sua vida financeira de forma simples,
              organizada e inteligente.
            </p>

            <button className="hero-button" onClick={abrirConexao}>
              Conectar minha conta
            </button>
          </div>
        </section>

        <section className="cards">

          <div className="info-card">
            <div className="card-icon blue">💰</div>
            <span>Saldo disponível</span>
            <strong className="blue-text">
              {formatarMoeda(saldo)}
            </strong>
            <small>Saldo atual</small>
          </div>

          <div className="info-card">
            <div className="card-icon green">↗</div>
            <span>Receitas</span>
            <strong className="green-text">
              {formatarMoeda(receitas)}
            </strong>
            <small>Entradas cadastradas</small>
          </div>

          <div className="info-card">
            <div className="card-icon red">↘</div>
            <span>Despesas</span>
            <strong className="red-text">
              {formatarMoeda(despesas)}
            </strong>
            <small>Saídas cadastradas</small>
          </div>

        </section>

        <section className="section-box">
          <div className="section-title">
            <div className="section-icon">＋</div>
            <div>
              <h3>Adicionar transação</h3>
              <p>Registre uma nova movimentação financeira.</p>
            </div>
          </div>

          <form className="transaction-form" onSubmit={adicionarTransacao}>
            <div className="input-group">
              <label>Descrição</label>
              <input
                type="text"
                placeholder="Ex.: Salário, aluguel..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Valor</label>
              <input
                type="number"
                placeholder="0,00"
                step="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Tipo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option>Receita</option>
                <option>Despesa</option>
              </select>
            </div>

            <button className="add-button" type="submit">
              Adicionar
            </button>
          </form>
        </section>

        <section className="section-box transactions">

          <div className="section-title">
            <div className="section-icon">▣</div>
            <div>
              <h3>Transações recentes</h3>
              <p>Suas últimas movimentações financeiras.</p>
            </div>
          </div>

          {transacoes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💳</div>
              <h4>Nenhuma transação</h4>
              <p>Cadastre sua primeira movimentação para começar.</p>
            </div>
          ) : (
            <div className="transaction-list">
              {transacoes.map((transacao) => (
                <div className="transaction-item" key={transacao.id}>
                  <div>
                    <strong>{transacao.descricao}</strong>
                    <span>{transacao.tipo}</span>
                  </div>

                  <strong
                    className={
                      transacao.tipo === "Receita"
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {transacao.tipo === "Receita" ? "+" : "-"}
                    {formatarMoeda(transacao.valor)}
                  </strong>
                </div>
              ))}
            </div>
          )}

        </section>

        <section className="open-finance">

          <div className="open-icon">🔐</div>

          <div className="open-text">
            <span>PRÓXIMO PASSO</span>
            <h3>Tenha tudo conectado automaticamente</h3>
            <p>
              O Finanx poderá reunir suas informações financeiras
              em um só lugar através de uma integração segura com Open Finance.
            </p>
          </div>

          <button className="outline-button" onClick={abrirConexao}>
            Conectar minha conta
          </button>

        </section>

      </main>

      <footer>
        <strong>Finanx</strong> © 2026 — Seu gerenciamento financeiro em um só lugar.
      </footer>

      {/* MODAL INICIAL */}

      {modalInicial && (
        <div className="modal-overlay" onClick={() => setModalInicial(false)}>
          <div
            className="modal initial-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-button"
              onClick={() => setModalInicial(false)}
            >
              ×
            </button>

            <div className="modal-icon">🏦</div>

            <span className="modal-label">OPEN FINANCE</span>

            <h2>Conectar conta bancária</h2>

            <p className="modal-description">
              Conecte sua instituição financeira ao Finanx
              para centralizar suas informações em um só lugar.
            </p>

            <div className="security-box">
              <span>🔒</span>
              <p>
                Seus dados financeiros são protegidos.
                Nunca pedimos sua senha bancária diretamente.
              </p>
            </div>

            <button
              className="modal-primary-button"
              onClick={continuarParaBancos}
            >
              Escolher meu banco
              <span>→</span>
            </button>

          </div>
        </div>
      )}

      {/* MODAL DOS BANCOS */}

      {modalBancos && (
        <div className="modal-overlay" onClick={() => setModalBancos(false)}>
          <div
            className="modal bank-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-button"
              onClick={() => setModalBancos(false)}
            >
              ×
            </button>

            <div className="modal-icon">🏦</div>

            <span className="modal-label">OPEN FINANCE</span>

            <h2>Escolha seu banco</h2>

            <p className="modal-description">
              Selecione uma instituição financeira para
              continuar a conexão.
            </p>

            <div className="bank-grid">

              {bancos.map((banco) => (
                <button
                  className="bank-card"
                  key={banco.nome}
                  onClick={() => selecionarBanco(banco)}
                >
                  <div className="bank-icon">
                    {banco.icone}
                  </div>

                  <div className="bank-info">
                    <strong>{banco.nome}</strong>
                    <span>{banco.descricao}</span>
                  </div>

                  <div className="bank-arrow">→</div>
                </button>
              ))}

            </div>

            <div className="protected-footer">
              🔒 Seus dados financeiros são protegidos.
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE BANCO SELECIONADO */}

      {bancoSelecionado && (
        <div className="modal-overlay">
          <div className="modal success-modal">

            <button
              className="close-button"
              onClick={() => setBancoSelecionado(null)}
            >
              ×
            </button>

            <div className="success-icon">
              {bancoSelecionado.icone}
            </div>

            <span className="modal-label">CONEXÃO</span>

            <h2>{bancoSelecionado.nome}</h2>

            <p className="modal-description">
              A conexão com o {bancoSelecionado.nome} está
              pronta para ser configurada.
            </p>

            <div className="success-box">
              <span>✓</span>
              <div>
                <strong>Ambiente de demonstração</strong>
                <p>
                  Esta versão do Finanx não realiza uma conexão
                  bancária real.
                </p>
              </div>
            </div>

            <button
              className="modal-primary-button"
              onClick={() => setBancoSelecionado(null)}
            >
              Voltar para o Finanx
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;