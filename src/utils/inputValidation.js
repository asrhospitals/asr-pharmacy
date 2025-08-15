export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  if (email.length > 254) {
    return { isValid: false, message: "Email address is too long" };
  }
  
  return { isValid: true, message: "" };
};


export const validatePhone = (phone) => {
  
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
  
  if (!phone) {
    return { isValid: false, message: "Phone number is required" };
  }
  
  
  const phoneRegex = /^[\+]?[1-9][\d]{6,14}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, message: "Please enter a valid phone number" };
  }
  
  
  if (cleanPhone.replace('+', '').length < 7) {
    return { isValid: false, message: "Phone number is too short" };
  }
  
  
  if (cleanPhone.replace('+', '').length > 15) {
    return { isValid: false, message: "Phone number is too long" };
  }
  
  return { isValid: true, message: "" };
};


export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    allowSpaces = false
  } = options;
  
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  
  if (password.length < minLength) {
    return { isValid: false, message: `Password must be at least ${minLength} characters long` };
  }
  
  if (password.length > maxLength) {
    return { isValid: false, message: `Password must be no more than ${maxLength} characters long` };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one lowercase letter" };
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }
  
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character" };
  }
  
  if (!allowSpaces && /\s/.test(password)) {
    return { isValid: false, message: "Password cannot contain spaces" };
  }
  
  return { isValid: true, message: "" };
};


export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your password" };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }
  
  return { isValid: true, message: "" };
};


export const validateUsername = (username, options = {}) => {
  const {
    minLength = 3,
    maxLength = 20,
    allowSpecialChars = false,
    allowSpaces = false,
    allowNumbers = true
  } = options;
  
  if (!username) {
    return { isValid: false, message: "Username is required" };
  }
  
  if (username.length < minLength) {
    return { isValid: false, message: `Username must be at least ${minLength} characters long` };
  }
  
  if (username.length > maxLength) {
    return { isValid: false, message: `Username must be no more than ${maxLength} characters long` };
  }
  
  
  if (!allowSpaces && /\s/.test(username)) {
    return { isValid: false, message: "Username cannot contain spaces" };
  }
  
  
  if (!allowSpecialChars && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
    return { isValid: false, message: "Username cannot contain special characters" };
  }
  
  
  if (!allowNumbers && /\d/.test(username)) {
    return { isValid: false, message: "Username cannot contain numbers" };
  }
  
  
  if (!/^[a-zA-Z]/.test(username)) {
    return { isValid: false, message: "Username must start with a letter" };
  }
  
  return { isValid: true, message: "" };
};


export const validateName = (name, fieldName = "Name") => {
  if (!name) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: `${fieldName} must be at least 2 characters long` };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: `${fieldName} must be no more than 50 characters long` };
  }
  
  
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name)) {
    return { isValid: false, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return { isValid: true, message: "" };
};


export const validateAge = (age, minAge = 0, maxAge = 150) => {
  if (!age && age !== 0) {
    return { isValid: false, message: "Age is required" };
  }
  
  const numAge = parseInt(age, 10);
  
  if (isNaN(numAge)) {
    return { isValid: false, message: "Age must be a valid number" };
  }
  
  if (numAge < minAge) {
    return { isValid: false, message: `Age must be at least ${minAge}` };
  }
  
  if (numAge > maxAge) {
    return { isValid: false, message: `Age must be no more than ${maxAge}` };
  }
  
  return { isValid: true, message: "" };
};


export const validateDate = (date, options = {}) => {
  const {
    required = true,
    minDate = null,
    maxDate = null,
    format = "YYYY-MM-DD"
  } = options;
  
  if (!date) {
    if (required) {
      return { isValid: false, message: "Date is required" };
    }
    return { isValid: true, message: "" };
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, message: "Please enter a valid date" };
  }
  
  if (minDate && dateObj < new Date(minDate)) {
    return { isValid: false, message: `Date must be after ${minDate}` };
  }
  
  if (maxDate && dateObj > new Date(maxDate)) {
    return { isValid: false, message: `Date must be before ${maxDate}` };
  }
  
  return { isValid: true, message: "" };
};


export const validateUrl = (url, options = {}) => {
  const { required = true, allowHttp = true } = options;
  
  if (!url) {
    if (required) {
      return { isValid: false, message: "URL is required" };
    }
    return { isValid: true, message: "" };
  }
  
  try {
    const urlObj = new URL(url);
    
    if (!allowHttp && urlObj.protocol === 'http:') {
      return { isValid: false, message: "Only HTTPS URLs are allowed" };
    }
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, message: "URL must use HTTP or HTTPS protocol" };
    }
    
    return { isValid: true, message: "" };
  } catch (error) {
    return { isValid: false, message: "Please enter a valid URL" };
  }
};


export const validateCreditCard = (cardNumber) => {
  if (!cardNumber) {
    return { isValid: false, message: "Credit card number is required" };
  }
  
  
  const cleanCardNumber = cardNumber.replace(/[\s\-]/g, '');
  
  
  if (!/^\d+$/.test(cleanCardNumber)) {
    return { isValid: false, message: "Credit card number can only contain digits" };
  }
  
  
  if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
    return { isValid: false, message: "Credit card number must be between 13 and 19 digits" };
  }
  
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanCardNumber.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return { isValid: false, message: "Please enter a valid credit card number" };
  }
  
  return { isValid: true, message: "" };
};


export const validateZipCode = (zipCode, country = 'US') => {
  if (!zipCode) {
    return { isValid: false, message: "ZIP/Postal code is required" };
  }
  
  let regex;
  let errorMessage = "Please enter a valid ZIP/Postal code";
  
  switch (country.toUpperCase()) {
    case 'US':
      regex = /^\d{5}(-\d{4})?$/;
      errorMessage = "Please enter a valid US ZIP code (12345 or 12345-6789)";
      break;
    case 'CA':
      regex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
      errorMessage = "Please enter a valid Canadian postal code (A1A 1A1)";
      break;
    case 'UK':
      regex = /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/;
      errorMessage = "Please enter a valid UK postal code";
      break;
    default:
      regex = /^.{3,10}$/;
      errorMessage = "Postal code must be between 3 and 10 characters";
  }
  
  if (!regex.test(zipCode)) {
    return { isValid: false, message: errorMessage };
  }
  
  return { isValid: true, message: "" };
};

export const validateRequired = (value, fieldName = "Field") => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: "" };
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isFormValid = true;
  
  Object.keys(validationRules).forEach(fieldName => {
    const value = formData[fieldName];
    const rules = validationRules[fieldName];
    
    for (const rule of rules) {
      const result = rule(value);
      if (!result.isValid) {
        errors[fieldName] = result.message;
        isFormValid = false;
        break;
      }
    }
  });
  
  return { isFormValid, errors };
};

export const checkPasswordStrength = (password) => {
  let score = 0;
  const feedback = [];
  
  if (password.length >= 8) score += 1;
  else feedback.push("Use at least 8 characters");
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Include lowercase letters");
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Include uppercase letters");
  
  if (/\d/.test(password)) score += 1;
  else feedback.push("Include numbers");
  
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
  else feedback.push("Include special characters");
  
  if (password.length >= 12) score += 1;
  
  let strength = "Very Weak";
  let color = "#ff4444";
  
  if (score >= 5) {
    strength = "Very Strong";
    color = "#22c55e";
  } else if (score >= 4) {
    strength = "Strong";
    color = "#84cc16";
  } else if (score >= 3) {
    strength = "Medium";
    color = "#eab308";
  } else if (score >= 2) {
    strength = "Weak";
    color = "#f97316";
  }
  
  return {
    score,
    strength,
    color,
    feedback: feedback.slice(0, 3), 
    percentage: (score / 6) * 100
  };
};