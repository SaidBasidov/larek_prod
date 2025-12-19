// import { Buyer } from "./components/Models/Buyer";
// import { Cart } from "./components/Models/Cart";
// import { Catalog } from "./components/Models/Catalog";
// import { apiProducts } from "./utils/data";
// import { TPayment } from "./types";
// import { Api } from "./components/base/Api";
// import { API_URL } from "./utils/constants";
// import { ApiModel } from "./components/Models/ApiModel";

// console.log("");
// console.log("----------Тестируем каталог-----------");
// console.log("");

// // Тестируем каталог

// const testCatalog = new Catalog();

// const testCatalogEmptyList = testCatalog.getProductList();
// console.log("Пустой список каталога", testCatalogEmptyList);

// testCatalog.setProductList(apiProducts.items);

// const testCatalogList = testCatalog.getProductList();
// console.log("Каталог после заполнения списка", testCatalogList);

// const testSelectedProductEmpty = testCatalog.getSelectedProduct();
// console.log("Не выбран элемент каталога", testSelectedProductEmpty);

// testCatalog.setSelectedProduct(apiProducts.items[1]);

// const testSelectedProduct = testCatalog.getSelectedProduct();
// console.log("Выбранный продукт", testSelectedProduct);

// const tetsFindByID = testCatalog.getProductByID(apiProducts.items[1].id);
// console.log("Продукт найденный по ID", tetsFindByID);

// try {
//   testCatalog.getProductByID("12345");
// } catch (error) {
//   console.log(
//     "Тест проброса ошибки в случае отсутствия подходящего по ID продукта",
//     error,
//   );
// }

// console.log("");
// console.log("----------Тестируем корзину-----------");
// console.log("");

// // Тестируем корзину

// const testCart = new Cart();

// const testCartProductList = testCart.getCartProductList();
// console.log("Пустой список в корзине", [...testCartProductList]);

// testCart.addProduct(apiProducts.items[1]);
// testCart.addProduct(apiProducts.items[3]);
// testCart.addProduct(apiProducts.items[0]);

// // const testCartProductList = testCart.getCartProductList()
// console.log("Cписок в корзине", [...testCartProductList]);

// testCart.deleteProduct(apiProducts.items[3]);
// console.log("Cписок после удаления", [...testCartProductList]);

// const testCartLength = testCart.getProductListLength();
// console.log("Длина списка", testCartLength);

// const testCartSum = testCart.getPriceSum(testCartProductList);
// console.log("Сумма продуктов в списке", testCartSum);

// const testCartItemAvailabilityT = testCart.isProductInList(
//   apiProducts.items[1],
// );
// const testCartItemAvailabilityF = testCart.isProductInList(
//   apiProducts.items[3],
// );

// console.log("Проверка существующего продукта", testCartItemAvailabilityT);
// console.log("Проверка удаленного продукта", testCartItemAvailabilityF);

// console.log("");
// console.log("----------Тестируем клиента-----------");
// console.log("");

// // Тестируем клиента

// const testClientObj = {
//   payment: "cash" as TPayment,
//   email: "ex@mple.ya",
//   address: "37°14'18.9\"N 115°48'49.2\"W",
// };

// const testBuyer = new Buyer();

// const testBuyerData = testBuyer.getData();
// console.log("Пустые данные клиента", testBuyerData);

// testBuyer.setData(testClientObj);

// const testBuyerDataUpdated = testBuyer.getData();
// console.log("Обновленные данные клиента", testBuyerDataUpdated);

// const testValidation = testBuyer.validate();
// console.log("Проверка валидации", testValidation);

// testBuyer.clearData();

// const testBuyerDataDeleted = testBuyer.getData();
// console.log("Удаленные данные клиента", testBuyerDataDeleted);

// console.log("");
// console.log("----------Тестируем работу с сервером-----------");
// console.log("");

// // Тестируем работу с сервером

// const api = new Api(API_URL);
// const testApiModel = new ApiModel(api);

// const apiBasedCatalog = new Catalog();

// (async () => {
//   try {
//     const products = await testApiModel.getProducts();
//     console.log("Полученные с сервера продукты:", products);

//     apiBasedCatalog.setProductList(products);
//     console.log(
//       "Каталог продуктов, переданных в класс Catalog:",
//       apiBasedCatalog.getProductList(),
//     );
//   } catch (e) {
//     console.error("Ошибка при загрузке продуктов:", e);
//   }
// })();
