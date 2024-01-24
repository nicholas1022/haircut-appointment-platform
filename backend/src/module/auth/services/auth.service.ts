import { UnauthorizedError, ValidationError } from "../../../middleware/custom-errors";
import { Role } from "../enum/role.enum";
import logger from "../../../logger";
import { ObjectId } from "mongodb";
import { auth } from "../../../config/firebase.config";

class AuthService {
  constructor() {
  }

  public verifyCustomer = async (role: Role) => {
    if (role.toUpperCase() !== Role.CUSTOMER) {
      throw new UnauthorizedError("You don't have the right permission to access this resource.")
    }
  }

  public verifyStylist = async (role: Role) => {
    if (role.toUpperCase() !== Role.STYLIST) {
      throw new UnauthorizedError("You don't have the right permission to access this resource.")
    }
  }

  public signUpFirebase = async (email: string, password: string, role: Role): Promise<string> => {
    if (!email || !password) {
      throw new ValidationError("Email and password are required");
    }

    logger.info("Signing up to firebase");
    const objectId = new ObjectId().toHexString();

    await auth.createUser({
      uid: objectId,
      email: email,
      password: password,
    });

    await auth.setCustomUserClaims(
      objectId,
      {role: role}
    );

    logger.info("Signed up successfully");
    return objectId;
  }
}

export default AuthService;
