import React from 'react';
import { Popcorn, CupSoda, Plus, Minus } from 'lucide-react';
import { formatVND } from '../utils/format';

interface ComboSelectorProps {
  combo1Qty: number;
  onCombo1Change: (qty: number) => void;
  combo2Qty: number;
  onCombo2Change: (qty: number) => void;
  maxCombos?: number;
}

export const ComboSelector: React.FC<ComboSelectorProps> = ({
  combo1Qty,
  onCombo1Change,
  combo2Qty,
  onCombo2Change,
  maxCombos = 3,
}) => {
  const totalCombos = combo1Qty + combo2Qty;
  const isMaxReached = totalCombos >= maxCombos;

  const handleUpdate = (type: 1 | 2, delta: number) => {
    if (type === 1) {
      const next = combo1Qty + delta;
      if (next < 0) return;
      if (delta > 0 && totalCombos >= maxCombos) return;
      onCombo1Change(next);
    } else {
      const next = combo2Qty + delta;
      if (next < 0) return;
      if (delta > 0 && totalCombos >= maxCombos) return;
      onCombo2Change(next);
    }
  };

  return (
    <div className="bg-[#121212] rounded-2xl p-5 md:p-6 border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden">
      {/* Decorative popcorn gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB800] via-[#FFD700] to-[#E71A0F]" />

      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB800] to-[#FF8800] text-zinc-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
            <Popcorn className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
          </div>
          <h2 className="text-base md:text-lg font-black uppercase tracking-wider text-white">
            2. Combo Bắp Nước CGV
          </h2>
        </div>

        {/* Total Combos Badge */}
        <div
          className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
            isMaxReached
              ? 'bg-[#E71A0F]/20 text-[#FF2E4D] border border-[#E71A0F]/60'
              : 'bg-zinc-900 text-amber-300 border border-amber-500/30'
          }`}
        >
          <span>
            Đã chọn: <strong className="text-white text-sm">{totalCombos}</strong>/{maxCombos}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Combo 1 Card */}
        <div
          className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
            combo1Qty > 0
              ? 'bg-gradient-to-b from-zinc-900 to-[#18181B] border-[#FFB800] shadow-md shadow-amber-900/20'
              : 'bg-zinc-900/60 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-[#FFB800] shrink-0">
              <div className="flex items-center gap-0.5">
                <Popcorn className="w-4 h-4" />
                <CupSoda className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-xs md:text-sm uppercase text-white">
                Combo 1 Bắp + 1 Nước
              </h3>
              <div className="font-mono mt-0.5 flex items-center gap-2">
                <span className="text-xs text-zinc-500 line-through">{formatVND(95000)}</span>
                <span className="text-sm md:text-base font-black text-[#FFB800]">{formatVND(75000)}</span>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleUpdate(1, -1)}
              disabled={combo1Qty <= 0}
              className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 text-white font-mono font-bold hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-lg font-mono font-black w-5 text-center text-white">
              {combo1Qty}
            </span>
            <button
              type="button"
              onClick={() => handleUpdate(1, 1)}
              disabled={isMaxReached}
              className="w-8 h-8 rounded-full border border-[#FFB800] bg-[#FFB800] text-zinc-950 font-mono font-black hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Combo 2 Card */}
        <div
          className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
            combo2Qty > 0
              ? 'bg-gradient-to-b from-zinc-900 to-[#18181B] border-[#FFB800] shadow-md shadow-amber-900/20'
              : 'bg-zinc-900/60 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-[#FFB800] shrink-0">
              <div className="flex items-center gap-0.5">
                <Popcorn className="w-4 h-4" />
                <CupSoda className="w-4 h-4" />
                <CupSoda className="w-4 h-4 -ml-2" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-xs md:text-sm uppercase text-white">
                Combo 1 Bắp + 2 Nước
              </h3>
              <div className="font-mono mt-0.5 flex items-center gap-2">
                <span className="text-xs text-zinc-500 line-through">{formatVND(125000)}</span>
                <span className="text-sm md:text-base font-black text-[#FFB800]">{formatVND(95000)}</span>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleUpdate(2, -1)}
              disabled={combo2Qty <= 0}
              className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 text-white font-mono font-bold hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-lg font-mono font-black w-5 text-center text-white">
              {combo2Qty}
            </span>
            <button
              type="button"
              onClick={() => handleUpdate(2, 1)}
              disabled={isMaxReached}
              className="w-8 h-8 rounded-full border border-[#FFB800] bg-[#FFB800] text-zinc-950 font-mono font-black hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
