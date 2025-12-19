import { IProduct } from "../../types";
import { eventId } from "../../utils/constants";
import { IEvents } from "../base/Events";

export class Cart {
  private cartProductList: IProduct[] = [];

  constructor(private event: IEvents) {
    this.event = event;
  }

  getCartProductList(): IProduct[] {
    return this.cartProductList;
  }

  addProduct(product: IProduct): void {
    this.cartProductList.push(product);

    this.event.emit(eventId.CartUpdate);
  }

  deleteProduct(product: IProduct): void {
    const index: number = this.cartProductList.findIndex(
      (item) => item.id === product.id,
    );

    this.cartProductList.splice(index, 1);

    this.event.emit(eventId.CartUpdate);
  }

  getProductListLength(): number {
    return this.cartProductList.length;
  }

  getPriceSum(list: IProduct[]): number {
    return list.reduce((total, listItem) => {
      if (listItem.price === null) {
        return total;
      } else {
        return total + listItem.price;
      }
    }, 0);
  }

  isProductInList(product: IProduct): boolean {
    return this.cartProductList.some((p) => p.id === product.id);
  }

  clearCart(): void {
    this.cartProductList = [];

    this.event.emit(eventId.CartUpdate);
  }
}
