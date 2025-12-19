import { eventId } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./form_abstract";

interface IContactForm {
  email: string;
  phone: string;
  errMessage: string;
}

export class ContactForm extends Form implements IContactForm {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;
  protected errorElement: HTMLElement;

  constructor(container: HTMLElement, event: IEvents) {
    super(container);

    this.errorElement = ensureElement(".form__errors", this.container);
    this.emailElement = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );
    this.phoneElement = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    this.container.addEventListener("submit", (e: SubmitEvent) => {
      event.emit(eventId.FormSubmit, e);
    });

    this.emailElement.addEventListener("input", () => {
      event.emit(eventId.EmailInput, { email: this.emailElement.value });
    });

    this.phoneElement.addEventListener("input", () => {
      event.emit(eventId.PhoneInput, { phone: this.phoneElement.value });
    });
  }

  set email(email: string) {
    this.emailElement.value = email;
  }

  set phone(phone: string) {
    this.phoneElement.value = phone;
  }

  set errMessage(message: string) {
    this.errorElement.textContent = message;
  }
}
