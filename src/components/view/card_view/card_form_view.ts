import { ensureElement } from "../../../utils/utils";
import { Card } from "./card_abstract";

export class FormCard extends Card {
  private indexElement: HTMLElement;
  private deleteButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, event: any) {
    super(container);

    this.indexElement = ensureElement(".basket__item-index", this.container);
    this.deleteButtonElement = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    this.deleteButtonElement.addEventListener("click", event.onClick);
  }

  set index(index: number) {
    this.indexElement.textContent = `${index}`;
  }
}
