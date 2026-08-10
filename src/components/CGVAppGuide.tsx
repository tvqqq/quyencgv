import React, { useState } from 'react';
import { ZoomIn, X, Info } from 'lucide-react';
import cgvGuideImg from '../assets/images/cgv_user_guide_1786333915289.jpg';

export const CGVAppGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-900/90 rounded-xl border border-zinc-700/80 p-3 flex flex-col items-center justify-between gap-2.5 h-full relative group">
        <div className="flex items-center justify-between w-full text-xs font-bold text-amber-300">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            Hình Hướng Dẫn CGV / MoMo
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 transition-all"
          >
            <ZoomIn className="w-3 h-3 text-amber-400" /> Phóng to
          </button>
        </div>

        {/* Thumbnail Image */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative w-full aspect-[9/12] max-h-[180px] bg-black rounded-lg overflow-hidden border border-zinc-700/80 cursor-pointer shadow-md group-hover:border-amber-500/80 transition-all flex items-center justify-center"
        >
          <img
            src={cgvGuideImg}
            alt="Hướng dẫn nhập giá tiền tạm tính từ app CGV hoặc MoMo"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[1px]">
            <ZoomIn className="w-4 h-4 text-amber-400" /> Xem ảnh gốc
          </div>
        </div>

        <p className="text-[11px] text-zinc-400 text-center font-medium leading-tight">
          Lấy số <strong className="text-pink-400">"Tạm tính"</strong> ở màn hình chọn ghế nhập vào ô bên cạnh.
        </p>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-3 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Hình Hướng Dẫn App CGV / MoMo
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto rounded-xl bg-black border border-zinc-800 p-2 flex items-center justify-center">
              <img
                src={cgvGuideImg}
                alt="Ảnh gốc hướng dẫn CGV MoMo"
                className="max-h-[68vh] w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-zinc-300 text-center font-medium">
              Nhập giá tại mục <strong className="text-pink-400">"Tạm tính"</strong> ở góc dưới ứng dụng CGV / MoMo.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
