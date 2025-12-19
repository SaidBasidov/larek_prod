import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { ApiModel } from "./components/Models/ApiModel";
import { Buyer } from "./components/Models/Buyer";
import { Cart } from "./components/Models/Cart";
import { CatalogModel } from "./components/Models/Catalog";
import { CatalogCard } from "./components/view/card_view/card_catalog_view";
import { FormCard } from "./components/view/card_view/card_form_view";
import { CardInfo } from "./components/view/card_view/card_info_view";
import { CartHeader } from "./components/view/cart_header_view";
import { CartView } from "./components/view/cart_view";
import { Catalog } from "./components/view/catalog_view";
import { ContactForm } from "./components/view/form_view/form_contacts";
import { OrderForm } from "./components/view/form_view/form_order";
import { SuccessForm } from "./components/view/form_view/form_sucsess";
import { Modal } from "./components/view/modal_container_view";
import "./scss/styles.scss";
import { IOrderData, IProduct, TPayment } from "./types";
import { API_URL, CDN_URL, eventId } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

const page = ensureElement(document.querySelector(".page") as HTMLElement);
const headerElement = ensureElement(
  page.querySelector(".header") as HTMLElement,
);
const catalogElement = ensureElement(
  page.querySelector(".gallery") as HTMLElement,
);
const modalElement = ensureElement(page.querySelector(".modal") as HTMLElement);

const api = new Api(API_URL);
const apiModel = new ApiModel(api);

const eventEmitter = new EventEmitter();

const cartModel = new Cart(eventEmitter);
const buyerModel = new Buyer(eventEmitter);
const catalogModel = new CatalogModel(eventEmitter);

const header = new CartHeader(eventEmitter, headerElement);
const modal = new Modal(eventEmitter, modalElement);
const catalog = new Catalog(catalogElement);

const cardInfoModal = new CardInfo(
  cloneTemplate("#card-preview"),
  eventEmitter,
);
const cartModal = new CartView(cloneTemplate("#basket"), eventEmitter);
const orderFormModal = new OrderForm(cloneTemplate("#order"), eventEmitter);
const contactsFormModal = new ContactForm(
  cloneTemplate("#contacts"),
  eventEmitter,
);
const successFormModal = new SuccessForm(
  cloneTemplate("#success"),
  eventEmitter,
);

apiModel
  .getProducts()
  .then((products) => {
    catalogModel.setProductList(products);
  })
  .catch((err) => console.log("Сouldn't load products", err));

eventEmitter.on(eventId.CatalogSetProductLis, () => {
  const productList = catalogModel.getProductList().map((product) => {
    const card = new CatalogCard(cloneTemplate("#card-catalog"), {
      onClick: () => eventEmitter.emit(eventId.test, product),
    });

    let priceText: string;
    if (product.price == null || product.price === 0) {
      priceText = "Бесценно";
    } else {
      priceText = `${product.price} синапсов`;
    }

    const info = {
      ...product,
      image: CDN_URL + product.image,
      priceElementText: priceText,
    };

    eventEmitter.on(eventId.CatalogCardOpen, () =>
      catalogModel.setSelectedProduct(product),
    );
    const renderRes = card.render(info);
    return renderRes;
  });

  catalog.products = productList;
});

eventEmitter.on(eventId.test, (card: IProduct) => {
  const product = catalogModel.getProductByID(card.id);

  let buttonText: string;
  let priceText: string;
  let notAvailable: boolean;
  if (product.price == null || product.price === 0) {
    buttonText = "Недоступно";
    priceText = "Бесценно";
    notAvailable = true;
  } else if (cartModel.getCartProductList().includes(product)) {
    buttonText = "Удалить из корзины";
    priceText = `${product.price} синапсов`;
    notAvailable = false;
  } else {
    buttonText = "Купить";
    priceText = `${product.price} синапсов`;
    notAvailable = false;
  }

  const data = {
    ...product,
    image: CDN_URL + product.image,
    cardButton: buttonText,
    priceElementText: priceText,
    CardButtonAvailability: notAvailable,
  };

  cardInfoModal.render(data);
  catalogModel.setSelectedProduct(product);
});

eventEmitter.on(eventId.CatalogSetSelectedProduct, () => {
  modal.openModal(cardInfoModal.render());
});

eventEmitter.on(eventId.ModalClose, () => {
  modal.closeModal();
});

eventEmitter.on(eventId.CartUpdate, () => {
  const list = cartModel.getCartProductList();
  const total = cartModel.getPriceSum(list);
  const length = cartModel.getProductListLength();

  let notAvailable: boolean = true;
  if (length > 0) {
    notAvailable = false;
  }

  header.render({ productsInCart: length });

  const cardsList = list.map((product, index) => {
    const card = new FormCard(cloneTemplate("#card-basket"), {
      onClick: () => eventEmitter.emit(eventId.CartDeleteProduct, product),
    });

    const data = {
      ...product,
      index: index + 1,
    };

    return card.render(data);
  });

  const data = {
    cartProductList: cardsList,
    cartProductsTotal: total,
    cartOrderButtonAvailability: notAvailable,
  };

  cartModal.render(data);
});

eventEmitter.on(eventId.BasketOpen, () => {
  modal.openModal(cartModal.render());
});

eventEmitter.on(eventId.CardInfo, () => {
  const product = catalogModel.getSelectedProduct();

  if (!product) {
    return;
  }
  if (cartModel.getCartProductList().includes(product)) {
    cartModel.deleteProduct(product);
  } else {
    cartModel.addProduct(product);
  }

  modal.closeModal();
});

eventEmitter.on(eventId.CartDeleteProduct, (product: IProduct) => {
  cartModel.deleteProduct(product);
});

eventEmitter.on(eventId.FormOrderCart, () => {
  modal.openModal(orderFormModal.render());
});

eventEmitter.on(eventId.AddressInput, ({ address }: { address: string }) => {
  buyerModel.setData({ address });
  validateOrder();
});

eventEmitter.on(eventId.PaymentMethodSelected, (btn: HTMLButtonElement) => {
  buyerModel.setData({ payment: btn.name as TPayment });
  validateOrder();
});

eventEmitter.on(eventId.AddressFormSubmit, (e: SubmitEvent) => {
  e.preventDefault();
  modal.openModal(contactsFormModal.render());
});

eventEmitter.on(eventId.EmailInput, ({ email }: { email: string }) => {
  buyerModel.setData({ email });
  validateContacts();
});

eventEmitter.on(eventId.PhoneInput, ({ phone }: { phone: string }) => {
  buyerModel.setData({ phone });
  validateContacts();
});

const ERROR_MESSAGES = {
  payment: "Выберите способ оплаты",
  address: "Укажите адрес доставки",
  email: "Введите корректный email",
  phone: "Введите номер телефона",
} as const;

type ErrorKey = keyof typeof ERROR_MESSAGES;

function pickFirstErrorMessage(
  errors: Partial<Record<ErrorKey, unknown>> | null,
  priority: ErrorKey[],
): string {
  if (!errors) return "";
  for (const key of priority) {
    if (errors[key]) return ERROR_MESSAGES[key];
  }
  return "";
}

function validateOrder() {
  const message = pickFirstErrorMessage(buyerModel.validate(), [
    "payment",
    "address",
  ]);
  orderFormModal.errMessage = message;
  if (message === "") {
    orderFormModal.submitAvailable = false;
  } else {
    orderFormModal.submitAvailable = true;
  }
}

function validateContacts() {
  const message = pickFirstErrorMessage(buyerModel.validate(), [
    "email",
    "phone",
  ]);
  contactsFormModal.errMessage = message;
  if (message === "") {
    contactsFormModal.submitAvailable = false;
  } else {
    contactsFormModal.submitAvailable = true;
  }
}

eventEmitter.on(eventId.PaymentMethodSelected, (button: HTMLButtonElement) => {
  const method: TPayment = button.name as TPayment;
  orderFormModal.paymentMethod = method;
});

function prepareOrder(): IOrderData {
  return {
    ...buyerModel.getData(),
    total: cartModel.getPriceSum(cartModel.getCartProductList()),
    items: cartModel.getCartProductList().map((item) => item.id),
  };
}

async function sendOrder(): Promise<void> {
  const order = prepareOrder();
  try {
    const response = await apiModel.postOrder(order);
    cartModel.clearCart();
    buyerModel.clearData();
    modal.openModal(
      successFormModal.render({ text: `Списано ${response.total} синапсов` }),
    );
  } catch (error) {
    console.log("Ошибка отправки формы на сервер", error);
  }
}

eventEmitter.on(eventId.FormSubmit, (e: SubmitEvent) => {
  e.preventDefault();
  console.log(buyerModel.getData());
  console.log(prepareOrder());
  modal.closeModal();
  sendOrder();
});

eventEmitter.on(eventId.CloseModalSuccess, () => {
  modal.closeModal();
});
// 