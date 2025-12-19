import { eventId } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected closeModalButton: HTMLButtonElement;
  protected content: HTMLElement;

  constructor(event: IEvents, container: HTMLElement) {
    super(container);

    this.closeModalButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this.content = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );

    this.closeModalButton.addEventListener("click", () => {
      event.emit(eventId.ModalClose);
    });

    this.container.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        event.emit(eventId.ModalClose);
      }
    });
  }

  openModal(content: HTMLElement): void {
    this.content.replaceChildren(content);
    this.container.classList.add("modal_active");
  }

  closeModal(): void {
    this.content.replaceChildren();
    this.container.classList.remove("modal_active");
  }
}
