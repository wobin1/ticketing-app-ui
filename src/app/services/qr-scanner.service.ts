import { Injectable } from '@angular/core';
import jsQR from 'jsqr';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  private stream: MediaStream | null = null;

  startScanner(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement, onScan: (result: string) => void) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.stream = stream;
        videoElement.srcObject = stream;
        videoElement.play();

        const canvasContext = canvasElement.getContext('2d');
        if (!canvasContext) return;

        const scan = () => {
          if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            canvasElement.height = videoElement.videoHeight;
            canvasElement.width = videoElement.videoWidth;
            canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              onScan(code.data);
              return;
            }
          }
          if (this.stream) {
            requestAnimationFrame(scan);
          }
        };
        requestAnimationFrame(scan);
      })
      .catch(err => {
        console.error('Camera access error:', err);
      });
  }

  stopScanner() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}
