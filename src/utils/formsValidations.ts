import validator from 'validator';

interface RecepyError {
  name?: string;
  content?: string;
  level?: string;
  cookingTime?: string;
  price?: string;
  videoLink?: string;
  thumbnailUrl?: string;
}

interface CommentError {
  author?: string;
  body?: string;
}

interface LoginError {
  email?: string;
  password?: string;
}

export const validateLogin = (values: any) => {
  const errors: LoginError = {};
  if (!validator.isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (!values.email) errors.email = 'Required';
  if (errors.password) errors.password = 'Required';
  return errors;
};

export const validateComment = (values: any) => {
  const minBodyLength = 10;
  const errors: CommentError = {};
  if (values.body.length < minBodyLength) {
    errors.body = 'Comment must contain at least 10 charecters';
  }
  return errors;
};

export const validateRecepyForm = (values: any) => {
  const errors: RecepyError = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (values.content.length < 10) {
    errors.content = 'Content must be atleast 10 symbols';
  }
  if (!values.content) {
    errors.content = 'Required';
  }
  if (isNaN(values.cookingTime)) {
    errors.cookingTime = 'Price is incorrect';
  }
  if (values.cookingTime > 500 || values.cookingTime < 5) {
    errors.cookingTime = 'Enter more realistic time';
  }
  if (!values.cookingTime) {
    errors.cookingTime = 'Required';
  }

  if (values.level > 5 || values.level < 0) {
    errors.level = 'Level must be from 1 to 5';
  }
  if (isNaN(values.price)) {
    errors.price = 'Price is incorrect';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  if (values.videoLink && !validator.isURL(values.videoLink)) {
    errors.videoLink = 'Url is invalid';
  }
  if (values.thumbnailUrl && !validator.isURL(values.thumbnailUrl)) {
    errors.thumbnailUrl = 'Url is invalid';
  }
  return errors;
};
