"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Eraser, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function DrawingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#87ceeb");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  const colors = [
    { name: "Xanh nhạt", value: "#87ceeb" },
    { name: "Xám", value: "#808080" },
    { name: "Đỏ", value: "#ff6b6b" },
    { name: "Vàng", value: "#ffd93d" },
    { name: "Tím", value: "#a8a8ff" },
    { name: "Nâu", value: "#8b4513" },
    { name: "Xanh lá", value: "#90ee90" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set initial styles
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
  }, [selectedColor, brushSize]);

  const getEventPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault(); // Prevent scrolling on mobile
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);

    const { x, y } = getEventPos(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getEventPos(e);

    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
    }

    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Gradual fade effect
    const fadeOut = () => {
      ctx.globalAlpha = 0.1;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let hasContent = false;

      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) {
          hasContent = true;
          break;
        }
      }

      if (hasContent) {
        setTimeout(fadeOut, 50);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    };

    fadeOut();
  };

  return (
    <motion.div
      className="min-h-screen bg-linear-to-b from-blue-50 to-white motion-gpu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Page title */}
        <motion.div
          className="text-center mb-8 motion-gpu"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 motion-gpu"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Drawing
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-4 motion-gpu"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Vẽ lại bất cứ thứ gì theo tâm trạng bạn hôm nay
          </motion.p>
        </motion.div>

        {/* Drawing tools */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 motion-gpu"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
            {/* Color palette */}
            <motion.div
              className="flex flex-col items-start gap-2 sm:flex-row sm:items-center motion-gpu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Màu sắc:
                </span>
              </div>
              <div className="flex space-x-2">
                {colors.map((color, index) => (
                  <motion.button
                    key={color.value}
                    onClick={() => {
                      setSelectedColor(color.value);
                      setIsErasing(false);
                    }}
                    className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full border-2 motion-gpu ${
                      selectedColor === color.value
                        ? "border-gray-400"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Brush size */}
            <motion.div
              className="flex items-center space-x-2 motion-gpu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <span className="text-sm font-medium text-gray-700">
                Kích thước:
              </span>
              <input
                type="range"
                min="2"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24 sm:w-20"
              />
              <span className="text-sm text-gray-600">{brushSize}px</span>
            </motion.div>

            {/* Eraser */}
            <motion.button
              onClick={() => setIsErasing(!isErasing)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 motion-gpu ${
                isErasing
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eraser className="w-4 h-4" />
              <span className="text-sm font-medium">Xóa</span>
            </motion.button>

            {/* Clear canvas */}
            <motion.button
              onClick={clearCanvas}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-300 motion-gpu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Xóa tất cả</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 motion-gpu"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          <div className="flex justify-center">
            <motion.canvas
              ref={canvasRef}
              className="border-2 border-gray-200 rounded-lg cursor-crosshair bg-white touch-none h-[500px] md:h-[600px] motion-gpu"
              style={{
                width: "100%",
                maxWidth: "800px",
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="text-center mt-8 motion-gpu"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <p className="text-gray-600 text-sm sm:text-base">
            💡 Mẹo: Sử dụng màu sắc khác nhau để thể hiện cảm xúc của bạn
            <br />
            📱 Trên điện thoại: Chạm và kéo để vẽ, chạm vào màu để chọn
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}
