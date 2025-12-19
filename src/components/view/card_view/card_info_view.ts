import { categoryMap, eventId } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./card_abstract";
import { CategoryKey } from "./card_catalog_view";

interface ICardInfo {
  // cardInfo: string,
  cardButton: string;
  CardButtonAvailability: boolean;
}

export class CardInfo extends Card implements ICardInfo {
  private buttonElement: HTMLButtonElement;
  private infoElement: HTMLElement;
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;

  constructor(container: HTMLElement, event: IEvents) {
    super(container);

    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );
    this.infoElement = ensureElement(".card__text", this.container);
    this.categoryElement = ensureElement(".card__category", this.container);
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    this.buttonElement.addEventListener("click", () => {
      event.emit(eventId.CardInfo);
    });
  }

  set description(text: string) {
    this.infoElement.textContent = text;
  }

  set cardButton(text: string) {
    this.buttonElement.textContent = text;
  }

  set CardButtonAvailability(NotAvailable: boolean) {
    this.buttonElement.disabled = NotAvailable;
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
