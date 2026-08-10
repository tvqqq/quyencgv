import React from 'react';
import { Ticket, Percent } from 'lucide-react';
import { formatVND } from '../utils/format';
import { CGVAppGuide } from './CGVAppGuide';

interface TicketInputProps {
  ticketPrice: number;
  onTicketPriceChange: (price: number) => void;
}

export const TicketInput: React.FC<TicketInputProps> = ({
  ticketPrice,
  onTicketPriceChange,
}) => {
  const discountedTicketPrice = Math.round(ticketPrice * 0.8);
  const ticketSavings = ticketPrice - discountedTicketPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    const num = rawVal ? parseInt(rawVal, 10) : 0;
    onTicketPriceChange(num);
  };

  return (
    <div className="bg-[#121212] rounded-2xl p-5 md:p-6 border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden">
      {/* Decorative cinema highlight line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E71A0F] via-[#FFB800] to-[#E71A0F]" />

      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E71A0F] to-[#FF2E4D] text-white flex items-center justify-center font-black shadow-md shadow-[#E71A0F]/20">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black uppercase tracking-wider text-white">
              1. Giá Vé Xem Phim (CGV / MoMo)
            </h2>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs md:text-sm font-bold uppercase tracking-wider">
          <Percent className="w-4 h-4" />
          Giảm 20%
        </span>
      </div>

      {/* Side-by-side grid: Left = Input + Calc Box, Right = Guide Picture */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Input and Live Calc */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-amber-400">
              Tổng tiền vé gốc hiển thị trên App CGV hoặc MoMo (VNĐ)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={ticketPrice ? ticketPrice.toLocaleString('vi-VN') : ''}
                onChange={handleInputChange}
                placeholder="490.000"
                className="w-full pl-4 pr-16 py-3.5 bg-zinc-900/90 border-2 border-zinc-700 focus:border-[#E71A0F] rounded-xl text-white font-mono font-extrabold text-2xl md:text-3xl outline-none transition-all placeholder:text-zinc-600 shadow-inner"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-amber-400 font-mono">
                VND
              </span>
            </div>
          </div>

          {/* Live Calculation Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-[#18181B] border border-zinc-700/80 flex items-center justify-between gap-3 font-mono shadow-md">
            <div>
              <div className="text-xs text-zinc-400">
                Vé gốc: <span className="line-through">{formatVND(ticketPrice)}</span>
              </div>
              <div className="text-xs font-bold text-emerald-400">
                Tiết kiệm 20%: -{formatVND(ticketSavings)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-sans">
                Thực trả vé (-20%)
              </div>
              <div className="text-xl md:text-2xl font-black text-[#FFB800]">
                {formatVND(discountedTicketPrice)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Guide Image next to input */}
        <div className="md:col-span-5">
          <CGVAppGuide />
        </div>
      </div>
    </div>
  );
};
