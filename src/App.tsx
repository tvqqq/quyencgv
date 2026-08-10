import { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { TicketInput } from './components/TicketInput';
import { ComboSelector } from './components/ComboSelector';
import { VietQRDisplay } from './components/VietQRDisplay';
import { Footer } from './components/Footer';

export default function App() {
  const [ticketPrice, setTicketPrice] = useState<number>(490000);
  const [combo1Qty, setCombo1Qty] = useState<number>(0);
  const [combo2Qty, setCombo2Qty] = useState<number>(0);

  const calculation = useMemo(() => {
    const rawTicketPrice = ticketPrice;
    const discountedTicketPrice = Math.round(rawTicketPrice * 0.8);
    const combo1Total = combo1Qty * 75000;
    const combo2Total = combo2Qty * 95000;
    const totalCombosPrice = combo1Total + combo2Total;
    const grandTotal = discountedTicketPrice + totalCombosPrice;

    return {
      rawTicketPrice,
      discountedTicketPrice,
      combo1Qty,
      combo2Qty,
      totalCombosPrice,
      grandTotal,
    };
  }, [ticketPrice, combo1Qty, combo2Qty]);

  const handleReset = () => {
    setTicketPrice(490000);
    setCombo1Qty(0);
    setCombo2Qty(0);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] antialiased font-sans selection:bg-[#E71A0F] selection:text-white pb-8">
      {/* High Density Top Navbar */}
      <header className="bg-[#121212] border-b border-zinc-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E71A0F] via-[#FF2E4D] to-[#FFB800] text-white flex items-center justify-center font-black text-base rounded-lg shadow-md shadow-red-900/30">
              Q
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm md:text-base uppercase tracking-wider text-white">
                Quyền bán vé CGV
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E71A0F]/20 text-[#FF2E4D] border border-[#E71A0F]/50 text-xs font-black uppercase">
                GIẢM 20%
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5"
            title="Đặt lại tính toán"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            ĐẶT LẠI
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 mt-4 md:mt-5 space-y-4">
        {/* Step 1: Ticket Price Input + Side-by-side Guide Picture */}
        <TicketInput
          ticketPrice={ticketPrice}
          onTicketPriceChange={setTicketPrice}
        />

        {/* Step 2: Popcorn & Drinks Combos */}
        <ComboSelector
          combo1Qty={combo1Qty}
          onCombo1Change={setCombo1Qty}
          combo2Qty={combo2Qty}
          onCombo2Change={setCombo2Qty}
          maxCombos={3}
        />

        {/* Step 3: VietQR Payment & Settlement */}
        <VietQRDisplay
          grandTotal={calculation.grandTotal}
          discountedTicketPrice={calculation.discountedTicketPrice}
          totalCombosPrice={calculation.totalCombosPrice}
          combo1Qty={calculation.combo1Qty}
          combo2Qty={calculation.combo2Qty}
        />

        {/* Footer with version v1.4.0 */}
        <Footer />
      </main>
    </div>
  );
}
