import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ConfirmationModal } from '../model/confirmation-modal.model';

@Injectable()
export class ConfirmationModalService {

   public openModal: boolean;
   public modal = new ConfirmationModal();
   public isAccepted = new Subject<boolean>();
   private handlerAccept: (value: any) => void;
   private handlerDeny: (value: any) => void;

   public confirm(config?: ConfirmationModal, handlerAccept?: (value: any) => void, handlerDeny?: (value: any) => void): Subject<boolean> {
      this.openModal = true;
      this.modal = config ? config : new ConfirmationModal();
      this.addHandlerAccept(handlerAccept);
      this.addHandlerDeny(handlerDeny);
      return this.isAccepted;
   }

   private addHandlerAccept(handlerAccept): void {
      if (handlerAccept) {
         this.handlerAccept = handlerAccept;
      }
   }

   private addHandlerDeny(handlerDeny): void {
      if (handlerDeny) {
         this.handlerDeny = handlerDeny;
      }
   }

   public accept(): void {
      this.closeModal();
      this.isAccepted.next(true);
      if(this.handlerAccept) {
         return this.handlerAccept(true);
      }
   }

   public reject(): void {
      this.closeModal();
      this.isAccepted.next(false);
      if(this.handlerDeny) {
         return this.handlerDeny(false);
      }
   }

   private closeModal(): void {
      this.openModal = false;
   }

}
