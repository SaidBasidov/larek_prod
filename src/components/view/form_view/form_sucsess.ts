import { eventId } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface ISuccess {
  text: string;
}

export class SuccessForm extends Component<ISuccess> {
  protected textElement: HTMLElement;

  constructor(container: HTMLElement, event: IEvents) {
    super(container);

    this.textElement = ensureElement(
      ".order-success__description",
      this.container,
    );

    this.container.addEventListener("click", () => {
      event.emit(eventId.CloseModalSuccess);
    });
  }

  set text(info: string) {
    this.textElement.textContent = info;
  }
}
