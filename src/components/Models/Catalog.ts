import { IProduct } from "../../types";
import { eventId } from "../../utils/constants";
import { IEvents } from "../base/Events";

export class CatalogModel {
  private productList: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(private event: IEvents) {
    this.event = event;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  setSelectedProduct(product: IProduct): void {
    if (product !== null) {
      this.selectedProduct = product;
    }

    this.event.emit(eventId.CatalogSetSelectedProduct);
  }

  getProductList(): IProduct[] {
    return this.productList;
  }

  setProductList(list: IProduct[]): void {
    this.productList = list;

    this.event.emit(eventId.CatalogSetProductLis);
  }

  getProductByID(id: number | string): IProduct {
    let formattedID = id.toString();
    const product = this.productList.find((item) => item.id === formattedID);

    if (!product) {
      throw new Error(`Не найден продукт по ID - ${formattedID}`);
    }

    return product;
  }
}
