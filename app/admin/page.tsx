"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [debtAmount, setDebtAmount] = useState(200)
  const [isPaid, setIsPaid] = useState(false)
  const [startDate, setStartDate] = useState("2025-09-03")
  const [amountPaid, setAmountPaid] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const savedAmount = localStorage.getItem("debtAmount")
    const savedPaid = localStorage.getItem("isPaid")
    const savedStartDate = localStorage.getItem("startDate")
    const savedAmountPaid = localStorage.getItem("amountPaid")

    if (savedAmount) setDebtAmount(Number(savedAmount))
    if (savedPaid) setIsPaid(savedPaid === "true")
    if (savedStartDate) setStartDate(savedStartDate)
    if (savedAmountPaid) setAmountPaid(Number(savedAmountPaid))
  }, [])

  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
    if (password === adminPassword) {
      setIsAuthenticated(true)
      toast({
        title: "Acesso liberado!",
        description: "Bem-vindo ao painel de administração.",
      })
    } else {
      toast({
        title: "Senha incorreta!",
        description: "Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    localStorage.setItem("debtAmount", debtAmount.toString())
    localStorage.setItem("isPaid", isPaid.toString())
    localStorage.setItem("startDate", startDate)
    localStorage.setItem("amountPaid", amountPaid.toString())

    toast({
      title: "Dados salvos!",
      description: "Todas as alterações foram salvas com sucesso.",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Painel Administrativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Senha de Acesso</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="mt-2"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Entrar
            </Button>
            <Button variant="outline" onClick={() => router.push("/")} className="w-full">
              Voltar ao Site
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={() => router.push("/")}>
            Ver Site
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Status do Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="paid-switch">Pagamento Concluído</Label>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${isPaid ? "text-primary" : "text-destructive"}`}>
                    {isPaid ? "Pago" : "Pendente"}
                  </span>
                  <Switch id="paid-switch" checked={isPaid} onCheckedChange={setIsPaid} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="debt-amount">Valor Total da Dívida (R$)</Label>
                <Input
                  id="debt-amount"
                  type="number"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="amount-paid">Valor Já Pago (R$)</Label>
                <Input
                  id="amount-paid"
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data da Dívida</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="start-date">Data de Início</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Valor Total:</span>
                <span className="font-semibold">R$ {debtAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Valor Pago:</span>
                <span className="font-semibold text-primary">R$ {amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Valor Restante:</span>
                <span className={`font-bold ${(debtAmount - amountPaid) > 0 ? "text-destructive" : "text-primary"}`}>
                  R$ {(debtAmount - amountPaid).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSave} className="flex-1">
            Salvar Alterações
          </Button>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}
