import { TPayment } from "../../../types";
import { eventId } from "../../../utils/constants";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./form_abstract";

interface IOrderForm {
  paymentMethod: TPayment;
  address: string;
}

export class OrderForm extends Form implements IOrderForm {
  protected addressElement: HTMLInputElement;
  protected paymentSelectorElement: HTMLButtonElement[];
  protected errorElement: HTMLElement;

  constructor(container: HTMLElement, event: IEvents) {
    super(container);

    this.addressElement = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );
    this.paymentSelectorElement = ensureAllElements(
      ".button_alt",
      this.container,
    );
    this.errorElement = ensureElement(".form__errors", this.container);

    this.addressElement.addEventListener("input", () => {
      event.emit(eventId.AddressInput, { address: this.addressElement.value });
    });

    this.container.addEventListener("submit", (e: SubmitEvent) => {
      event.emit(eventId.AddressFormSubmit, e);
    });

    this.paymentSelectorElement.forEach((button) => {
      button.addEventListener("click", () => {
        event.emit(eventId.PaymentMethodSelected, button);
      });
    });
  }

  set address(address: string) {
    this.addressElement.value = address;
  }

  set paymentMethod(method: TPayment) {
    this.paymentSelectorElement.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === method);
    });
  }

  set errMessage(message: string) {
    this.errorElement.textContent = message;
  }
}
