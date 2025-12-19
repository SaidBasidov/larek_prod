import { IProduct } from "../../types";
import { Component } from "../base/Component";

interface ICatalog {
  products: IProduct[];
}

export class Catalog extends Component<ICatalog> {
  constructor(container: HTMLElement) {
    super(container);
  }

  set products(products: HTMLElement[]) {
    this.container.replaceChildren(...products);
  }
}
