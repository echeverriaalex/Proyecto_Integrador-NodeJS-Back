import { body, param} from 'express-validator';

export const validateCreateOrder = [
  body('userId').isMongoId().withMessage('Invalid user ID'),
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.productId').isMongoId().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
];

export const validateGetOrders = [
  param('userId').isMongoId().withMessage('Invalid user ID'),
];

export const orderValidation = [
    body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array')
        .custom((value) => {
            if(!value.every(item => item.id && item.quantity && item.quantity > 0 && item.price && item.price >=0 && item.title && item.image && item.description)) {
                throw new Error('Each item must have a valid ID, quantity, price, title, image, and description.');
            }
            return true;
        }),
    body('shippingDetails').isObject().withMessage('Shipping details must be an object')
        .custom((value) => {
            if(!value.name || !value.cellphone || !value.address || !value.location) {
                throw new Error('Shipping name, cellphone, address and location are required');
            }
            return true;
        }),
    body('shippingCost').isNumeric().withMessage('Shipping cost must be a number')
        .custom((value) => {
            if(value < 0) {
                throw new Error('Shipping cost must be a non-negative number');
            }
            return true;
        }),
];