"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface AdminPanelProps {
  currentAmount: number
  isPaid: boolean
  onUpdateAmount: (amount: number) => void
  onTogglePaid: (paid: boolean) => void
}

export const AdminPanel = ({ currentAmount, isPaid, onUpdateAmount, onTogglePaid }: AdminPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [newAmount, setNewAmount] = useState(currentAmount.toString())
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  const handleLogin = () => {
    if (password === "vini123") {
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

  const handleUpdateAmount = () => {
    const amount = Number.parseFloat(newAmount)
    if (!isNaN(amount) && amount >= 0) {
      onUpdateAmount(amount)
      toast({
        title: "Valor atualizado!",
        description: `Novo valor: R$ ${amount.toFixed(2)}`,
      })
    } else {
      toast({
        title: "Valor inválido!",
        description: "Digite um valor numérico válido.",
        variant: "destructive",
      })
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-secondary hover:bg-secondary/80 border border-border shadow-soft"
        size="sm"
      >
        Admin
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-lg border-border shadow-glow rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Painel Admin</CardTitle>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground rounded-xl"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isAuthenticated ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-foreground">
                  Senha de Acesso
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-input border-border rounded-xl mt-2"
                />
              </div>
              <Button onClick={handleLogin} className="w-full rounded-xl">
                Entrar
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="paid-switch" className="text-foreground">
                  Status Pagamento
                </Label>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${isPaid ? "text-primary" : "text-destructive"}`}>
                    {isPaid ? "Pago" : "Pendente"}
                  </span>
                  <Switch id="paid-switch" checked={isPaid} onCheckedChange={onTogglePaid} />
                </div>
              </div>

              <div>
                <Label htmlFor="amount" className="text-foreground">
                  Valor da Dívida (R$)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="bg-input border-border rounded-xl mt-2"
                />
              </div>

              <Button onClick={handleUpdateAmount} className="w-full rounded-xl">
                Atualizar Valor
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
