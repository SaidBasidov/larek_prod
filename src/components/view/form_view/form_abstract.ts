import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface IForm extends IBuyer {
  submitAvailable: boolean;
  errMessage: string;
}

export abstract class Form extends Component<IForm> {
  protected submitElement: HTMLButtonElement;
  protected errElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.errElement = ensureElement(".form__errors", this.container);
    this.submitElement = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );
  }

  set submitAvailable(notAvailable: boolean) {
    this.submitElement.disabled = notAvailable;
  }

  set errMessage(err: string) {
    this.errElement.textContent = err;
  }
}
