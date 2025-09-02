"use client"

import { useState, useEffect } from "react"
import { DebtTimer } from "@/components/DebtTimer"
import { StickyTimer } from "@/components/StickyTimer"
import { AdminPanel } from "@/components/AdminPanel"

export default function Page() {
  const [showStickyTimer, setShowStickyTimer] = useState(false)
  const [debtAmount, setDebtAmount] = useState(200)
  const [isPaid, setIsPaid] = useState(false)

  const startDate = "2025-09-03T00:00:00"

  useEffect(() => {
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
          <div className="space-card p-8 pulse-glow">
            <p className="text-lg font-semibold text-primary">🎊 Missão cumprida! 🎊</p>
          </div>
        </div>
        <AdminPanel
          currentAmount={debtAmount}
          isPaid={isPaid}
          onUpdateAmount={setDebtAmount}
          onTogglePaid={setIsPaid}
        />
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative">
          <div className="absolute top-20 right-20 text-6xl moon-glow floating hidden md:block">🌙</div>

          <div className="max-w-6xl w-full space-y-12">
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
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
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-destructive animate-pulse text-balance">
                SEM ME PAGAR
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">me paga aí caloteiro</p>
              <div className="space-card p-6 md:p-8 pulse-glow">
                <p className="text-xl md:text-2xl font-semibold text-primary">
                  Valor da dívida: R$ {debtAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gradient text-balance">
              Vamos viralizar essa cobrança! 🚀
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-card p-8 shadow-glow">
                <h3 className="text-2xl font-bold text-primary mb-4">#AllanPagaOVini</h3>
                <p className="text-foreground/90 leading-relaxed">
                  Compartilhe nas suas redes sociais e marca o Allan para ele ver que todo mundo sabe que ele é
                  caloteiro!
                </p>
              </div>

              <div className="space-card p-8 shadow-glow">
                <h3 className="text-2xl font-bold text-accent mb-4">#AllanCaloteiro</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Vamos fazer essa hashtag chegar até ele! Quanto mais gente souber, mais pressão para pagar!
                </p>
              </div>
            </div>

            <div className="space-card p-8 shadow-glow">
              <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-6">O que aconteceu? 🤔</h3>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
                No dia <strong className="text-primary">03 de setembro de 2025</strong>, Allan Mattes Santiago pegou
                emprestado comigo a quantia de <strong className="text-accent">R$ {debtAmount.toFixed(2)}</strong>.
                Desde então, esse cronômetro conta implacavelmente o tempo que ele está devendo. Será que ele vai ter
                coragem moral de continuar me devendo? 🤷‍♂️
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground italic">
                * Este site é uma brincadeira entre amigos. Allan, se você está vendo isso, você sabe o que fazer! 😄
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gradient text-balance">
              Estatísticas da Dívida 📊
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">R$ {debtAmount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground font-medium">Valor Original</div>
              </div>

              <div className="space-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-accent mb-2">∞</div>
                <div className="text-sm text-muted-foreground font-medium">Paciência do Vini</div>
              </div>

              <div className="space-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-destructive mb-2">0</div>
                <div className="text-sm text-muted-foreground font-medium">Pagamentos</div>
              </div>

              <div className="space-card p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="text-3xl font-bold text-gradient mb-2">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Calotagem</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Timer */}
      <StickyTimer startDate={startDate} isVisible={showStickyTimer} />

      {/* Admin Panel */}
      <AdminPanel currentAmount={debtAmount} isPaid={isPaid} onUpdateAmount={setDebtAmount} onTogglePaid={setIsPaid} />
    </>
  )
}
