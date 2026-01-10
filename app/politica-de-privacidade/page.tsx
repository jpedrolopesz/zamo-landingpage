export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-[100svh] bg-[var(--light2)] text-[var(--dark)] px-6 pb-16 pt-32 sm:px-6">
      <div className="mx-auto flex w-full max-w-[880px] flex-col gap-10 rounded-3xl bg-[var(--light)] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:p-10 max-sm:px-6 max-sm:py-8">
        <header className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[rgba(23,23,23,0.55)]">
            Atualizado em 10 de março de 2025
          </span>

          <h1 className="text-3xl font-semibold leading-tight">
            Política de Privacidade
          </h1>

          <p className="text-base leading-relaxed">
            Esta Política de Privacidade descreve como o Zamo coleta, usa e
            protege os dados pessoais de quem utiliza o aplicativo e o site.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">1. Dados que coletamos</h2>
          <p className="text-[1.05rem] leading-relaxed">
            Coletamos apenas as informações necessárias para entregar a
            experiência de revisão inteligente, como nome, e-mail e dados de
            progresso nos estudos. Dados técnicos (como dispositivo e versão do
            app) podem ser coletados para garantir segurança e estabilidade.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">2. Como usamos seus dados</h2>

          <ul className="flex flex-col gap-2 pl-5">
            <li className="text-[1.05rem] leading-relaxed">
              Personalizar lembretes e revisões adaptativas.
            </li>
            <li className="text-[1.05rem] leading-relaxed">
              Oferecer suporte e responder solicitações.
            </li>
            <li className="text-[1.05rem] leading-relaxed">
              Monitorar desempenho, segurança e melhorias do app.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">3. Compartilhamento</h2>
          <p className="text-[1.05rem] leading-relaxed">
            Não vendemos seus dados. Compartilhamos apenas com fornecedores
            essenciais (ex.: serviços de hospedagem e analytics) que seguem
            padrões de segurança e confidencialidade.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">4. Seus direitos</h2>
          <p className="text-[1.05rem] leading-relaxed">
            Você pode solicitar acesso, correção ou exclusão dos seus dados a
            qualquer momento. Basta entrar em contato pelo e-mail abaixo.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">5. Contato</h2>
          <p className="text-[1.05rem] leading-relaxed">
            Para dúvidas sobre privacidade ou solicitações relacionadas a dados,
            envie um e-mail para{" "}
            <strong className="font-semibold">privacidade@zamo.app</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
