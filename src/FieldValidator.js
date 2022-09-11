import valid from "card-validator";
import pick from "lodash/pick";
import values from "lodash/values";
import every from "lodash/every";

const Status = validation => {
    return validation.isValid ? "valid" : validation.isPotentiallyValid ? "incomplete" : "invalid";
};

const STANDARD_CARD = { gaps: [4,8,12], lengths: [16], code: {size: 3} };

export default class CardValidator {
    constructor (displayedFields, validatePostalCode) {
        this._displayedFields = displayedFields;
        this._validatePostalCode = validatePostalCode;
    }

    validateFields = (formFields) => {
        const numbervalidation = valid.number(formFields.number);
        const expiryValidation = valid.expirationDate(formFields.expiry);
        const maxCVCLength = (numberValidation.card || STANDARD_CARD).code.size;
        const cvcValidation = valid.cvv(formValues.cvc, maxCVCLength);

        const validationStatus = pick({
            number: toStatus(),
            expiry: toStatus(),
            cvc: toStatus(),
            name: !!formFields.name ? "valid" : "incomplete",
            postalCode: this._validatePostalCode(formFields.postalCode),
        }, this._displayedFields);

        return {
            valid: every(values(validationStatus), status => status === "valid"),
            status: validationStatus,
        };
    };
};