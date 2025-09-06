"use client"

import { useState, useEffect } from "react"
import { DebtTimer } from "@/components/DebtTimer"
import { StickyTimer } from "@/components/StickyTimer"

export default function Page() {
  const [showStickyTimer, setShowStickyTimer] = useState(false)
  const [debtAmount, setDebtAmount] = useState(200)
  const [isPaid, setIsPaid] = useState(false)

  const startDate = "2025-09-03T00:00:00"

  useEffect(() => {
    const savedAmount = localStorage.getItem("debtAmount")
    const savedPaid = localStorage.getItem("isPaid")

    if (savedAmount) setDebtAmount(Number(savedAmount))
    if (savedPaid) setIsPaid(savedPaid === "true")

    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowStickyTimer(scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isPaid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="text-6xl md:text-8xl mb-8 floating">🎉</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6 text-balance">PAGOOOOOO!</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Allan finalmente pagou os R$ {debtAmount.toFixed(2)}!
          </p>
          <div className="modern-card p-8 pulse-glow">
            <p className="text-lg font-semibold text-primary">🎊 Missão cumprida! 🎊</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative">
          <div className="max-w-6xl w-full space-y-12">
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                <span className="text-gradient">ALLAN MATTES SANTIAGO</span>
                <br />
                <span className="text-foreground">ESTÁ A</span>
              </h1>
            </div>

            {/* Timer */}
            <div className="py-8">
              <DebtTimer startDate={startDate} />
            </div>

            {/* Bottom Text */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-destructive text-balance">
                SEM PAGAR O VINI (
                <a
                  href="https://instagram.com/mzzvxm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary transition-colors duration-300 underline decoration-2 underline-offset-4"
                >
                  @mzzvxm
                </a>
                )
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-medium">me paga aí caloteiro</p>
              <div className="modern-card p-6 md:p-8 pulse-glow">
                <p className="text-lg md:text-xl font-semibold text-primary">
                  Valor da dívida: R$ {debtAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre o Allan */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="modern-card p-8 shadow-glow">
              <h3 className="text-xl md:text-2xl font-bold text-gradient mb-6">
                Ainda tem dúvidas de qual Allan estamos falando? 🤔
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base max-w-3xl mx-auto">
                Estamos falando do <strong className="text-primary">Allan Mattes Santiago</strong> (
                <a
                  href="https://instagram.com/santtxn_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary transition-colors duration-300"
                >
                  @santtxn_
                </a>
                ), estudante do <strong className="text-accent">3° ano do ensino médio</strong>, no
                <strong className="text-primary"> Colégio Estadual Dr. Décio Dossi</strong>. Ele estuda no
                <strong className="text-accent"> 3°A</strong>, no{" "}
                <strong className="text-primary">turno da manhã</strong>, e está devendo o Vinicius (
                <a
                  href="https://instagram.com/mzzvxm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary transition-colors duration-300"
                >
                  @mzzvxm
                </a>
                ) e <strong className="text-destructive">tá dando o calote já</strong>! 😤
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="modern-card p-8 shadow-glow">
              <h3 className="text-xl md:text-2xl font-bold text-gradient mb-6">O que aconteceu? 🤔</h3>
              <p className="text-muted-foreground leading-relaxed text-base max-w-3xl mx-auto">
                No dia <strong className="text-primary">03 de setembro de 2025</strong>, Allan Mattes Santiago pegou
                emprestado comigo a quantia de <strong className="text-accent">R$ {debtAmount.toFixed(2)}</strong>.
                Desde então, esse cronômetro conta implacavelmente o tempo que ele está devendo. Será que ele vai ter
                coragem moral de continuar me devendo? 🤷‍♂️
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground italic">
                * Este site não é uma brincadeira entre amigos. Allan, se você está vendo isso, me paga seu viadinho filho da puta. 😄
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gradient text-balance">
              Estatísticas da Dívida 📊
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="modern-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">R$ {debtAmount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground font-medium">Valor Original</div>
              </div>

              <div className="modern-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-accent mb-2">∞</div>
                <div className="text-sm text-muted-foreground font-medium">Paciência do Vini</div>
              </div>

              <div className="modern-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-destructive mb-2">0</div>
                <div className="text-sm text-muted-foreground font-medium">Pagamentos</div>
              </div>

              <div className="modern-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Calotagem</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Timer */}
      <StickyTimer startDate={startDate} isVisible={showStickyTimer} />
    </>
  )
}
