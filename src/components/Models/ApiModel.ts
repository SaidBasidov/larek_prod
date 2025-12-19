import {
  IApi,
  IProduct,
  IApiResponse,
  IOrderData,
  OrderResponse,
} from "../../types";

export class ApiModel {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IProduct[]> {
    try {
      const data = await this.api.get<IApiResponse>("/product/");
      return data.items;
    } catch (error) {
      console.log(`Error while loading ${error}`);
      throw error;
    }
  }

  async postOrder(order: IOrderData): Promise<OrderResponse> {
    try {
      return await this.api.post("/order/", order);
    } catch (error) {
      console.log(`Error while uploading`, error);
      throw error;
    }
  }
}
