import Joi from 'types-joi';
import { BaseError, Exception } from '@/_lib/errors/BaseError';
import { makePredicate } from '@/_lib/Predicate';

namespace ValidationError {
  const type = Symbol();
  const name = 'ValidationError';

  type Props = {
    readonly target: string;
    readonly error: Joi.ValidationError;
  };

  export const create = ({ error, target }: Props): Exception<Props> =>
    new BaseError<Props>({ type, name, code: name, message: error.message, meta: { target, error } });

  export const is = makePredicate<Exception<Props>>(type);
}

export { ValidationError };
