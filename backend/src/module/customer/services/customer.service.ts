import logger from "../../../logger";
import { NotFoundError } from "../../../middleware/custom-errors";
import { Types } from "mongoose";
import CustomerModel from "../models/customer.model";
import Customer from "../interfaces/customer.interface";
import AuthService from "../../auth/services/auth.service";
import { Role } from "../../auth/enum/role.enum";

class CustomerService {
  private readonly customerModel;
  private readonly authService;

  constructor(
    authService: AuthService,
  ) {
    this.customerModel = CustomerModel;
    this.authService = authService;
  }

  public getCustomer = async (customerId: string): Promise<Customer | null> => {
    if (!customerId) {
      throw new NotFoundError(`Customer not found with id: ${customerId}`);
    }

    logger.info(`Getting a customer with id: ${customerId}`);
    return await this.customerModel.findById(customerId);
  }

  public getAllCustomers = async (): Promise<Customer[]> => {
    logger.info(`Getting all customers`);
    return await this.customerModel.find({});
  }

  public updateCustomer = async (customerId: string, body: any): Promise<Customer | null> => {
    if (!customerId) {
      throw new NotFoundError(`Customer not found with id: ${customerId}`);
    }

    logger.info(`Updating customer with id: ${customerId}`);

    await this.customerModel.updateOne(
      {_id: new Types.ObjectId(customerId)},
      { $set: body}
    );

    return await this.customerModel.findById(customerId);
  }

  public deleteCustomer = async (customerId: string) => {
    if (!customerId) {
      throw new NotFoundError(`Customer not found with id: ${customerId}`);
    }

    logger.info(`Updating customer with id: ${customerId}`);
    await this.customerModel.deleteOne({ _id: new Types.ObjectId(customerId) });

    return;
  }

  public signUpCustomer = async (body: any): Promise<Customer | null> => {
    const id = await this.authService.signUpFirebase(body.email, body.password, Role.CUSTOMER);
    body = {...body, _id: id};

    const newCustomer = new this.customerModel(body);
    await newCustomer.save();

    return newCustomer;
  }
}

export default CustomerService;