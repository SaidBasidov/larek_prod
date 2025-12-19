import { eventId } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICartHeader {
  productsInCart: number;
}

export class CartHeader extends Component<ICartHeader> {
  protected counterElement: HTMLElement;
  protected cartButton: HTMLButtonElement;

  constructor(event: IEvents, container: HTMLElement) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container,
    );
    this.cartButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );

    this.cartButton.addEventListener("click", () => {
      event.emit(eventId.BasketOpen);
    });
  }

  set productsInCart(value: number) {
    this.counterElement.textContent = String(value);
  }
}
