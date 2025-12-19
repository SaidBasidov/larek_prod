import { IErrorObj, IBuyer, TPayment } from "../../types";
import { eventId } from "../../utils/constants";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment: TPayment = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  constructor(private event: IEvents) {
    this.event = event;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clearData(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";

    this.event.emit(eventId.BuyerDataClear);
  }

  setData(data: Partial<IBuyer>): void {
    if (data.address !== undefined) {
      this.address = data.address;
    }
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }

    this.event.emit(eventId.BuyerDataSet);
  }

  validate(): Partial<IErrorObj> | null {
    const validationErrors: Partial<IErrorObj> = {};

    if (!this.payment) {
      validationErrors.payment = "Отсутствует payment";
    }

    if (this.email === "") {
      validationErrors.email = "Отсутствует email";
    }

    if (this.phone === "") {
      validationErrors.phone = "Отсутствует phone";
    }

    if (this.address === "") {
      validationErrors.address = "Отсутствует address";
    }

    return Object.keys(validationErrors).length > 0 ? validationErrors : null;
  }
}
