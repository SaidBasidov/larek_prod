import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class Card extends Component<IProduct> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement(".card__title", this.container);
    this.priceElement = ensureElement(".card__price", this.container);
  }

  set title(title: string) {
    this.titleElement.textContent = title;
  }

  set price(price: number) {
    this.priceElement.textContent = `${price} синапсов`;
  }

  set priceElementText(text: string) {
    this.priceElement.textContent = text;
  }
}
