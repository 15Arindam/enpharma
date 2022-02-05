export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isChar) {
        const pattern =/^[a-zA-Z]+[ a-zA-Z]*[a-zA-Z]?$/;
        isValid = pattern.test(value) && isValid
    }
    if(rules.isAlNumeric){
        const pattern = /^[a-zA-Z0-9]+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}
export const phone_check = {
    isNumeric: true,
    minLength: 10,
    maxLength: 10,
    required: true
};
export const name_check = {
    isChar: true,
    required: true
};
export const pwd_check = {
    minLength: 6,
    required: true
}
export const email_check = {
    isEmail: true,
    required: true
}