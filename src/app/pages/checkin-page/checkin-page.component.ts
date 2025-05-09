import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from '../../components/qr-scanner/qr-scanner.component';


@Component({
  selector: 'app-checkin-page',
  standalone: true,
  imports: [CommonModule, QrScannerComponent],
  templateUrl: './checkin-page.component.html',
  styleUrl: './checkin-page.component.scss'
})
export class CheckinPageComponent {

}
