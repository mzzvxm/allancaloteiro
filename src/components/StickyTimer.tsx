import { DebtTimer } from "./DebtTimer"

interface StickyTimerProps {
  startDate: string
  isVisible: boolean
}

export const StickyTimer = ({ startDate, isVisible }: StickyTimerProps) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-lg border border-border rounded-2xl p-4 shadow-soft">
        <div className="text-xs font-semibold text-muted-foreground mb-2 text-center">Allan deve há:</div>
        <DebtTimer startDate={startDate} isCompact />
      </div>
    </div>
  )
}
