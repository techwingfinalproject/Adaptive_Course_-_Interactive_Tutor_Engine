import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // A mock interceptor that forwards requests, useful for adding auth tokens in future backend integrations
  return next(req);
};
