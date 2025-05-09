import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from '../../components/checkout/checkout.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, CheckoutComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent {
  location = inject(Location);
  purchaseData = history.state.purchaseData || {};

}
