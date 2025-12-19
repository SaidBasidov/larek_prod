import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
// import { IEvents } from "../../base/Events";
import { Card } from "./card_abstract";

export type CategoryKey = keyof typeof categoryMap;

export class CatalogCard extends Card {
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;

  constructor(container: HTMLElement, event: any) {
    super(container);

    this.categoryElement = ensureElement(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    this.container.addEventListener("click", event.onClick);
  }

  set image(image: string) {
    this.setImage(this.imageElement, image);
  }

  set category(category: string) {
    const categoryKey = category as CategoryKey;
    const categoryName = categoryMap[categoryKey];
    this.categoryElement.className = "card__category";
    this.categoryElement.classList.add(categoryName);
  }
}
