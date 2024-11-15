import { HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class ResponseEntity<T = unknown> {
  data?: T | null;
  message?: string;
  status?: HttpStatus;
  errors?: { field: string; message: string[] }[];

  constructor({
    message,
    data,
    status,
    errors,
  }: {
    message?: string;
    data?: T;
    status?: HttpStatus;
    errors?: { field: string; message: string[] }[];
  }) {
    this.message = I18nContext.current()?.i18n?.t(message || 'success');
    this.data = data || null;
    this.status = status || HttpStatus.OK;
    this.errors = errors;
  }
}
