import { useRef } from "react";

interface UseChartDownloadOptions {
    fileName?: string;
    title?: string;
    fontSize?: number;
    lineHeight?: number;
    padding?: number;
    titleMarginTop?: number;
}

export const useChartDownload = ({
    fileName = "chart",
    title = "",
    fontSize = 16,
    lineHeight = 24,
    padding = 10,
    titleMarginTop = 10,
}: UseChartDownloadOptions) => {
    const chartWrapperRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        if (!chartWrapperRef.current) return;

        const chartCanvas = chartWrapperRef.current.querySelector("canvas");
        if (!chartCanvas) {
            console.warn("Canvas not found inside chart wrapper");
            return;
        }

        if (!title.trim()) {
            const link = document.createElement("a");
            link.href = chartCanvas.toDataURL("image/png");
            link.download = `${fileName}.png`;
            link.click();
            return;
        }

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) {
            console.error("Failed to get temp canvas context.");
            return;
        }

        tempCtx.font = `bold ${fontSize}px Arial`;
        const maxWidth = chartCanvas.width - 2 * padding;
        const words = title.split(" ");
        const lines: string[] = [];
        let currentLine = "";

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (tempCtx.measureText(testLine).width > maxWidth) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);

        const headerHeight = titleMarginTop + lines.length * lineHeight + padding;

        const combinedCanvas = document.createElement("canvas");
        combinedCanvas.width = chartCanvas.width;
        combinedCanvas.height = chartCanvas.height + headerHeight;

        const ctx = combinedCanvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get canvas context.");
            return;
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, combinedCanvas.width, combinedCanvas.height);

        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = "black";
        lines.forEach((line, i) => {
            const textWidth = ctx.measureText(line).width;
            const x = (combinedCanvas.width - textWidth) / 2;
            const y = titleMarginTop + (i + 1) * lineHeight - (lineHeight - fontSize) / 2;
            ctx.fillText(line, x, y);
        });


        ctx.drawImage(chartCanvas, 0, headerHeight);

        const sanitizedFilename = fileName
            .replace(/[/\\?%*:|"<>]/g, "_")
            .trim();

        const link = document.createElement("a");
        link.href = combinedCanvas.toDataURL("image/png");
        link.download = `${sanitizedFilename}.png`;  // ← always fileName
        link.click();
    };

    return { chartWrapperRef, handleDownload };
};