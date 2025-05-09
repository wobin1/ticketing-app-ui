import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/tickets.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { QrScannerService } from '../../services/qr-scanner.service';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.scss'
})
export class QrScannerComponent {
  qrScannerService = inject(QrScannerService);
  ticketService = inject(TicketService);

  isScanning = false;
  scanResult: { valid: boolean; message: string } | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  startScanner() {
    this.isScanning = true;
    this.scanResult = null;

    this.qrScannerService.startScanner(this.videoElement.nativeElement, this.canvasElement.nativeElement, (result) => {
      this.ticketService.verifyTicket(result).subscribe({
        next: (response) => {
          this.scanResult = response;
          if (response.valid) {
            this.ticketService.checkInTicket(result).subscribe();
          }
          this.stopScanner();
        },
        error: () => {
          this.scanResult = { valid: false, message: 'Error verifying ticket' };
          this.stopScanner();
        }
      });
    });
  }

  stopScanner() {
    this.isScanning = false;
    this.qrScannerService.stopScanner();
  }

}
