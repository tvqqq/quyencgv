import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Copy,
  Check,
  Building2,
  User,
  CreditCard,
  Download,
  ExternalLink,
  RefreshCw,
  Zap,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { formatVND } from '../utils/format';

interface VietQRDisplayProps {
  grandTotal: number;
  discountedTicketPrice: number;
  totalCombosPrice: number;
  combo1Qty: number;
  combo2Qty: number;
  ticketCount?: number;
}

export const VietQRDisplay: React.FC<VietQRDisplayProps> = ({
  grandTotal,
  discountedTicketPrice,
  totalCombosPrice,
  combo1Qty,
  combo2Qty,
  ticketCount = 2,
}) => {
  const accountNumber = '151618';
  const bankName = 'Techcombank';
  const accountHolder = 'TAT VI QUYEN';

  const billText = `- Giá ${ticketCount} vé: ${discountedTicketPrice.toLocaleString('vi-VN')}đ\n- Combo bắp nước: ${totalCombosPrice.toLocaleString('vi-VN')}đ\n- Tổng cộng: ${grandTotal.toLocaleString('vi-VN')}đ\n---\nSTK: Techcombank 151618`;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [grandTotal]);

  const qrUrl = `https://vietqr.app/img?acc=${accountNumber}&bank=${encodeURIComponent(
    bankName
  )}&amount=${grandTotal}&fullacc=true&holder=${encodeURIComponent(
    accountHolder
  )}&template=compact&showinfo=true`;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VietQR-Techcombank-${accountNumber}-${grandTotal}VND.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div className="bg-[#121212] rounded-2xl p-5 md:p-6 border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden">
      {/* Top cinema rainbow stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E71A0F] via-[#FFB800] to-[#004A99]" />

      {/* Header Section */}
      <div className="pb-3 border-b border-zinc-800/80 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E71A0F] via-[#FF2E4D] to-[#FFB800] text-white flex items-center justify-center font-black shadow-md shadow-red-500/20 shrink-0">
            <QrCode className="w-5 h-5" />
          </div>
          <h2 className="text-base md:text-lg font-black uppercase tracking-wider text-white">
            3. Chuyển khoản VietQR
          </h2>
        </div>

        {/* CYAN ALERT WARNING BELOW TITLE */}
        <div className="flex items-center gap-2.5 px-4 py-3 md:py-3.5 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/70 text-xs md:text-sm font-extrabold tracking-wide shadow-sm">
          <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
          <span>Cần nhắn Quyền check lại vé trước khi chuyển khoản</span>
        </div>
      </div>

      {/* SỐ TIỀN THỰC TRẢ (SETTLEMENT BOX) */}
      <div className="p-4 md:p-5 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-2 border-[#E71A0F]/60 shadow-xl text-center space-y-2 relative">
        <div className="text-xs text-zinc-400 uppercase tracking-widest font-sans font-extrabold">
          SỐ TIỀN THỰC TRẢ
        </div>

        <div className="text-4xl sm:text-5xl font-mono font-black text-[#FFB800] tracking-tight">
          {formatVND(grandTotal)}
        </div>

        {/* Small Breakdown Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700 text-xs font-mono">
            Vé CGV (-20%): <strong className="text-white">{formatVND(discountedTicketPrice)}</strong>
          </span>
          {totalCombosPrice > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700 text-xs font-mono">
              Bắp nước ({combo1Qty + combo2Qty} combo): <strong className="text-amber-300">{formatVND(totalCombosPrice)}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Column 1: Larger VietQR Image Container with Blur & Toggle */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-zinc-900/90 rounded-xl border border-zinc-800 relative">
          <div className="relative p-3 bg-white rounded-xl shadow-lg flex flex-col items-center w-full max-w-[280px]">
            <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden bg-white rounded-lg">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950 text-zinc-400 gap-1.5">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#E71A0F]" />
                  <span className="text-xs font-mono">Đang tải QR...</span>
                </div>
              )}

              {imageError ? (
                <div className="text-center p-3">
                  <p className="text-xs text-[#E71A0F] font-bold mb-1">Không tải được QR</p>
                  <a
                    href={qrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-zinc-900 font-bold underline"
                  >
                    Mở QR trực tiếp <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <>
                  <img
                    src={qrUrl}
                    alt={`Mã VietQR Techcombank ${accountNumber} ${grandTotal}`}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    } ${!showQR ? 'blur-md scale-105 opacity-30 select-none' : 'blur-0 opacity-100'}`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                  />

                  {/* Blurred overlay button */}
                  {!showQR && !imageLoading && (
                    <button
                      type="button"
                      onClick={() => setShowQR(true)}
                      className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 p-3 text-center transition-all hover:bg-black/50 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Eye className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span className="text-xs font-black uppercase text-white tracking-wider bg-cyan-950/90 px-3 py-1.5 rounded-lg border border-cyan-500/80 shadow-md">
                        Click để show Mã QR
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 w-full max-w-[280px]">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="flex-1 py-2 px-3 rounded-lg border border-zinc-700 bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Tải QR
            </button>
            <a
              href={qrUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all flex items-center justify-center"
              title="Mở tab mới"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Column 2: Bill Copy-Paste Box */}
        <div className="md:col-span-7 space-y-3 font-mono">
          <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-900 via-[#18181B] to-zinc-900 border border-amber-500/50 space-y-3 shadow-md">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label className="text-xs font-extrabold uppercase tracking-wider text-amber-300 font-sans flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Bill thanh toán (Copy nhanh):
              </label>

              <button
                type="button"
                onClick={() => handleCopy(billText, 'bill')}
                className="py-2 px-3.5 bg-gradient-to-r from-[#E71A0F] via-[#FF2E4D] to-[#E71A0F] hover:from-red-600 hover:to-red-700 text-white font-sans text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-red-900/30"
              >
                {copiedField === 'bill' ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                    <span>Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép Bill</span>
                  </>
                )}
              </button>
            </div>

            {/* Preformatted Bill Box */}
            <div className="p-3.5 bg-black rounded-lg border border-zinc-700/90 text-xs sm:text-sm font-mono font-bold text-yellow-300 leading-relaxed whitespace-pre-wrap select-all">
              {billText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
