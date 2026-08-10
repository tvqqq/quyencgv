import React from 'react';
import { Calculator, Tag, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatVND } from '../utils/format';
import { CalculationResult } from '../types';

interface ReceiptBreakdownProps {
  calculation: CalculationResult;
  ticketCount: number;
}

export const ReceiptBreakdown: React.FC<ReceiptBreakdownProps> = ({
  calculation,
  ticketCount,
}) => {
  const {
    rawTicketPrice,
    discountedTicketPrice,
    ticketSavings,
    combo1Quantity,
    combo1Total,
    combo2Quantity,
    combo2Total,
    totalCombosPrice,
    comboSavings,
    grandTotal,
    totalSavings,
  } = calculation;

  return (
    <div className="bg-[#0F0F0F] rounded-xl p-5 md:p-6 border border-zinc-800 shadow-lg space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-[#E71A0F]/20 text-[#E71A0F] flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#E71A0F]">
              3. Bảng Chi Tiết Tính Tiền
            </h2>
            <p className="text-[11px] text-zinc-400">
              Tổng quan thanh toán thực nhận
            </p>
          </div>
        </div>

        {totalSavings > 0 && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 text-[10px] font-mono font-bold uppercase">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Tiết kiệm {formatVND(totalSavings)}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 font-mono">
        {/* Ticket calculation itemized */}
        <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400 font-sans">
              <Tag className="w-3.5 h-3.5 text-[#E71A0F]" />
              Tiền vé gốc ({ticketCount} vé):
            </span>
            <span className="line-through text-zinc-500">
              {formatVND(rawTicketPrice)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs font-bold">
            <span className="text-emerald-400 font-sans flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Thực trả vé (chiết khấu 20%):
            </span>
            <span className="text-white">
              {formatVND(discountedTicketPrice)}
            </span>
          </div>
        </div>

        {/* Combo items breakdown */}
        {(combo1Quantity > 0 || combo2Quantity > 0) && (
          <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
            <div className="text-[10px] uppercase font-bold text-zinc-400 font-sans mb-1">
              Combo bắp nước đã chọn:
            </div>

            {combo1Quantity > 0 && (
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-400 font-sans">
                  Combo 1 ({combo1Quantity}x @ 75k)
                </span>
                <span>{formatVND(combo1Total)}</span>
              </div>
            )}

            {combo2Quantity > 0 && (
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-zinc-400 font-sans">
                  Combo 2 ({combo2Quantity}x @ 95k)
                </span>
                <span>{formatVND(combo2Total)}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800 font-bold">
              <span className="text-zinc-300 font-sans">Tổng tiền bắp nước:</span>
              <span className="text-[#E71A0F]">{formatVND(totalCombosPrice)}</span>
            </div>
          </div>
        )}

        {/* Total calculation row */}
        <div className="p-5 rounded-xl bg-zinc-900 border border-[#E71A0F]/50 shadow-inner text-center space-y-1">
          <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-sans font-bold">
            SỐ TIỀN THỰC TRẢ (SETTLEMENT)
          </div>
          <div className="text-4xl md:text-5xl font-mono font-black text-white tracking-tight">
            {formatVND(grandTotal)}
          </div>
          <p className="text-[10px] text-emerald-400 font-sans pt-1">
            (Vé đã giảm 20%) + Σ(Combo bắp nước) {comboSavings > 0 ? `• Tiết kiệm ${formatVND(ticketSavings + comboSavings)}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
