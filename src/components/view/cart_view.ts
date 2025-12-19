import { IProduct } from "../../types";
import { eventId } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICart extends Partial<IProduct> {
  cartProductList: HTMLElement[];
  cartProductsTotal: number;
  cartOrderButtonAvailability: boolean;
}

export class CartView extends Component<ICart> {
  private listElement: HTMLElement;
  private totalElement: HTMLElement;
  private orderButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, event: IEvents) {
    super(container);

    this.listElement = ensureElement(".basket__list", this.container);
    this.totalElement = ensureElement(".basket__price", this.container);
    this.orderButtonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    this.orderButtonElement.addEventListener("click", () => {
      event.emit(eventId.FormOrderCart);
    });

    this.orderButtonElement.disabled = true;
  }

  set cartProductList(list: HTMLElement[]) {
    this.listElement.replaceChildren(...list);
  }

  set cartProductsTotal(total: number) {
    const value = total ?? 0;
    this.totalElement.textContent = `${value} синапсов`;
  }

  set cartOrderButtonAvailability(value: boolean) {
    this.orderButtonElement.disabled = value;
  }
}
