
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model acc_transaction
 * 
 */
export type acc_transaction = $Result.DefaultSelection<Prisma.$acc_transactionPayload>
/**
 * Model pers_personnallist_person
 * 
 */
export type pers_personnallist_person = $Result.DefaultSelection<Prisma.$pers_personnallist_personPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Acc_transactions
 * const acc_transactions = await prisma.acc_transaction.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Acc_transactions
   * const acc_transactions = await prisma.acc_transaction.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.acc_transaction`: Exposes CRUD operations for the **acc_transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Acc_transactions
    * const acc_transactions = await prisma.acc_transaction.findMany()
    * ```
    */
  get acc_transaction(): Prisma.acc_transactionDelegate<ExtArgs>;

  /**
   * `prisma.pers_personnallist_person`: Exposes CRUD operations for the **pers_personnallist_person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pers_personnallist_people
    * const pers_personnallist_people = await prisma.pers_personnallist_person.findMany()
    * ```
    */
  get pers_personnallist_person(): Prisma.pers_personnallist_personDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.12.1
   * Query Engine version: 473ed3124229e22d881cb7addf559799debae1ab
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    acc_transaction: 'acc_transaction',
    pers_personnallist_person: 'pers_personnallist_person'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'acc_transaction' | 'pers_personnallist_person'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      acc_transaction: {
        payload: Prisma.$acc_transactionPayload<ExtArgs>
        fields: Prisma.acc_transactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.acc_transactionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.acc_transactionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>
          }
          findFirst: {
            args: Prisma.acc_transactionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.acc_transactionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>
          }
          findMany: {
            args: Prisma.acc_transactionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>[]
          }
          create: {
            args: Prisma.acc_transactionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>
          }
          createMany: {
            args: Prisma.acc_transactionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.acc_transactionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>
          }
          update: {
            args: Prisma.acc_transactionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>
          }
          deleteMany: {
            args: Prisma.acc_transactionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.acc_transactionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.acc_transactionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$acc_transactionPayload>
          }
          aggregate: {
            args: Prisma.Acc_transactionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAcc_transaction>
          }
          groupBy: {
            args: Prisma.acc_transactionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Acc_transactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.acc_transactionCountArgs<ExtArgs>,
            result: $Utils.Optional<Acc_transactionCountAggregateOutputType> | number
          }
        }
      }
      pers_personnallist_person: {
        payload: Prisma.$pers_personnallist_personPayload<ExtArgs>
        fields: Prisma.pers_personnallist_personFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pers_personnallist_personFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pers_personnallist_personFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>
          }
          findFirst: {
            args: Prisma.pers_personnallist_personFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pers_personnallist_personFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>
          }
          findMany: {
            args: Prisma.pers_personnallist_personFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>[]
          }
          create: {
            args: Prisma.pers_personnallist_personCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>
          }
          createMany: {
            args: Prisma.pers_personnallist_personCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.pers_personnallist_personDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>
          }
          update: {
            args: Prisma.pers_personnallist_personUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>
          }
          deleteMany: {
            args: Prisma.pers_personnallist_personDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.pers_personnallist_personUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.pers_personnallist_personUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$pers_personnallist_personPayload>
          }
          aggregate: {
            args: Prisma.Pers_personnallist_personAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePers_personnallist_person>
          }
          groupBy: {
            args: Prisma.pers_personnallist_personGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Pers_personnallist_personGroupByOutputType>[]
          }
          count: {
            args: Prisma.pers_personnallist_personCountArgs<ExtArgs>,
            result: $Utils.Optional<Pers_personnallist_personCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model acc_transaction
   */

  export type AggregateAcc_transaction = {
    _count: Acc_transactionCountAggregateOutputType | null
    _avg: Acc_transactionAvgAggregateOutputType | null
    _sum: Acc_transactionSumAggregateOutputType | null
    _min: Acc_transactionMinAggregateOutputType | null
    _max: Acc_transactionMaxAggregateOutputType | null
  }

  export type Acc_transactionAvgAggregateOutputType = {
    op_version: number | null
    event_addr: number | null
    event_no: number | null
    event_point_type: number | null
    event_priority: number | null
    log_id: number | null
    reader_state: number | null
    trigger_cond: number | null
    verify_mode_no: number | null
  }

  export type Acc_transactionSumAggregateOutputType = {
    op_version: number | null
    event_addr: number | null
    event_no: number | null
    event_point_type: number | null
    event_priority: number | null
    log_id: number | null
    reader_state: number | null
    trigger_cond: number | null
    verify_mode_no: number | null
  }

  export type Acc_transactionMinAggregateOutputType = {
    id: string | null
    app_id: string | null
    bio_tbl_id: string | null
    company_id: string | null
    create_time: Date | null
    creater_code: string | null
    creater_id: string | null
    creater_name: string | null
    op_version: number | null
    update_time: Date | null
    updater_code: string | null
    updater_id: string | null
    updater_name: string | null
    acc_zone: string | null
    acc_zone_code: string | null
    area_name: string | null
    capture_photo_path: string | null
    card_no: string | null
    dept_code: string | null
    dept_name: string | null
    description: string | null
    dev_alias: string | null
    dev_id: string | null
    dev_sn: string | null
    event_addr: number | null
    event_name: string | null
    event_no: number | null
    event_point_id: string | null
    event_point_name: string | null
    event_point_type: number | null
    event_priority: number | null
    event_time: Date | null
    last_name: string | null
    log_id: number | null
    mask_flag: string | null
    name: string | null
    pin: string | null
    reader_name: string | null
    reader_state: number | null
    temperature: string | null
    trigger_cond: number | null
    unique_key: string | null
    verify_mode_name: string | null
    verify_mode_no: number | null
    vid_linkage_handle: string | null
  }

  export type Acc_transactionMaxAggregateOutputType = {
    id: string | null
    app_id: string | null
    bio_tbl_id: string | null
    company_id: string | null
    create_time: Date | null
    creater_code: string | null
    creater_id: string | null
    creater_name: string | null
    op_version: number | null
    update_time: Date | null
    updater_code: string | null
    updater_id: string | null
    updater_name: string | null
    acc_zone: string | null
    acc_zone_code: string | null
    area_name: string | null
    capture_photo_path: string | null
    card_no: string | null
    dept_code: string | null
    dept_name: string | null
    description: string | null
    dev_alias: string | null
    dev_id: string | null
    dev_sn: string | null
    event_addr: number | null
    event_name: string | null
    event_no: number | null
    event_point_id: string | null
    event_point_name: string | null
    event_point_type: number | null
    event_priority: number | null
    event_time: Date | null
    last_name: string | null
    log_id: number | null
    mask_flag: string | null
    name: string | null
    pin: string | null
    reader_name: string | null
    reader_state: number | null
    temperature: string | null
    trigger_cond: number | null
    unique_key: string | null
    verify_mode_name: string | null
    verify_mode_no: number | null
    vid_linkage_handle: string | null
  }

  export type Acc_transactionCountAggregateOutputType = {
    id: number
    app_id: number
    bio_tbl_id: number
    company_id: number
    create_time: number
    creater_code: number
    creater_id: number
    creater_name: number
    op_version: number
    update_time: number
    updater_code: number
    updater_id: number
    updater_name: number
    acc_zone: number
    acc_zone_code: number
    area_name: number
    capture_photo_path: number
    card_no: number
    dept_code: number
    dept_name: number
    description: number
    dev_alias: number
    dev_id: number
    dev_sn: number
    event_addr: number
    event_name: number
    event_no: number
    event_point_id: number
    event_point_name: number
    event_point_type: number
    event_priority: number
    event_time: number
    last_name: number
    log_id: number
    mask_flag: number
    name: number
    pin: number
    reader_name: number
    reader_state: number
    temperature: number
    trigger_cond: number
    unique_key: number
    verify_mode_name: number
    verify_mode_no: number
    vid_linkage_handle: number
    _all: number
  }


  export type Acc_transactionAvgAggregateInputType = {
    op_version?: true
    event_addr?: true
    event_no?: true
    event_point_type?: true
    event_priority?: true
    log_id?: true
    reader_state?: true
    trigger_cond?: true
    verify_mode_no?: true
  }

  export type Acc_transactionSumAggregateInputType = {
    op_version?: true
    event_addr?: true
    event_no?: true
    event_point_type?: true
    event_priority?: true
    log_id?: true
    reader_state?: true
    trigger_cond?: true
    verify_mode_no?: true
  }

  export type Acc_transactionMinAggregateInputType = {
    id?: true
    app_id?: true
    bio_tbl_id?: true
    company_id?: true
    create_time?: true
    creater_code?: true
    creater_id?: true
    creater_name?: true
    op_version?: true
    update_time?: true
    updater_code?: true
    updater_id?: true
    updater_name?: true
    acc_zone?: true
    acc_zone_code?: true
    area_name?: true
    capture_photo_path?: true
    card_no?: true
    dept_code?: true
    dept_name?: true
    description?: true
    dev_alias?: true
    dev_id?: true
    dev_sn?: true
    event_addr?: true
    event_name?: true
    event_no?: true
    event_point_id?: true
    event_point_name?: true
    event_point_type?: true
    event_priority?: true
    event_time?: true
    last_name?: true
    log_id?: true
    mask_flag?: true
    name?: true
    pin?: true
    reader_name?: true
    reader_state?: true
    temperature?: true
    trigger_cond?: true
    unique_key?: true
    verify_mode_name?: true
    verify_mode_no?: true
    vid_linkage_handle?: true
  }

  export type Acc_transactionMaxAggregateInputType = {
    id?: true
    app_id?: true
    bio_tbl_id?: true
    company_id?: true
    create_time?: true
    creater_code?: true
    creater_id?: true
    creater_name?: true
    op_version?: true
    update_time?: true
    updater_code?: true
    updater_id?: true
    updater_name?: true
    acc_zone?: true
    acc_zone_code?: true
    area_name?: true
    capture_photo_path?: true
    card_no?: true
    dept_code?: true
    dept_name?: true
    description?: true
    dev_alias?: true
    dev_id?: true
    dev_sn?: true
    event_addr?: true
    event_name?: true
    event_no?: true
    event_point_id?: true
    event_point_name?: true
    event_point_type?: true
    event_priority?: true
    event_time?: true
    last_name?: true
    log_id?: true
    mask_flag?: true
    name?: true
    pin?: true
    reader_name?: true
    reader_state?: true
    temperature?: true
    trigger_cond?: true
    unique_key?: true
    verify_mode_name?: true
    verify_mode_no?: true
    vid_linkage_handle?: true
  }

  export type Acc_transactionCountAggregateInputType = {
    id?: true
    app_id?: true
    bio_tbl_id?: true
    company_id?: true
    create_time?: true
    creater_code?: true
    creater_id?: true
    creater_name?: true
    op_version?: true
    update_time?: true
    updater_code?: true
    updater_id?: true
    updater_name?: true
    acc_zone?: true
    acc_zone_code?: true
    area_name?: true
    capture_photo_path?: true
    card_no?: true
    dept_code?: true
    dept_name?: true
    description?: true
    dev_alias?: true
    dev_id?: true
    dev_sn?: true
    event_addr?: true
    event_name?: true
    event_no?: true
    event_point_id?: true
    event_point_name?: true
    event_point_type?: true
    event_priority?: true
    event_time?: true
    last_name?: true
    log_id?: true
    mask_flag?: true
    name?: true
    pin?: true
    reader_name?: true
    reader_state?: true
    temperature?: true
    trigger_cond?: true
    unique_key?: true
    verify_mode_name?: true
    verify_mode_no?: true
    vid_linkage_handle?: true
    _all?: true
  }

  export type Acc_transactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which acc_transaction to aggregate.
     */
    where?: acc_transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of acc_transactions to fetch.
     */
    orderBy?: acc_transactionOrderByWithRelationInput | acc_transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: acc_transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` acc_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` acc_transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned acc_transactions
    **/
    _count?: true | Acc_transactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Acc_transactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Acc_transactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Acc_transactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Acc_transactionMaxAggregateInputType
  }

  export type GetAcc_transactionAggregateType<T extends Acc_transactionAggregateArgs> = {
        [P in keyof T & keyof AggregateAcc_transaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcc_transaction[P]>
      : GetScalarType<T[P], AggregateAcc_transaction[P]>
  }




  export type acc_transactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: acc_transactionWhereInput
    orderBy?: acc_transactionOrderByWithAggregationInput | acc_transactionOrderByWithAggregationInput[]
    by: Acc_transactionScalarFieldEnum[] | Acc_transactionScalarFieldEnum
    having?: acc_transactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Acc_transactionCountAggregateInputType | true
    _avg?: Acc_transactionAvgAggregateInputType
    _sum?: Acc_transactionSumAggregateInputType
    _min?: Acc_transactionMinAggregateInputType
    _max?: Acc_transactionMaxAggregateInputType
  }

  export type Acc_transactionGroupByOutputType = {
    id: string
    app_id: string | null
    bio_tbl_id: string | null
    company_id: string | null
    create_time: Date | null
    creater_code: string | null
    creater_id: string | null
    creater_name: string | null
    op_version: number | null
    update_time: Date | null
    updater_code: string | null
    updater_id: string | null
    updater_name: string | null
    acc_zone: string | null
    acc_zone_code: string | null
    area_name: string | null
    capture_photo_path: string | null
    card_no: string | null
    dept_code: string | null
    dept_name: string | null
    description: string | null
    dev_alias: string | null
    dev_id: string | null
    dev_sn: string | null
    event_addr: number | null
    event_name: string | null
    event_no: number | null
    event_point_id: string | null
    event_point_name: string | null
    event_point_type: number | null
    event_priority: number | null
    event_time: Date | null
    last_name: string | null
    log_id: number | null
    mask_flag: string | null
    name: string | null
    pin: string | null
    reader_name: string | null
    reader_state: number | null
    temperature: string | null
    trigger_cond: number | null
    unique_key: string | null
    verify_mode_name: string | null
    verify_mode_no: number | null
    vid_linkage_handle: string | null
    _count: Acc_transactionCountAggregateOutputType | null
    _avg: Acc_transactionAvgAggregateOutputType | null
    _sum: Acc_transactionSumAggregateOutputType | null
    _min: Acc_transactionMinAggregateOutputType | null
    _max: Acc_transactionMaxAggregateOutputType | null
  }

  type GetAcc_transactionGroupByPayload<T extends acc_transactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Acc_transactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Acc_transactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Acc_transactionGroupByOutputType[P]>
            : GetScalarType<T[P], Acc_transactionGroupByOutputType[P]>
        }
      >
    >


  export type acc_transactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    bio_tbl_id?: boolean
    company_id?: boolean
    create_time?: boolean
    creater_code?: boolean
    creater_id?: boolean
    creater_name?: boolean
    op_version?: boolean
    update_time?: boolean
    updater_code?: boolean
    updater_id?: boolean
    updater_name?: boolean
    acc_zone?: boolean
    acc_zone_code?: boolean
    area_name?: boolean
    capture_photo_path?: boolean
    card_no?: boolean
    dept_code?: boolean
    dept_name?: boolean
    description?: boolean
    dev_alias?: boolean
    dev_id?: boolean
    dev_sn?: boolean
    event_addr?: boolean
    event_name?: boolean
    event_no?: boolean
    event_point_id?: boolean
    event_point_name?: boolean
    event_point_type?: boolean
    event_priority?: boolean
    event_time?: boolean
    last_name?: boolean
    log_id?: boolean
    mask_flag?: boolean
    name?: boolean
    pin?: boolean
    reader_name?: boolean
    reader_state?: boolean
    temperature?: boolean
    trigger_cond?: boolean
    unique_key?: boolean
    verify_mode_name?: boolean
    verify_mode_no?: boolean
    vid_linkage_handle?: boolean
  }, ExtArgs["result"]["acc_transaction"]>

  export type acc_transactionSelectScalar = {
    id?: boolean
    app_id?: boolean
    bio_tbl_id?: boolean
    company_id?: boolean
    create_time?: boolean
    creater_code?: boolean
    creater_id?: boolean
    creater_name?: boolean
    op_version?: boolean
    update_time?: boolean
    updater_code?: boolean
    updater_id?: boolean
    updater_name?: boolean
    acc_zone?: boolean
    acc_zone_code?: boolean
    area_name?: boolean
    capture_photo_path?: boolean
    card_no?: boolean
    dept_code?: boolean
    dept_name?: boolean
    description?: boolean
    dev_alias?: boolean
    dev_id?: boolean
    dev_sn?: boolean
    event_addr?: boolean
    event_name?: boolean
    event_no?: boolean
    event_point_id?: boolean
    event_point_name?: boolean
    event_point_type?: boolean
    event_priority?: boolean
    event_time?: boolean
    last_name?: boolean
    log_id?: boolean
    mask_flag?: boolean
    name?: boolean
    pin?: boolean
    reader_name?: boolean
    reader_state?: boolean
    temperature?: boolean
    trigger_cond?: boolean
    unique_key?: boolean
    verify_mode_name?: boolean
    verify_mode_no?: boolean
    vid_linkage_handle?: boolean
  }


  export type $acc_transactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "acc_transaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_id: string | null
      bio_tbl_id: string | null
      company_id: string | null
      create_time: Date | null
      creater_code: string | null
      creater_id: string | null
      creater_name: string | null
      op_version: number | null
      update_time: Date | null
      updater_code: string | null
      updater_id: string | null
      updater_name: string | null
      acc_zone: string | null
      acc_zone_code: string | null
      area_name: string | null
      capture_photo_path: string | null
      card_no: string | null
      dept_code: string | null
      dept_name: string | null
      description: string | null
      dev_alias: string | null
      dev_id: string | null
      dev_sn: string | null
      event_addr: number | null
      event_name: string | null
      event_no: number | null
      event_point_id: string | null
      event_point_name: string | null
      event_point_type: number | null
      event_priority: number | null
      event_time: Date | null
      last_name: string | null
      log_id: number | null
      mask_flag: string | null
      name: string | null
      pin: string | null
      reader_name: string | null
      reader_state: number | null
      temperature: string | null
      trigger_cond: number | null
      unique_key: string | null
      verify_mode_name: string | null
      verify_mode_no: number | null
      vid_linkage_handle: string | null
    }, ExtArgs["result"]["acc_transaction"]>
    composites: {}
  }


  type acc_transactionGetPayload<S extends boolean | null | undefined | acc_transactionDefaultArgs> = $Result.GetResult<Prisma.$acc_transactionPayload, S>

  type acc_transactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<acc_transactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Acc_transactionCountAggregateInputType | true
    }

  export interface acc_transactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['acc_transaction'], meta: { name: 'acc_transaction' } }
    /**
     * Find zero or one Acc_transaction that matches the filter.
     * @param {acc_transactionFindUniqueArgs} args - Arguments to find a Acc_transaction
     * @example
     * // Get one Acc_transaction
     * const acc_transaction = await prisma.acc_transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends acc_transactionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, acc_transactionFindUniqueArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Acc_transaction that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {acc_transactionFindUniqueOrThrowArgs} args - Arguments to find a Acc_transaction
     * @example
     * // Get one Acc_transaction
     * const acc_transaction = await prisma.acc_transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends acc_transactionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, acc_transactionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Acc_transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {acc_transactionFindFirstArgs} args - Arguments to find a Acc_transaction
     * @example
     * // Get one Acc_transaction
     * const acc_transaction = await prisma.acc_transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends acc_transactionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, acc_transactionFindFirstArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Acc_transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {acc_transactionFindFirstOrThrowArgs} args - Arguments to find a Acc_transaction
     * @example
     * // Get one Acc_transaction
     * const acc_transaction = await prisma.acc_transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends acc_transactionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, acc_transactionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Acc_transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {acc_transactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Acc_transactions
     * const acc_transactions = await prisma.acc_transaction.findMany()
     * 
     * // Get first 10 Acc_transactions
     * const acc_transactions = await prisma.acc_transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const acc_transactionWithIdOnly = await prisma.acc_transaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends acc_transactionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, acc_transactionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Acc_transaction.
     * @param {acc_transactionCreateArgs} args - Arguments to create a Acc_transaction.
     * @example
     * // Create one Acc_transaction
     * const Acc_transaction = await prisma.acc_transaction.create({
     *   data: {
     *     // ... data to create a Acc_transaction
     *   }
     * })
     * 
    **/
    create<T extends acc_transactionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, acc_transactionCreateArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Acc_transactions.
     *     @param {acc_transactionCreateManyArgs} args - Arguments to create many Acc_transactions.
     *     @example
     *     // Create many Acc_transactions
     *     const acc_transaction = await prisma.acc_transaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends acc_transactionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, acc_transactionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Acc_transaction.
     * @param {acc_transactionDeleteArgs} args - Arguments to delete one Acc_transaction.
     * @example
     * // Delete one Acc_transaction
     * const Acc_transaction = await prisma.acc_transaction.delete({
     *   where: {
     *     // ... filter to delete one Acc_transaction
     *   }
     * })
     * 
    **/
    delete<T extends acc_transactionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, acc_transactionDeleteArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Acc_transaction.
     * @param {acc_transactionUpdateArgs} args - Arguments to update one Acc_transaction.
     * @example
     * // Update one Acc_transaction
     * const acc_transaction = await prisma.acc_transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends acc_transactionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, acc_transactionUpdateArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Acc_transactions.
     * @param {acc_transactionDeleteManyArgs} args - Arguments to filter Acc_transactions to delete.
     * @example
     * // Delete a few Acc_transactions
     * const { count } = await prisma.acc_transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends acc_transactionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, acc_transactionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Acc_transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {acc_transactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Acc_transactions
     * const acc_transaction = await prisma.acc_transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends acc_transactionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, acc_transactionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Acc_transaction.
     * @param {acc_transactionUpsertArgs} args - Arguments to update or create a Acc_transaction.
     * @example
     * // Update or create a Acc_transaction
     * const acc_transaction = await prisma.acc_transaction.upsert({
     *   create: {
     *     // ... data to create a Acc_transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Acc_transaction we want to update
     *   }
     * })
    **/
    upsert<T extends acc_transactionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, acc_transactionUpsertArgs<ExtArgs>>
    ): Prisma__acc_transactionClient<$Result.GetResult<Prisma.$acc_transactionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Acc_transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {acc_transactionCountArgs} args - Arguments to filter Acc_transactions to count.
     * @example
     * // Count the number of Acc_transactions
     * const count = await prisma.acc_transaction.count({
     *   where: {
     *     // ... the filter for the Acc_transactions we want to count
     *   }
     * })
    **/
    count<T extends acc_transactionCountArgs>(
      args?: Subset<T, acc_transactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Acc_transactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Acc_transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Acc_transactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Acc_transactionAggregateArgs>(args: Subset<T, Acc_transactionAggregateArgs>): Prisma.PrismaPromise<GetAcc_transactionAggregateType<T>>

    /**
     * Group by Acc_transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {acc_transactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends acc_transactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: acc_transactionGroupByArgs['orderBy'] }
        : { orderBy?: acc_transactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, acc_transactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcc_transactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the acc_transaction model
   */
  readonly fields: acc_transactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for acc_transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__acc_transactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the acc_transaction model
   */ 
  interface acc_transactionFieldRefs {
    readonly id: FieldRef<"acc_transaction", 'String'>
    readonly app_id: FieldRef<"acc_transaction", 'String'>
    readonly bio_tbl_id: FieldRef<"acc_transaction", 'String'>
    readonly company_id: FieldRef<"acc_transaction", 'String'>
    readonly create_time: FieldRef<"acc_transaction", 'DateTime'>
    readonly creater_code: FieldRef<"acc_transaction", 'String'>
    readonly creater_id: FieldRef<"acc_transaction", 'String'>
    readonly creater_name: FieldRef<"acc_transaction", 'String'>
    readonly op_version: FieldRef<"acc_transaction", 'Int'>
    readonly update_time: FieldRef<"acc_transaction", 'DateTime'>
    readonly updater_code: FieldRef<"acc_transaction", 'String'>
    readonly updater_id: FieldRef<"acc_transaction", 'String'>
    readonly updater_name: FieldRef<"acc_transaction", 'String'>
    readonly acc_zone: FieldRef<"acc_transaction", 'String'>
    readonly acc_zone_code: FieldRef<"acc_transaction", 'String'>
    readonly area_name: FieldRef<"acc_transaction", 'String'>
    readonly capture_photo_path: FieldRef<"acc_transaction", 'String'>
    readonly card_no: FieldRef<"acc_transaction", 'String'>
    readonly dept_code: FieldRef<"acc_transaction", 'String'>
    readonly dept_name: FieldRef<"acc_transaction", 'String'>
    readonly description: FieldRef<"acc_transaction", 'String'>
    readonly dev_alias: FieldRef<"acc_transaction", 'String'>
    readonly dev_id: FieldRef<"acc_transaction", 'String'>
    readonly dev_sn: FieldRef<"acc_transaction", 'String'>
    readonly event_addr: FieldRef<"acc_transaction", 'Int'>
    readonly event_name: FieldRef<"acc_transaction", 'String'>
    readonly event_no: FieldRef<"acc_transaction", 'Int'>
    readonly event_point_id: FieldRef<"acc_transaction", 'String'>
    readonly event_point_name: FieldRef<"acc_transaction", 'String'>
    readonly event_point_type: FieldRef<"acc_transaction", 'Int'>
    readonly event_priority: FieldRef<"acc_transaction", 'Int'>
    readonly event_time: FieldRef<"acc_transaction", 'DateTime'>
    readonly last_name: FieldRef<"acc_transaction", 'String'>
    readonly log_id: FieldRef<"acc_transaction", 'Int'>
    readonly mask_flag: FieldRef<"acc_transaction", 'String'>
    readonly name: FieldRef<"acc_transaction", 'String'>
    readonly pin: FieldRef<"acc_transaction", 'String'>
    readonly reader_name: FieldRef<"acc_transaction", 'String'>
    readonly reader_state: FieldRef<"acc_transaction", 'Int'>
    readonly temperature: FieldRef<"acc_transaction", 'String'>
    readonly trigger_cond: FieldRef<"acc_transaction", 'Int'>
    readonly unique_key: FieldRef<"acc_transaction", 'String'>
    readonly verify_mode_name: FieldRef<"acc_transaction", 'String'>
    readonly verify_mode_no: FieldRef<"acc_transaction", 'Int'>
    readonly vid_linkage_handle: FieldRef<"acc_transaction", 'String'>
  }
    

  // Custom InputTypes

  /**
   * acc_transaction findUnique
   */
  export type acc_transactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * Filter, which acc_transaction to fetch.
     */
    where: acc_transactionWhereUniqueInput
  }


  /**
   * acc_transaction findUniqueOrThrow
   */
  export type acc_transactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * Filter, which acc_transaction to fetch.
     */
    where: acc_transactionWhereUniqueInput
  }


  /**
   * acc_transaction findFirst
   */
  export type acc_transactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * Filter, which acc_transaction to fetch.
     */
    where?: acc_transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of acc_transactions to fetch.
     */
    orderBy?: acc_transactionOrderByWithRelationInput | acc_transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for acc_transactions.
     */
    cursor?: acc_transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` acc_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` acc_transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of acc_transactions.
     */
    distinct?: Acc_transactionScalarFieldEnum | Acc_transactionScalarFieldEnum[]
  }


  /**
   * acc_transaction findFirstOrThrow
   */
  export type acc_transactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * Filter, which acc_transaction to fetch.
     */
    where?: acc_transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of acc_transactions to fetch.
     */
    orderBy?: acc_transactionOrderByWithRelationInput | acc_transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for acc_transactions.
     */
    cursor?: acc_transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` acc_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` acc_transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of acc_transactions.
     */
    distinct?: Acc_transactionScalarFieldEnum | Acc_transactionScalarFieldEnum[]
  }


  /**
   * acc_transaction findMany
   */
  export type acc_transactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * Filter, which acc_transactions to fetch.
     */
    where?: acc_transactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of acc_transactions to fetch.
     */
    orderBy?: acc_transactionOrderByWithRelationInput | acc_transactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing acc_transactions.
     */
    cursor?: acc_transactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` acc_transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` acc_transactions.
     */
    skip?: number
    distinct?: Acc_transactionScalarFieldEnum | Acc_transactionScalarFieldEnum[]
  }


  /**
   * acc_transaction create
   */
  export type acc_transactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * The data needed to create a acc_transaction.
     */
    data: XOR<acc_transactionCreateInput, acc_transactionUncheckedCreateInput>
  }


  /**
   * acc_transaction createMany
   */
  export type acc_transactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many acc_transactions.
     */
    data: acc_transactionCreateManyInput | acc_transactionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * acc_transaction update
   */
  export type acc_transactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * The data needed to update a acc_transaction.
     */
    data: XOR<acc_transactionUpdateInput, acc_transactionUncheckedUpdateInput>
    /**
     * Choose, which acc_transaction to update.
     */
    where: acc_transactionWhereUniqueInput
  }


  /**
   * acc_transaction updateMany
   */
  export type acc_transactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update acc_transactions.
     */
    data: XOR<acc_transactionUpdateManyMutationInput, acc_transactionUncheckedUpdateManyInput>
    /**
     * Filter which acc_transactions to update
     */
    where?: acc_transactionWhereInput
  }


  /**
   * acc_transaction upsert
   */
  export type acc_transactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * The filter to search for the acc_transaction to update in case it exists.
     */
    where: acc_transactionWhereUniqueInput
    /**
     * In case the acc_transaction found by the `where` argument doesn't exist, create a new acc_transaction with this data.
     */
    create: XOR<acc_transactionCreateInput, acc_transactionUncheckedCreateInput>
    /**
     * In case the acc_transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<acc_transactionUpdateInput, acc_transactionUncheckedUpdateInput>
  }


  /**
   * acc_transaction delete
   */
  export type acc_transactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
    /**
     * Filter which acc_transaction to delete.
     */
    where: acc_transactionWhereUniqueInput
  }


  /**
   * acc_transaction deleteMany
   */
  export type acc_transactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which acc_transactions to delete
     */
    where?: acc_transactionWhereInput
  }


  /**
   * acc_transaction without action
   */
  export type acc_transactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the acc_transaction
     */
    select?: acc_transactionSelect<ExtArgs> | null
  }



  /**
   * Model pers_personnallist_person
   */

  export type AggregatePers_personnallist_person = {
    _count: Pers_personnallist_personCountAggregateOutputType | null
    _avg: Pers_personnallist_personAvgAggregateOutputType | null
    _sum: Pers_personnallist_personSumAggregateOutputType | null
    _min: Pers_personnallist_personMinAggregateOutputType | null
    _max: Pers_personnallist_personMaxAggregateOutputType | null
  }

  export type Pers_personnallist_personAvgAggregateOutputType = {
    op_version: number | null
  }

  export type Pers_personnallist_personSumAggregateOutputType = {
    op_version: number | null
  }

  export type Pers_personnallist_personMinAggregateOutputType = {
    id: string | null
    app_id: string | null
    bio_tbl_id: string | null
    company_id: string | null
    create_time: Date | null
    creater_code: string | null
    creater_id: string | null
    creater_name: string | null
    op_version: number | null
    update_time: Date | null
    updater_code: string | null
    updater_id: string | null
    updater_name: string | null
    email: string | null
    id_card: string | null
    link_tbl: string | null
    mobile_phone: string | null
    person_birthday: Date | null
    person_gender: string | null
    person_id: string | null
    person_name: string | null
    person_pin: string | null
    personnallist_id: string | null
    position_name: string | null
  }

  export type Pers_personnallist_personMaxAggregateOutputType = {
    id: string | null
    app_id: string | null
    bio_tbl_id: string | null
    company_id: string | null
    create_time: Date | null
    creater_code: string | null
    creater_id: string | null
    creater_name: string | null
    op_version: number | null
    update_time: Date | null
    updater_code: string | null
    updater_id: string | null
    updater_name: string | null
    email: string | null
    id_card: string | null
    link_tbl: string | null
    mobile_phone: string | null
    person_birthday: Date | null
    person_gender: string | null
    person_id: string | null
    person_name: string | null
    person_pin: string | null
    personnallist_id: string | null
    position_name: string | null
  }

  export type Pers_personnallist_personCountAggregateOutputType = {
    id: number
    app_id: number
    bio_tbl_id: number
    company_id: number
    create_time: number
    creater_code: number
    creater_id: number
    creater_name: number
    op_version: number
    update_time: number
    updater_code: number
    updater_id: number
    updater_name: number
    email: number
    id_card: number
    link_tbl: number
    mobile_phone: number
    person_birthday: number
    person_gender: number
    person_id: number
    person_name: number
    person_pin: number
    personnallist_id: number
    position_name: number
    _all: number
  }


  export type Pers_personnallist_personAvgAggregateInputType = {
    op_version?: true
  }

  export type Pers_personnallist_personSumAggregateInputType = {
    op_version?: true
  }

  export type Pers_personnallist_personMinAggregateInputType = {
    id?: true
    app_id?: true
    bio_tbl_id?: true
    company_id?: true
    create_time?: true
    creater_code?: true
    creater_id?: true
    creater_name?: true
    op_version?: true
    update_time?: true
    updater_code?: true
    updater_id?: true
    updater_name?: true
    email?: true
    id_card?: true
    link_tbl?: true
    mobile_phone?: true
    person_birthday?: true
    person_gender?: true
    person_id?: true
    person_name?: true
    person_pin?: true
    personnallist_id?: true
    position_name?: true
  }

  export type Pers_personnallist_personMaxAggregateInputType = {
    id?: true
    app_id?: true
    bio_tbl_id?: true
    company_id?: true
    create_time?: true
    creater_code?: true
    creater_id?: true
    creater_name?: true
    op_version?: true
    update_time?: true
    updater_code?: true
    updater_id?: true
    updater_name?: true
    email?: true
    id_card?: true
    link_tbl?: true
    mobile_phone?: true
    person_birthday?: true
    person_gender?: true
    person_id?: true
    person_name?: true
    person_pin?: true
    personnallist_id?: true
    position_name?: true
  }

  export type Pers_personnallist_personCountAggregateInputType = {
    id?: true
    app_id?: true
    bio_tbl_id?: true
    company_id?: true
    create_time?: true
    creater_code?: true
    creater_id?: true
    creater_name?: true
    op_version?: true
    update_time?: true
    updater_code?: true
    updater_id?: true
    updater_name?: true
    email?: true
    id_card?: true
    link_tbl?: true
    mobile_phone?: true
    person_birthday?: true
    person_gender?: true
    person_id?: true
    person_name?: true
    person_pin?: true
    personnallist_id?: true
    position_name?: true
    _all?: true
  }

  export type Pers_personnallist_personAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pers_personnallist_person to aggregate.
     */
    where?: pers_personnallist_personWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pers_personnallist_people to fetch.
     */
    orderBy?: pers_personnallist_personOrderByWithRelationInput | pers_personnallist_personOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pers_personnallist_personWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pers_personnallist_people from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pers_personnallist_people.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pers_personnallist_people
    **/
    _count?: true | Pers_personnallist_personCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Pers_personnallist_personAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Pers_personnallist_personSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pers_personnallist_personMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pers_personnallist_personMaxAggregateInputType
  }

  export type GetPers_personnallist_personAggregateType<T extends Pers_personnallist_personAggregateArgs> = {
        [P in keyof T & keyof AggregatePers_personnallist_person]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePers_personnallist_person[P]>
      : GetScalarType<T[P], AggregatePers_personnallist_person[P]>
  }




  export type pers_personnallist_personGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pers_personnallist_personWhereInput
    orderBy?: pers_personnallist_personOrderByWithAggregationInput | pers_personnallist_personOrderByWithAggregationInput[]
    by: Pers_personnallist_personScalarFieldEnum[] | Pers_personnallist_personScalarFieldEnum
    having?: pers_personnallist_personScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pers_personnallist_personCountAggregateInputType | true
    _avg?: Pers_personnallist_personAvgAggregateInputType
    _sum?: Pers_personnallist_personSumAggregateInputType
    _min?: Pers_personnallist_personMinAggregateInputType
    _max?: Pers_personnallist_personMaxAggregateInputType
  }

  export type Pers_personnallist_personGroupByOutputType = {
    id: string
    app_id: string | null
    bio_tbl_id: string | null
    company_id: string | null
    create_time: Date | null
    creater_code: string | null
    creater_id: string | null
    creater_name: string | null
    op_version: number | null
    update_time: Date | null
    updater_code: string | null
    updater_id: string | null
    updater_name: string | null
    email: string | null
    id_card: string | null
    link_tbl: string | null
    mobile_phone: string | null
    person_birthday: Date | null
    person_gender: string | null
    person_id: string | null
    person_name: string | null
    person_pin: string | null
    personnallist_id: string | null
    position_name: string | null
    _count: Pers_personnallist_personCountAggregateOutputType | null
    _avg: Pers_personnallist_personAvgAggregateOutputType | null
    _sum: Pers_personnallist_personSumAggregateOutputType | null
    _min: Pers_personnallist_personMinAggregateOutputType | null
    _max: Pers_personnallist_personMaxAggregateOutputType | null
  }

  type GetPers_personnallist_personGroupByPayload<T extends pers_personnallist_personGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pers_personnallist_personGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pers_personnallist_personGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pers_personnallist_personGroupByOutputType[P]>
            : GetScalarType<T[P], Pers_personnallist_personGroupByOutputType[P]>
        }
      >
    >


  export type pers_personnallist_personSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    bio_tbl_id?: boolean
    company_id?: boolean
    create_time?: boolean
    creater_code?: boolean
    creater_id?: boolean
    creater_name?: boolean
    op_version?: boolean
    update_time?: boolean
    updater_code?: boolean
    updater_id?: boolean
    updater_name?: boolean
    email?: boolean
    id_card?: boolean
    link_tbl?: boolean
    mobile_phone?: boolean
    person_birthday?: boolean
    person_gender?: boolean
    person_id?: boolean
    person_name?: boolean
    person_pin?: boolean
    personnallist_id?: boolean
    position_name?: boolean
  }, ExtArgs["result"]["pers_personnallist_person"]>

  export type pers_personnallist_personSelectScalar = {
    id?: boolean
    app_id?: boolean
    bio_tbl_id?: boolean
    company_id?: boolean
    create_time?: boolean
    creater_code?: boolean
    creater_id?: boolean
    creater_name?: boolean
    op_version?: boolean
    update_time?: boolean
    updater_code?: boolean
    updater_id?: boolean
    updater_name?: boolean
    email?: boolean
    id_card?: boolean
    link_tbl?: boolean
    mobile_phone?: boolean
    person_birthday?: boolean
    person_gender?: boolean
    person_id?: boolean
    person_name?: boolean
    person_pin?: boolean
    personnallist_id?: boolean
    position_name?: boolean
  }


  export type $pers_personnallist_personPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pers_personnallist_person"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_id: string | null
      bio_tbl_id: string | null
      company_id: string | null
      create_time: Date | null
      creater_code: string | null
      creater_id: string | null
      creater_name: string | null
      op_version: number | null
      update_time: Date | null
      updater_code: string | null
      updater_id: string | null
      updater_name: string | null
      email: string | null
      id_card: string | null
      link_tbl: string | null
      mobile_phone: string | null
      person_birthday: Date | null
      person_gender: string | null
      person_id: string | null
      person_name: string | null
      person_pin: string | null
      personnallist_id: string | null
      position_name: string | null
    }, ExtArgs["result"]["pers_personnallist_person"]>
    composites: {}
  }


  type pers_personnallist_personGetPayload<S extends boolean | null | undefined | pers_personnallist_personDefaultArgs> = $Result.GetResult<Prisma.$pers_personnallist_personPayload, S>

  type pers_personnallist_personCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<pers_personnallist_personFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Pers_personnallist_personCountAggregateInputType | true
    }

  export interface pers_personnallist_personDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pers_personnallist_person'], meta: { name: 'pers_personnallist_person' } }
    /**
     * Find zero or one Pers_personnallist_person that matches the filter.
     * @param {pers_personnallist_personFindUniqueArgs} args - Arguments to find a Pers_personnallist_person
     * @example
     * // Get one Pers_personnallist_person
     * const pers_personnallist_person = await prisma.pers_personnallist_person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends pers_personnallist_personFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, pers_personnallist_personFindUniqueArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Pers_personnallist_person that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {pers_personnallist_personFindUniqueOrThrowArgs} args - Arguments to find a Pers_personnallist_person
     * @example
     * // Get one Pers_personnallist_person
     * const pers_personnallist_person = await prisma.pers_personnallist_person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends pers_personnallist_personFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, pers_personnallist_personFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Pers_personnallist_person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pers_personnallist_personFindFirstArgs} args - Arguments to find a Pers_personnallist_person
     * @example
     * // Get one Pers_personnallist_person
     * const pers_personnallist_person = await prisma.pers_personnallist_person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends pers_personnallist_personFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, pers_personnallist_personFindFirstArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Pers_personnallist_person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pers_personnallist_personFindFirstOrThrowArgs} args - Arguments to find a Pers_personnallist_person
     * @example
     * // Get one Pers_personnallist_person
     * const pers_personnallist_person = await prisma.pers_personnallist_person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends pers_personnallist_personFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, pers_personnallist_personFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Pers_personnallist_people that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pers_personnallist_personFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pers_personnallist_people
     * const pers_personnallist_people = await prisma.pers_personnallist_person.findMany()
     * 
     * // Get first 10 Pers_personnallist_people
     * const pers_personnallist_people = await prisma.pers_personnallist_person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pers_personnallist_personWithIdOnly = await prisma.pers_personnallist_person.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends pers_personnallist_personFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, pers_personnallist_personFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Pers_personnallist_person.
     * @param {pers_personnallist_personCreateArgs} args - Arguments to create a Pers_personnallist_person.
     * @example
     * // Create one Pers_personnallist_person
     * const Pers_personnallist_person = await prisma.pers_personnallist_person.create({
     *   data: {
     *     // ... data to create a Pers_personnallist_person
     *   }
     * })
     * 
    **/
    create<T extends pers_personnallist_personCreateArgs<ExtArgs>>(
      args: SelectSubset<T, pers_personnallist_personCreateArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Pers_personnallist_people.
     *     @param {pers_personnallist_personCreateManyArgs} args - Arguments to create many Pers_personnallist_people.
     *     @example
     *     // Create many Pers_personnallist_people
     *     const pers_personnallist_person = await prisma.pers_personnallist_person.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends pers_personnallist_personCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, pers_personnallist_personCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pers_personnallist_person.
     * @param {pers_personnallist_personDeleteArgs} args - Arguments to delete one Pers_personnallist_person.
     * @example
     * // Delete one Pers_personnallist_person
     * const Pers_personnallist_person = await prisma.pers_personnallist_person.delete({
     *   where: {
     *     // ... filter to delete one Pers_personnallist_person
     *   }
     * })
     * 
    **/
    delete<T extends pers_personnallist_personDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, pers_personnallist_personDeleteArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Pers_personnallist_person.
     * @param {pers_personnallist_personUpdateArgs} args - Arguments to update one Pers_personnallist_person.
     * @example
     * // Update one Pers_personnallist_person
     * const pers_personnallist_person = await prisma.pers_personnallist_person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends pers_personnallist_personUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, pers_personnallist_personUpdateArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Pers_personnallist_people.
     * @param {pers_personnallist_personDeleteManyArgs} args - Arguments to filter Pers_personnallist_people to delete.
     * @example
     * // Delete a few Pers_personnallist_people
     * const { count } = await prisma.pers_personnallist_person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends pers_personnallist_personDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, pers_personnallist_personDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pers_personnallist_people.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pers_personnallist_personUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pers_personnallist_people
     * const pers_personnallist_person = await prisma.pers_personnallist_person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends pers_personnallist_personUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, pers_personnallist_personUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pers_personnallist_person.
     * @param {pers_personnallist_personUpsertArgs} args - Arguments to update or create a Pers_personnallist_person.
     * @example
     * // Update or create a Pers_personnallist_person
     * const pers_personnallist_person = await prisma.pers_personnallist_person.upsert({
     *   create: {
     *     // ... data to create a Pers_personnallist_person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pers_personnallist_person we want to update
     *   }
     * })
    **/
    upsert<T extends pers_personnallist_personUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, pers_personnallist_personUpsertArgs<ExtArgs>>
    ): Prisma__pers_personnallist_personClient<$Result.GetResult<Prisma.$pers_personnallist_personPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Pers_personnallist_people.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pers_personnallist_personCountArgs} args - Arguments to filter Pers_personnallist_people to count.
     * @example
     * // Count the number of Pers_personnallist_people
     * const count = await prisma.pers_personnallist_person.count({
     *   where: {
     *     // ... the filter for the Pers_personnallist_people we want to count
     *   }
     * })
    **/
    count<T extends pers_personnallist_personCountArgs>(
      args?: Subset<T, pers_personnallist_personCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pers_personnallist_personCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pers_personnallist_person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pers_personnallist_personAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Pers_personnallist_personAggregateArgs>(args: Subset<T, Pers_personnallist_personAggregateArgs>): Prisma.PrismaPromise<GetPers_personnallist_personAggregateType<T>>

    /**
     * Group by Pers_personnallist_person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pers_personnallist_personGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pers_personnallist_personGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pers_personnallist_personGroupByArgs['orderBy'] }
        : { orderBy?: pers_personnallist_personGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pers_personnallist_personGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPers_personnallist_personGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pers_personnallist_person model
   */
  readonly fields: pers_personnallist_personFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pers_personnallist_person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pers_personnallist_personClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the pers_personnallist_person model
   */ 
  interface pers_personnallist_personFieldRefs {
    readonly id: FieldRef<"pers_personnallist_person", 'String'>
    readonly app_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly bio_tbl_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly company_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly create_time: FieldRef<"pers_personnallist_person", 'DateTime'>
    readonly creater_code: FieldRef<"pers_personnallist_person", 'String'>
    readonly creater_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly creater_name: FieldRef<"pers_personnallist_person", 'String'>
    readonly op_version: FieldRef<"pers_personnallist_person", 'Int'>
    readonly update_time: FieldRef<"pers_personnallist_person", 'DateTime'>
    readonly updater_code: FieldRef<"pers_personnallist_person", 'String'>
    readonly updater_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly updater_name: FieldRef<"pers_personnallist_person", 'String'>
    readonly email: FieldRef<"pers_personnallist_person", 'String'>
    readonly id_card: FieldRef<"pers_personnallist_person", 'String'>
    readonly link_tbl: FieldRef<"pers_personnallist_person", 'String'>
    readonly mobile_phone: FieldRef<"pers_personnallist_person", 'String'>
    readonly person_birthday: FieldRef<"pers_personnallist_person", 'DateTime'>
    readonly person_gender: FieldRef<"pers_personnallist_person", 'String'>
    readonly person_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly person_name: FieldRef<"pers_personnallist_person", 'String'>
    readonly person_pin: FieldRef<"pers_personnallist_person", 'String'>
    readonly personnallist_id: FieldRef<"pers_personnallist_person", 'String'>
    readonly position_name: FieldRef<"pers_personnallist_person", 'String'>
  }
    

  // Custom InputTypes

  /**
   * pers_personnallist_person findUnique
   */
  export type pers_personnallist_personFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * Filter, which pers_personnallist_person to fetch.
     */
    where: pers_personnallist_personWhereUniqueInput
  }


  /**
   * pers_personnallist_person findUniqueOrThrow
   */
  export type pers_personnallist_personFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * Filter, which pers_personnallist_person to fetch.
     */
    where: pers_personnallist_personWhereUniqueInput
  }


  /**
   * pers_personnallist_person findFirst
   */
  export type pers_personnallist_personFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * Filter, which pers_personnallist_person to fetch.
     */
    where?: pers_personnallist_personWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pers_personnallist_people to fetch.
     */
    orderBy?: pers_personnallist_personOrderByWithRelationInput | pers_personnallist_personOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pers_personnallist_people.
     */
    cursor?: pers_personnallist_personWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pers_personnallist_people from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pers_personnallist_people.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pers_personnallist_people.
     */
    distinct?: Pers_personnallist_personScalarFieldEnum | Pers_personnallist_personScalarFieldEnum[]
  }


  /**
   * pers_personnallist_person findFirstOrThrow
   */
  export type pers_personnallist_personFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * Filter, which pers_personnallist_person to fetch.
     */
    where?: pers_personnallist_personWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pers_personnallist_people to fetch.
     */
    orderBy?: pers_personnallist_personOrderByWithRelationInput | pers_personnallist_personOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pers_personnallist_people.
     */
    cursor?: pers_personnallist_personWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pers_personnallist_people from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pers_personnallist_people.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pers_personnallist_people.
     */
    distinct?: Pers_personnallist_personScalarFieldEnum | Pers_personnallist_personScalarFieldEnum[]
  }


  /**
   * pers_personnallist_person findMany
   */
  export type pers_personnallist_personFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * Filter, which pers_personnallist_people to fetch.
     */
    where?: pers_personnallist_personWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pers_personnallist_people to fetch.
     */
    orderBy?: pers_personnallist_personOrderByWithRelationInput | pers_personnallist_personOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pers_personnallist_people.
     */
    cursor?: pers_personnallist_personWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pers_personnallist_people from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pers_personnallist_people.
     */
    skip?: number
    distinct?: Pers_personnallist_personScalarFieldEnum | Pers_personnallist_personScalarFieldEnum[]
  }


  /**
   * pers_personnallist_person create
   */
  export type pers_personnallist_personCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * The data needed to create a pers_personnallist_person.
     */
    data: XOR<pers_personnallist_personCreateInput, pers_personnallist_personUncheckedCreateInput>
  }


  /**
   * pers_personnallist_person createMany
   */
  export type pers_personnallist_personCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pers_personnallist_people.
     */
    data: pers_personnallist_personCreateManyInput | pers_personnallist_personCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * pers_personnallist_person update
   */
  export type pers_personnallist_personUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * The data needed to update a pers_personnallist_person.
     */
    data: XOR<pers_personnallist_personUpdateInput, pers_personnallist_personUncheckedUpdateInput>
    /**
     * Choose, which pers_personnallist_person to update.
     */
    where: pers_personnallist_personWhereUniqueInput
  }


  /**
   * pers_personnallist_person updateMany
   */
  export type pers_personnallist_personUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pers_personnallist_people.
     */
    data: XOR<pers_personnallist_personUpdateManyMutationInput, pers_personnallist_personUncheckedUpdateManyInput>
    /**
     * Filter which pers_personnallist_people to update
     */
    where?: pers_personnallist_personWhereInput
  }


  /**
   * pers_personnallist_person upsert
   */
  export type pers_personnallist_personUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * The filter to search for the pers_personnallist_person to update in case it exists.
     */
    where: pers_personnallist_personWhereUniqueInput
    /**
     * In case the pers_personnallist_person found by the `where` argument doesn't exist, create a new pers_personnallist_person with this data.
     */
    create: XOR<pers_personnallist_personCreateInput, pers_personnallist_personUncheckedCreateInput>
    /**
     * In case the pers_personnallist_person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pers_personnallist_personUpdateInput, pers_personnallist_personUncheckedUpdateInput>
  }


  /**
   * pers_personnallist_person delete
   */
  export type pers_personnallist_personDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
    /**
     * Filter which pers_personnallist_person to delete.
     */
    where: pers_personnallist_personWhereUniqueInput
  }


  /**
   * pers_personnallist_person deleteMany
   */
  export type pers_personnallist_personDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pers_personnallist_people to delete
     */
    where?: pers_personnallist_personWhereInput
  }


  /**
   * pers_personnallist_person without action
   */
  export type pers_personnallist_personDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pers_personnallist_person
     */
    select?: pers_personnallist_personSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Acc_transactionScalarFieldEnum: {
    id: 'id',
    app_id: 'app_id',
    bio_tbl_id: 'bio_tbl_id',
    company_id: 'company_id',
    create_time: 'create_time',
    creater_code: 'creater_code',
    creater_id: 'creater_id',
    creater_name: 'creater_name',
    op_version: 'op_version',
    update_time: 'update_time',
    updater_code: 'updater_code',
    updater_id: 'updater_id',
    updater_name: 'updater_name',
    acc_zone: 'acc_zone',
    acc_zone_code: 'acc_zone_code',
    area_name: 'area_name',
    capture_photo_path: 'capture_photo_path',
    card_no: 'card_no',
    dept_code: 'dept_code',
    dept_name: 'dept_name',
    description: 'description',
    dev_alias: 'dev_alias',
    dev_id: 'dev_id',
    dev_sn: 'dev_sn',
    event_addr: 'event_addr',
    event_name: 'event_name',
    event_no: 'event_no',
    event_point_id: 'event_point_id',
    event_point_name: 'event_point_name',
    event_point_type: 'event_point_type',
    event_priority: 'event_priority',
    event_time: 'event_time',
    last_name: 'last_name',
    log_id: 'log_id',
    mask_flag: 'mask_flag',
    name: 'name',
    pin: 'pin',
    reader_name: 'reader_name',
    reader_state: 'reader_state',
    temperature: 'temperature',
    trigger_cond: 'trigger_cond',
    unique_key: 'unique_key',
    verify_mode_name: 'verify_mode_name',
    verify_mode_no: 'verify_mode_no',
    vid_linkage_handle: 'vid_linkage_handle'
  };

  export type Acc_transactionScalarFieldEnum = (typeof Acc_transactionScalarFieldEnum)[keyof typeof Acc_transactionScalarFieldEnum]


  export const Pers_personnallist_personScalarFieldEnum: {
    id: 'id',
    app_id: 'app_id',
    bio_tbl_id: 'bio_tbl_id',
    company_id: 'company_id',
    create_time: 'create_time',
    creater_code: 'creater_code',
    creater_id: 'creater_id',
    creater_name: 'creater_name',
    op_version: 'op_version',
    update_time: 'update_time',
    updater_code: 'updater_code',
    updater_id: 'updater_id',
    updater_name: 'updater_name',
    email: 'email',
    id_card: 'id_card',
    link_tbl: 'link_tbl',
    mobile_phone: 'mobile_phone',
    person_birthday: 'person_birthday',
    person_gender: 'person_gender',
    person_id: 'person_id',
    person_name: 'person_name',
    person_pin: 'person_pin',
    personnallist_id: 'personnallist_id',
    position_name: 'position_name'
  };

  export type Pers_personnallist_personScalarFieldEnum = (typeof Pers_personnallist_personScalarFieldEnum)[keyof typeof Pers_personnallist_personScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type acc_transactionWhereInput = {
    AND?: acc_transactionWhereInput | acc_transactionWhereInput[]
    OR?: acc_transactionWhereInput[]
    NOT?: acc_transactionWhereInput | acc_transactionWhereInput[]
    id?: StringFilter<"acc_transaction"> | string
    app_id?: StringNullableFilter<"acc_transaction"> | string | null
    bio_tbl_id?: StringNullableFilter<"acc_transaction"> | string | null
    company_id?: StringNullableFilter<"acc_transaction"> | string | null
    create_time?: DateTimeNullableFilter<"acc_transaction"> | Date | string | null
    creater_code?: StringNullableFilter<"acc_transaction"> | string | null
    creater_id?: StringNullableFilter<"acc_transaction"> | string | null
    creater_name?: StringNullableFilter<"acc_transaction"> | string | null
    op_version?: IntNullableFilter<"acc_transaction"> | number | null
    update_time?: DateTimeNullableFilter<"acc_transaction"> | Date | string | null
    updater_code?: StringNullableFilter<"acc_transaction"> | string | null
    updater_id?: StringNullableFilter<"acc_transaction"> | string | null
    updater_name?: StringNullableFilter<"acc_transaction"> | string | null
    acc_zone?: StringNullableFilter<"acc_transaction"> | string | null
    acc_zone_code?: StringNullableFilter<"acc_transaction"> | string | null
    area_name?: StringNullableFilter<"acc_transaction"> | string | null
    capture_photo_path?: StringNullableFilter<"acc_transaction"> | string | null
    card_no?: StringNullableFilter<"acc_transaction"> | string | null
    dept_code?: StringNullableFilter<"acc_transaction"> | string | null
    dept_name?: StringNullableFilter<"acc_transaction"> | string | null
    description?: StringNullableFilter<"acc_transaction"> | string | null
    dev_alias?: StringNullableFilter<"acc_transaction"> | string | null
    dev_id?: StringNullableFilter<"acc_transaction"> | string | null
    dev_sn?: StringNullableFilter<"acc_transaction"> | string | null
    event_addr?: IntNullableFilter<"acc_transaction"> | number | null
    event_name?: StringNullableFilter<"acc_transaction"> | string | null
    event_no?: IntNullableFilter<"acc_transaction"> | number | null
    event_point_id?: StringNullableFilter<"acc_transaction"> | string | null
    event_point_name?: StringNullableFilter<"acc_transaction"> | string | null
    event_point_type?: IntNullableFilter<"acc_transaction"> | number | null
    event_priority?: IntNullableFilter<"acc_transaction"> | number | null
    event_time?: DateTimeNullableFilter<"acc_transaction"> | Date | string | null
    last_name?: StringNullableFilter<"acc_transaction"> | string | null
    log_id?: IntNullableFilter<"acc_transaction"> | number | null
    mask_flag?: StringNullableFilter<"acc_transaction"> | string | null
    name?: StringNullableFilter<"acc_transaction"> | string | null
    pin?: StringNullableFilter<"acc_transaction"> | string | null
    reader_name?: StringNullableFilter<"acc_transaction"> | string | null
    reader_state?: IntNullableFilter<"acc_transaction"> | number | null
    temperature?: StringNullableFilter<"acc_transaction"> | string | null
    trigger_cond?: IntNullableFilter<"acc_transaction"> | number | null
    unique_key?: StringNullableFilter<"acc_transaction"> | string | null
    verify_mode_name?: StringNullableFilter<"acc_transaction"> | string | null
    verify_mode_no?: IntNullableFilter<"acc_transaction"> | number | null
    vid_linkage_handle?: StringNullableFilter<"acc_transaction"> | string | null
  }

  export type acc_transactionOrderByWithRelationInput = {
    id?: SortOrder
    app_id?: SortOrderInput | SortOrder
    bio_tbl_id?: SortOrderInput | SortOrder
    company_id?: SortOrderInput | SortOrder
    create_time?: SortOrderInput | SortOrder
    creater_code?: SortOrderInput | SortOrder
    creater_id?: SortOrderInput | SortOrder
    creater_name?: SortOrderInput | SortOrder
    op_version?: SortOrderInput | SortOrder
    update_time?: SortOrderInput | SortOrder
    updater_code?: SortOrderInput | SortOrder
    updater_id?: SortOrderInput | SortOrder
    updater_name?: SortOrderInput | SortOrder
    acc_zone?: SortOrderInput | SortOrder
    acc_zone_code?: SortOrderInput | SortOrder
    area_name?: SortOrderInput | SortOrder
    capture_photo_path?: SortOrderInput | SortOrder
    card_no?: SortOrderInput | SortOrder
    dept_code?: SortOrderInput | SortOrder
    dept_name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    dev_alias?: SortOrderInput | SortOrder
    dev_id?: SortOrderInput | SortOrder
    dev_sn?: SortOrderInput | SortOrder
    event_addr?: SortOrderInput | SortOrder
    event_name?: SortOrderInput | SortOrder
    event_no?: SortOrderInput | SortOrder
    event_point_id?: SortOrderInput | SortOrder
    event_point_name?: SortOrderInput | SortOrder
    event_point_type?: SortOrderInput | SortOrder
    event_priority?: SortOrderInput | SortOrder
    event_time?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    log_id?: SortOrderInput | SortOrder
    mask_flag?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    pin?: SortOrderInput | SortOrder
    reader_name?: SortOrderInput | SortOrder
    reader_state?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    trigger_cond?: SortOrderInput | SortOrder
    unique_key?: SortOrderInput | SortOrder
    verify_mode_name?: SortOrderInput | SortOrder
    verify_mode_no?: SortOrderInput | SortOrder
    vid_linkage_handle?: SortOrderInput | SortOrder
  }

  export type acc_transactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: acc_transactionWhereInput | acc_transactionWhereInput[]
    OR?: acc_transactionWhereInput[]
    NOT?: acc_transactionWhereInput | acc_transactionWhereInput[]
    app_id?: StringNullableFilter<"acc_transaction"> | string | null
    bio_tbl_id?: StringNullableFilter<"acc_transaction"> | string | null
    company_id?: StringNullableFilter<"acc_transaction"> | string | null
    create_time?: DateTimeNullableFilter<"acc_transaction"> | Date | string | null
    creater_code?: StringNullableFilter<"acc_transaction"> | string | null
    creater_id?: StringNullableFilter<"acc_transaction"> | string | null
    creater_name?: StringNullableFilter<"acc_transaction"> | string | null
    op_version?: IntNullableFilter<"acc_transaction"> | number | null
    update_time?: DateTimeNullableFilter<"acc_transaction"> | Date | string | null
    updater_code?: StringNullableFilter<"acc_transaction"> | string | null
    updater_id?: StringNullableFilter<"acc_transaction"> | string | null
    updater_name?: StringNullableFilter<"acc_transaction"> | string | null
    acc_zone?: StringNullableFilter<"acc_transaction"> | string | null
    acc_zone_code?: StringNullableFilter<"acc_transaction"> | string | null
    area_name?: StringNullableFilter<"acc_transaction"> | string | null
    capture_photo_path?: StringNullableFilter<"acc_transaction"> | string | null
    card_no?: StringNullableFilter<"acc_transaction"> | string | null
    dept_code?: StringNullableFilter<"acc_transaction"> | string | null
    dept_name?: StringNullableFilter<"acc_transaction"> | string | null
    description?: StringNullableFilter<"acc_transaction"> | string | null
    dev_alias?: StringNullableFilter<"acc_transaction"> | string | null
    dev_id?: StringNullableFilter<"acc_transaction"> | string | null
    dev_sn?: StringNullableFilter<"acc_transaction"> | string | null
    event_addr?: IntNullableFilter<"acc_transaction"> | number | null
    event_name?: StringNullableFilter<"acc_transaction"> | string | null
    event_no?: IntNullableFilter<"acc_transaction"> | number | null
    event_point_id?: StringNullableFilter<"acc_transaction"> | string | null
    event_point_name?: StringNullableFilter<"acc_transaction"> | string | null
    event_point_type?: IntNullableFilter<"acc_transaction"> | number | null
    event_priority?: IntNullableFilter<"acc_transaction"> | number | null
    event_time?: DateTimeNullableFilter<"acc_transaction"> | Date | string | null
    last_name?: StringNullableFilter<"acc_transaction"> | string | null
    log_id?: IntNullableFilter<"acc_transaction"> | number | null
    mask_flag?: StringNullableFilter<"acc_transaction"> | string | null
    name?: StringNullableFilter<"acc_transaction"> | string | null
    pin?: StringNullableFilter<"acc_transaction"> | string | null
    reader_name?: StringNullableFilter<"acc_transaction"> | string | null
    reader_state?: IntNullableFilter<"acc_transaction"> | number | null
    temperature?: StringNullableFilter<"acc_transaction"> | string | null
    trigger_cond?: IntNullableFilter<"acc_transaction"> | number | null
    unique_key?: StringNullableFilter<"acc_transaction"> | string | null
    verify_mode_name?: StringNullableFilter<"acc_transaction"> | string | null
    verify_mode_no?: IntNullableFilter<"acc_transaction"> | number | null
    vid_linkage_handle?: StringNullableFilter<"acc_transaction"> | string | null
  }, "id">

  export type acc_transactionOrderByWithAggregationInput = {
    id?: SortOrder
    app_id?: SortOrderInput | SortOrder
    bio_tbl_id?: SortOrderInput | SortOrder
    company_id?: SortOrderInput | SortOrder
    create_time?: SortOrderInput | SortOrder
    creater_code?: SortOrderInput | SortOrder
    creater_id?: SortOrderInput | SortOrder
    creater_name?: SortOrderInput | SortOrder
    op_version?: SortOrderInput | SortOrder
    update_time?: SortOrderInput | SortOrder
    updater_code?: SortOrderInput | SortOrder
    updater_id?: SortOrderInput | SortOrder
    updater_name?: SortOrderInput | SortOrder
    acc_zone?: SortOrderInput | SortOrder
    acc_zone_code?: SortOrderInput | SortOrder
    area_name?: SortOrderInput | SortOrder
    capture_photo_path?: SortOrderInput | SortOrder
    card_no?: SortOrderInput | SortOrder
    dept_code?: SortOrderInput | SortOrder
    dept_name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    dev_alias?: SortOrderInput | SortOrder
    dev_id?: SortOrderInput | SortOrder
    dev_sn?: SortOrderInput | SortOrder
    event_addr?: SortOrderInput | SortOrder
    event_name?: SortOrderInput | SortOrder
    event_no?: SortOrderInput | SortOrder
    event_point_id?: SortOrderInput | SortOrder
    event_point_name?: SortOrderInput | SortOrder
    event_point_type?: SortOrderInput | SortOrder
    event_priority?: SortOrderInput | SortOrder
    event_time?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    log_id?: SortOrderInput | SortOrder
    mask_flag?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    pin?: SortOrderInput | SortOrder
    reader_name?: SortOrderInput | SortOrder
    reader_state?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    trigger_cond?: SortOrderInput | SortOrder
    unique_key?: SortOrderInput | SortOrder
    verify_mode_name?: SortOrderInput | SortOrder
    verify_mode_no?: SortOrderInput | SortOrder
    vid_linkage_handle?: SortOrderInput | SortOrder
    _count?: acc_transactionCountOrderByAggregateInput
    _avg?: acc_transactionAvgOrderByAggregateInput
    _max?: acc_transactionMaxOrderByAggregateInput
    _min?: acc_transactionMinOrderByAggregateInput
    _sum?: acc_transactionSumOrderByAggregateInput
  }

  export type acc_transactionScalarWhereWithAggregatesInput = {
    AND?: acc_transactionScalarWhereWithAggregatesInput | acc_transactionScalarWhereWithAggregatesInput[]
    OR?: acc_transactionScalarWhereWithAggregatesInput[]
    NOT?: acc_transactionScalarWhereWithAggregatesInput | acc_transactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"acc_transaction"> | string
    app_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    bio_tbl_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    company_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    create_time?: DateTimeNullableWithAggregatesFilter<"acc_transaction"> | Date | string | null
    creater_code?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    creater_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    creater_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    op_version?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    update_time?: DateTimeNullableWithAggregatesFilter<"acc_transaction"> | Date | string | null
    updater_code?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    updater_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    updater_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    acc_zone?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    acc_zone_code?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    area_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    capture_photo_path?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    card_no?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    dept_code?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    dept_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    dev_alias?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    dev_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    dev_sn?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    event_addr?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    event_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    event_no?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    event_point_id?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    event_point_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    event_point_type?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    event_priority?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    event_time?: DateTimeNullableWithAggregatesFilter<"acc_transaction"> | Date | string | null
    last_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    log_id?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    mask_flag?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    pin?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    reader_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    reader_state?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    temperature?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    trigger_cond?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    unique_key?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    verify_mode_name?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
    verify_mode_no?: IntNullableWithAggregatesFilter<"acc_transaction"> | number | null
    vid_linkage_handle?: StringNullableWithAggregatesFilter<"acc_transaction"> | string | null
  }

  export type pers_personnallist_personWhereInput = {
    AND?: pers_personnallist_personWhereInput | pers_personnallist_personWhereInput[]
    OR?: pers_personnallist_personWhereInput[]
    NOT?: pers_personnallist_personWhereInput | pers_personnallist_personWhereInput[]
    id?: StringFilter<"pers_personnallist_person"> | string
    app_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    bio_tbl_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    company_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    create_time?: DateTimeNullableFilter<"pers_personnallist_person"> | Date | string | null
    creater_code?: StringNullableFilter<"pers_personnallist_person"> | string | null
    creater_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    creater_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
    op_version?: IntNullableFilter<"pers_personnallist_person"> | number | null
    update_time?: DateTimeNullableFilter<"pers_personnallist_person"> | Date | string | null
    updater_code?: StringNullableFilter<"pers_personnallist_person"> | string | null
    updater_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    updater_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
    email?: StringNullableFilter<"pers_personnallist_person"> | string | null
    id_card?: StringNullableFilter<"pers_personnallist_person"> | string | null
    link_tbl?: StringNullableFilter<"pers_personnallist_person"> | string | null
    mobile_phone?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_birthday?: DateTimeNullableFilter<"pers_personnallist_person"> | Date | string | null
    person_gender?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_pin?: StringNullableFilter<"pers_personnallist_person"> | string | null
    personnallist_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    position_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
  }

  export type pers_personnallist_personOrderByWithRelationInput = {
    id?: SortOrder
    app_id?: SortOrderInput | SortOrder
    bio_tbl_id?: SortOrderInput | SortOrder
    company_id?: SortOrderInput | SortOrder
    create_time?: SortOrderInput | SortOrder
    creater_code?: SortOrderInput | SortOrder
    creater_id?: SortOrderInput | SortOrder
    creater_name?: SortOrderInput | SortOrder
    op_version?: SortOrderInput | SortOrder
    update_time?: SortOrderInput | SortOrder
    updater_code?: SortOrderInput | SortOrder
    updater_id?: SortOrderInput | SortOrder
    updater_name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    id_card?: SortOrderInput | SortOrder
    link_tbl?: SortOrderInput | SortOrder
    mobile_phone?: SortOrderInput | SortOrder
    person_birthday?: SortOrderInput | SortOrder
    person_gender?: SortOrderInput | SortOrder
    person_id?: SortOrderInput | SortOrder
    person_name?: SortOrderInput | SortOrder
    person_pin?: SortOrderInput | SortOrder
    personnallist_id?: SortOrderInput | SortOrder
    position_name?: SortOrderInput | SortOrder
  }

  export type pers_personnallist_personWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: pers_personnallist_personWhereInput | pers_personnallist_personWhereInput[]
    OR?: pers_personnallist_personWhereInput[]
    NOT?: pers_personnallist_personWhereInput | pers_personnallist_personWhereInput[]
    app_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    bio_tbl_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    company_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    create_time?: DateTimeNullableFilter<"pers_personnallist_person"> | Date | string | null
    creater_code?: StringNullableFilter<"pers_personnallist_person"> | string | null
    creater_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    creater_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
    op_version?: IntNullableFilter<"pers_personnallist_person"> | number | null
    update_time?: DateTimeNullableFilter<"pers_personnallist_person"> | Date | string | null
    updater_code?: StringNullableFilter<"pers_personnallist_person"> | string | null
    updater_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    updater_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
    email?: StringNullableFilter<"pers_personnallist_person"> | string | null
    id_card?: StringNullableFilter<"pers_personnallist_person"> | string | null
    link_tbl?: StringNullableFilter<"pers_personnallist_person"> | string | null
    mobile_phone?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_birthday?: DateTimeNullableFilter<"pers_personnallist_person"> | Date | string | null
    person_gender?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
    person_pin?: StringNullableFilter<"pers_personnallist_person"> | string | null
    personnallist_id?: StringNullableFilter<"pers_personnallist_person"> | string | null
    position_name?: StringNullableFilter<"pers_personnallist_person"> | string | null
  }, "id">

  export type pers_personnallist_personOrderByWithAggregationInput = {
    id?: SortOrder
    app_id?: SortOrderInput | SortOrder
    bio_tbl_id?: SortOrderInput | SortOrder
    company_id?: SortOrderInput | SortOrder
    create_time?: SortOrderInput | SortOrder
    creater_code?: SortOrderInput | SortOrder
    creater_id?: SortOrderInput | SortOrder
    creater_name?: SortOrderInput | SortOrder
    op_version?: SortOrderInput | SortOrder
    update_time?: SortOrderInput | SortOrder
    updater_code?: SortOrderInput | SortOrder
    updater_id?: SortOrderInput | SortOrder
    updater_name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    id_card?: SortOrderInput | SortOrder
    link_tbl?: SortOrderInput | SortOrder
    mobile_phone?: SortOrderInput | SortOrder
    person_birthday?: SortOrderInput | SortOrder
    person_gender?: SortOrderInput | SortOrder
    person_id?: SortOrderInput | SortOrder
    person_name?: SortOrderInput | SortOrder
    person_pin?: SortOrderInput | SortOrder
    personnallist_id?: SortOrderInput | SortOrder
    position_name?: SortOrderInput | SortOrder
    _count?: pers_personnallist_personCountOrderByAggregateInput
    _avg?: pers_personnallist_personAvgOrderByAggregateInput
    _max?: pers_personnallist_personMaxOrderByAggregateInput
    _min?: pers_personnallist_personMinOrderByAggregateInput
    _sum?: pers_personnallist_personSumOrderByAggregateInput
  }

  export type pers_personnallist_personScalarWhereWithAggregatesInput = {
    AND?: pers_personnallist_personScalarWhereWithAggregatesInput | pers_personnallist_personScalarWhereWithAggregatesInput[]
    OR?: pers_personnallist_personScalarWhereWithAggregatesInput[]
    NOT?: pers_personnallist_personScalarWhereWithAggregatesInput | pers_personnallist_personScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"pers_personnallist_person"> | string
    app_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    bio_tbl_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    company_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    create_time?: DateTimeNullableWithAggregatesFilter<"pers_personnallist_person"> | Date | string | null
    creater_code?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    creater_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    creater_name?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    op_version?: IntNullableWithAggregatesFilter<"pers_personnallist_person"> | number | null
    update_time?: DateTimeNullableWithAggregatesFilter<"pers_personnallist_person"> | Date | string | null
    updater_code?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    updater_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    updater_name?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    email?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    id_card?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    link_tbl?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    mobile_phone?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    person_birthday?: DateTimeNullableWithAggregatesFilter<"pers_personnallist_person"> | Date | string | null
    person_gender?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    person_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    person_name?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    person_pin?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    personnallist_id?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
    position_name?: StringNullableWithAggregatesFilter<"pers_personnallist_person"> | string | null
  }

  export type acc_transactionCreateInput = {
    id: string
    app_id?: string | null
    bio_tbl_id?: string | null
    company_id?: string | null
    create_time?: Date | string | null
    creater_code?: string | null
    creater_id?: string | null
    creater_name?: string | null
    op_version?: number | null
    update_time?: Date | string | null
    updater_code?: string | null
    updater_id?: string | null
    updater_name?: string | null
    acc_zone?: string | null
    acc_zone_code?: string | null
    area_name?: string | null
    capture_photo_path?: string | null
    card_no?: string | null
    dept_code?: string | null
    dept_name?: string | null
    description?: string | null
    dev_alias?: string | null
    dev_id?: string | null
    dev_sn?: string | null
    event_addr?: number | null
    event_name?: string | null
    event_no?: number | null
    event_point_id?: string | null
    event_point_name?: string | null
    event_point_type?: number | null
    event_priority?: number | null
    event_time?: Date | string | null
    last_name?: string | null
    log_id?: number | null
    mask_flag?: string | null
    name?: string | null
    pin?: string | null
    reader_name?: string | null
    reader_state?: number | null
    temperature?: string | null
    trigger_cond?: number | null
    unique_key?: string | null
    verify_mode_name?: string | null
    verify_mode_no?: number | null
    vid_linkage_handle?: string | null
  }

  export type acc_transactionUncheckedCreateInput = {
    id: string
    app_id?: string | null
    bio_tbl_id?: string | null
    company_id?: string | null
    create_time?: Date | string | null
    creater_code?: string | null
    creater_id?: string | null
    creater_name?: string | null
    op_version?: number | null
    update_time?: Date | string | null
    updater_code?: string | null
    updater_id?: string | null
    updater_name?: string | null
    acc_zone?: string | null
    acc_zone_code?: string | null
    area_name?: string | null
    capture_photo_path?: string | null
    card_no?: string | null
    dept_code?: string | null
    dept_name?: string | null
    description?: string | null
    dev_alias?: string | null
    dev_id?: string | null
    dev_sn?: string | null
    event_addr?: number | null
    event_name?: string | null
    event_no?: number | null
    event_point_id?: string | null
    event_point_name?: string | null
    event_point_type?: number | null
    event_priority?: number | null
    event_time?: Date | string | null
    last_name?: string | null
    log_id?: number | null
    mask_flag?: string | null
    name?: string | null
    pin?: string | null
    reader_name?: string | null
    reader_state?: number | null
    temperature?: string | null
    trigger_cond?: number | null
    unique_key?: string | null
    verify_mode_name?: string | null
    verify_mode_no?: number | null
    vid_linkage_handle?: string | null
  }

  export type acc_transactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone_code?: NullableStringFieldUpdateOperationsInput | string | null
    area_name?: NullableStringFieldUpdateOperationsInput | string | null
    capture_photo_path?: NullableStringFieldUpdateOperationsInput | string | null
    card_no?: NullableStringFieldUpdateOperationsInput | string | null
    dept_code?: NullableStringFieldUpdateOperationsInput | string | null
    dept_name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dev_alias?: NullableStringFieldUpdateOperationsInput | string | null
    dev_id?: NullableStringFieldUpdateOperationsInput | string | null
    dev_sn?: NullableStringFieldUpdateOperationsInput | string | null
    event_addr?: NullableIntFieldUpdateOperationsInput | number | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_no?: NullableIntFieldUpdateOperationsInput | number | null
    event_point_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_type?: NullableIntFieldUpdateOperationsInput | number | null
    event_priority?: NullableIntFieldUpdateOperationsInput | number | null
    event_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    log_id?: NullableIntFieldUpdateOperationsInput | number | null
    mask_flag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    reader_name?: NullableStringFieldUpdateOperationsInput | string | null
    reader_state?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableStringFieldUpdateOperationsInput | string | null
    trigger_cond?: NullableIntFieldUpdateOperationsInput | number | null
    unique_key?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_name?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_no?: NullableIntFieldUpdateOperationsInput | number | null
    vid_linkage_handle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type acc_transactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone_code?: NullableStringFieldUpdateOperationsInput | string | null
    area_name?: NullableStringFieldUpdateOperationsInput | string | null
    capture_photo_path?: NullableStringFieldUpdateOperationsInput | string | null
    card_no?: NullableStringFieldUpdateOperationsInput | string | null
    dept_code?: NullableStringFieldUpdateOperationsInput | string | null
    dept_name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dev_alias?: NullableStringFieldUpdateOperationsInput | string | null
    dev_id?: NullableStringFieldUpdateOperationsInput | string | null
    dev_sn?: NullableStringFieldUpdateOperationsInput | string | null
    event_addr?: NullableIntFieldUpdateOperationsInput | number | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_no?: NullableIntFieldUpdateOperationsInput | number | null
    event_point_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_type?: NullableIntFieldUpdateOperationsInput | number | null
    event_priority?: NullableIntFieldUpdateOperationsInput | number | null
    event_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    log_id?: NullableIntFieldUpdateOperationsInput | number | null
    mask_flag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    reader_name?: NullableStringFieldUpdateOperationsInput | string | null
    reader_state?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableStringFieldUpdateOperationsInput | string | null
    trigger_cond?: NullableIntFieldUpdateOperationsInput | number | null
    unique_key?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_name?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_no?: NullableIntFieldUpdateOperationsInput | number | null
    vid_linkage_handle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type acc_transactionCreateManyInput = {
    id: string
    app_id?: string | null
    bio_tbl_id?: string | null
    company_id?: string | null
    create_time?: Date | string | null
    creater_code?: string | null
    creater_id?: string | null
    creater_name?: string | null
    op_version?: number | null
    update_time?: Date | string | null
    updater_code?: string | null
    updater_id?: string | null
    updater_name?: string | null
    acc_zone?: string | null
    acc_zone_code?: string | null
    area_name?: string | null
    capture_photo_path?: string | null
    card_no?: string | null
    dept_code?: string | null
    dept_name?: string | null
    description?: string | null
    dev_alias?: string | null
    dev_id?: string | null
    dev_sn?: string | null
    event_addr?: number | null
    event_name?: string | null
    event_no?: number | null
    event_point_id?: string | null
    event_point_name?: string | null
    event_point_type?: number | null
    event_priority?: number | null
    event_time?: Date | string | null
    last_name?: string | null
    log_id?: number | null
    mask_flag?: string | null
    name?: string | null
    pin?: string | null
    reader_name?: string | null
    reader_state?: number | null
    temperature?: string | null
    trigger_cond?: number | null
    unique_key?: string | null
    verify_mode_name?: string | null
    verify_mode_no?: number | null
    vid_linkage_handle?: string | null
  }

  export type acc_transactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone_code?: NullableStringFieldUpdateOperationsInput | string | null
    area_name?: NullableStringFieldUpdateOperationsInput | string | null
    capture_photo_path?: NullableStringFieldUpdateOperationsInput | string | null
    card_no?: NullableStringFieldUpdateOperationsInput | string | null
    dept_code?: NullableStringFieldUpdateOperationsInput | string | null
    dept_name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dev_alias?: NullableStringFieldUpdateOperationsInput | string | null
    dev_id?: NullableStringFieldUpdateOperationsInput | string | null
    dev_sn?: NullableStringFieldUpdateOperationsInput | string | null
    event_addr?: NullableIntFieldUpdateOperationsInput | number | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_no?: NullableIntFieldUpdateOperationsInput | number | null
    event_point_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_type?: NullableIntFieldUpdateOperationsInput | number | null
    event_priority?: NullableIntFieldUpdateOperationsInput | number | null
    event_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    log_id?: NullableIntFieldUpdateOperationsInput | number | null
    mask_flag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    reader_name?: NullableStringFieldUpdateOperationsInput | string | null
    reader_state?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableStringFieldUpdateOperationsInput | string | null
    trigger_cond?: NullableIntFieldUpdateOperationsInput | number | null
    unique_key?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_name?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_no?: NullableIntFieldUpdateOperationsInput | number | null
    vid_linkage_handle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type acc_transactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone?: NullableStringFieldUpdateOperationsInput | string | null
    acc_zone_code?: NullableStringFieldUpdateOperationsInput | string | null
    area_name?: NullableStringFieldUpdateOperationsInput | string | null
    capture_photo_path?: NullableStringFieldUpdateOperationsInput | string | null
    card_no?: NullableStringFieldUpdateOperationsInput | string | null
    dept_code?: NullableStringFieldUpdateOperationsInput | string | null
    dept_name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    dev_alias?: NullableStringFieldUpdateOperationsInput | string | null
    dev_id?: NullableStringFieldUpdateOperationsInput | string | null
    dev_sn?: NullableStringFieldUpdateOperationsInput | string | null
    event_addr?: NullableIntFieldUpdateOperationsInput | number | null
    event_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_no?: NullableIntFieldUpdateOperationsInput | number | null
    event_point_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_name?: NullableStringFieldUpdateOperationsInput | string | null
    event_point_type?: NullableIntFieldUpdateOperationsInput | number | null
    event_priority?: NullableIntFieldUpdateOperationsInput | number | null
    event_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    log_id?: NullableIntFieldUpdateOperationsInput | number | null
    mask_flag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    reader_name?: NullableStringFieldUpdateOperationsInput | string | null
    reader_state?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableStringFieldUpdateOperationsInput | string | null
    trigger_cond?: NullableIntFieldUpdateOperationsInput | number | null
    unique_key?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_name?: NullableStringFieldUpdateOperationsInput | string | null
    verify_mode_no?: NullableIntFieldUpdateOperationsInput | number | null
    vid_linkage_handle?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pers_personnallist_personCreateInput = {
    id: string
    app_id?: string | null
    bio_tbl_id?: string | null
    company_id?: string | null
    create_time?: Date | string | null
    creater_code?: string | null
    creater_id?: string | null
    creater_name?: string | null
    op_version?: number | null
    update_time?: Date | string | null
    updater_code?: string | null
    updater_id?: string | null
    updater_name?: string | null
    email?: string | null
    id_card?: string | null
    link_tbl?: string | null
    mobile_phone?: string | null
    person_birthday?: Date | string | null
    person_gender?: string | null
    person_id?: string | null
    person_name?: string | null
    person_pin?: string | null
    personnallist_id?: string | null
    position_name?: string | null
  }

  export type pers_personnallist_personUncheckedCreateInput = {
    id: string
    app_id?: string | null
    bio_tbl_id?: string | null
    company_id?: string | null
    create_time?: Date | string | null
    creater_code?: string | null
    creater_id?: string | null
    creater_name?: string | null
    op_version?: number | null
    update_time?: Date | string | null
    updater_code?: string | null
    updater_id?: string | null
    updater_name?: string | null
    email?: string | null
    id_card?: string | null
    link_tbl?: string | null
    mobile_phone?: string | null
    person_birthday?: Date | string | null
    person_gender?: string | null
    person_id?: string | null
    person_name?: string | null
    person_pin?: string | null
    personnallist_id?: string | null
    position_name?: string | null
  }

  export type pers_personnallist_personUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_card?: NullableStringFieldUpdateOperationsInput | string | null
    link_tbl?: NullableStringFieldUpdateOperationsInput | string | null
    mobile_phone?: NullableStringFieldUpdateOperationsInput | string | null
    person_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    person_gender?: NullableStringFieldUpdateOperationsInput | string | null
    person_id?: NullableStringFieldUpdateOperationsInput | string | null
    person_name?: NullableStringFieldUpdateOperationsInput | string | null
    person_pin?: NullableStringFieldUpdateOperationsInput | string | null
    personnallist_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pers_personnallist_personUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_card?: NullableStringFieldUpdateOperationsInput | string | null
    link_tbl?: NullableStringFieldUpdateOperationsInput | string | null
    mobile_phone?: NullableStringFieldUpdateOperationsInput | string | null
    person_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    person_gender?: NullableStringFieldUpdateOperationsInput | string | null
    person_id?: NullableStringFieldUpdateOperationsInput | string | null
    person_name?: NullableStringFieldUpdateOperationsInput | string | null
    person_pin?: NullableStringFieldUpdateOperationsInput | string | null
    personnallist_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pers_personnallist_personCreateManyInput = {
    id: string
    app_id?: string | null
    bio_tbl_id?: string | null
    company_id?: string | null
    create_time?: Date | string | null
    creater_code?: string | null
    creater_id?: string | null
    creater_name?: string | null
    op_version?: number | null
    update_time?: Date | string | null
    updater_code?: string | null
    updater_id?: string | null
    updater_name?: string | null
    email?: string | null
    id_card?: string | null
    link_tbl?: string | null
    mobile_phone?: string | null
    person_birthday?: Date | string | null
    person_gender?: string | null
    person_id?: string | null
    person_name?: string | null
    person_pin?: string | null
    personnallist_id?: string | null
    position_name?: string | null
  }

  export type pers_personnallist_personUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_card?: NullableStringFieldUpdateOperationsInput | string | null
    link_tbl?: NullableStringFieldUpdateOperationsInput | string | null
    mobile_phone?: NullableStringFieldUpdateOperationsInput | string | null
    person_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    person_gender?: NullableStringFieldUpdateOperationsInput | string | null
    person_id?: NullableStringFieldUpdateOperationsInput | string | null
    person_name?: NullableStringFieldUpdateOperationsInput | string | null
    person_pin?: NullableStringFieldUpdateOperationsInput | string | null
    personnallist_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type pers_personnallist_personUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: NullableStringFieldUpdateOperationsInput | string | null
    bio_tbl_id?: NullableStringFieldUpdateOperationsInput | string | null
    company_id?: NullableStringFieldUpdateOperationsInput | string | null
    create_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    creater_code?: NullableStringFieldUpdateOperationsInput | string | null
    creater_id?: NullableStringFieldUpdateOperationsInput | string | null
    creater_name?: NullableStringFieldUpdateOperationsInput | string | null
    op_version?: NullableIntFieldUpdateOperationsInput | number | null
    update_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updater_code?: NullableStringFieldUpdateOperationsInput | string | null
    updater_id?: NullableStringFieldUpdateOperationsInput | string | null
    updater_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    id_card?: NullableStringFieldUpdateOperationsInput | string | null
    link_tbl?: NullableStringFieldUpdateOperationsInput | string | null
    mobile_phone?: NullableStringFieldUpdateOperationsInput | string | null
    person_birthday?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    person_gender?: NullableStringFieldUpdateOperationsInput | string | null
    person_id?: NullableStringFieldUpdateOperationsInput | string | null
    person_name?: NullableStringFieldUpdateOperationsInput | string | null
    person_pin?: NullableStringFieldUpdateOperationsInput | string | null
    personnallist_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type acc_transactionCountOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    bio_tbl_id?: SortOrder
    company_id?: SortOrder
    create_time?: SortOrder
    creater_code?: SortOrder
    creater_id?: SortOrder
    creater_name?: SortOrder
    op_version?: SortOrder
    update_time?: SortOrder
    updater_code?: SortOrder
    updater_id?: SortOrder
    updater_name?: SortOrder
    acc_zone?: SortOrder
    acc_zone_code?: SortOrder
    area_name?: SortOrder
    capture_photo_path?: SortOrder
    card_no?: SortOrder
    dept_code?: SortOrder
    dept_name?: SortOrder
    description?: SortOrder
    dev_alias?: SortOrder
    dev_id?: SortOrder
    dev_sn?: SortOrder
    event_addr?: SortOrder
    event_name?: SortOrder
    event_no?: SortOrder
    event_point_id?: SortOrder
    event_point_name?: SortOrder
    event_point_type?: SortOrder
    event_priority?: SortOrder
    event_time?: SortOrder
    last_name?: SortOrder
    log_id?: SortOrder
    mask_flag?: SortOrder
    name?: SortOrder
    pin?: SortOrder
    reader_name?: SortOrder
    reader_state?: SortOrder
    temperature?: SortOrder
    trigger_cond?: SortOrder
    unique_key?: SortOrder
    verify_mode_name?: SortOrder
    verify_mode_no?: SortOrder
    vid_linkage_handle?: SortOrder
  }

  export type acc_transactionAvgOrderByAggregateInput = {
    op_version?: SortOrder
    event_addr?: SortOrder
    event_no?: SortOrder
    event_point_type?: SortOrder
    event_priority?: SortOrder
    log_id?: SortOrder
    reader_state?: SortOrder
    trigger_cond?: SortOrder
    verify_mode_no?: SortOrder
  }

  export type acc_transactionMaxOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    bio_tbl_id?: SortOrder
    company_id?: SortOrder
    create_time?: SortOrder
    creater_code?: SortOrder
    creater_id?: SortOrder
    creater_name?: SortOrder
    op_version?: SortOrder
    update_time?: SortOrder
    updater_code?: SortOrder
    updater_id?: SortOrder
    updater_name?: SortOrder
    acc_zone?: SortOrder
    acc_zone_code?: SortOrder
    area_name?: SortOrder
    capture_photo_path?: SortOrder
    card_no?: SortOrder
    dept_code?: SortOrder
    dept_name?: SortOrder
    description?: SortOrder
    dev_alias?: SortOrder
    dev_id?: SortOrder
    dev_sn?: SortOrder
    event_addr?: SortOrder
    event_name?: SortOrder
    event_no?: SortOrder
    event_point_id?: SortOrder
    event_point_name?: SortOrder
    event_point_type?: SortOrder
    event_priority?: SortOrder
    event_time?: SortOrder
    last_name?: SortOrder
    log_id?: SortOrder
    mask_flag?: SortOrder
    name?: SortOrder
    pin?: SortOrder
    reader_name?: SortOrder
    reader_state?: SortOrder
    temperature?: SortOrder
    trigger_cond?: SortOrder
    unique_key?: SortOrder
    verify_mode_name?: SortOrder
    verify_mode_no?: SortOrder
    vid_linkage_handle?: SortOrder
  }

  export type acc_transactionMinOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    bio_tbl_id?: SortOrder
    company_id?: SortOrder
    create_time?: SortOrder
    creater_code?: SortOrder
    creater_id?: SortOrder
    creater_name?: SortOrder
    op_version?: SortOrder
    update_time?: SortOrder
    updater_code?: SortOrder
    updater_id?: SortOrder
    updater_name?: SortOrder
    acc_zone?: SortOrder
    acc_zone_code?: SortOrder
    area_name?: SortOrder
    capture_photo_path?: SortOrder
    card_no?: SortOrder
    dept_code?: SortOrder
    dept_name?: SortOrder
    description?: SortOrder
    dev_alias?: SortOrder
    dev_id?: SortOrder
    dev_sn?: SortOrder
    event_addr?: SortOrder
    event_name?: SortOrder
    event_no?: SortOrder
    event_point_id?: SortOrder
    event_point_name?: SortOrder
    event_point_type?: SortOrder
    event_priority?: SortOrder
    event_time?: SortOrder
    last_name?: SortOrder
    log_id?: SortOrder
    mask_flag?: SortOrder
    name?: SortOrder
    pin?: SortOrder
    reader_name?: SortOrder
    reader_state?: SortOrder
    temperature?: SortOrder
    trigger_cond?: SortOrder
    unique_key?: SortOrder
    verify_mode_name?: SortOrder
    verify_mode_no?: SortOrder
    vid_linkage_handle?: SortOrder
  }

  export type acc_transactionSumOrderByAggregateInput = {
    op_version?: SortOrder
    event_addr?: SortOrder
    event_no?: SortOrder
    event_point_type?: SortOrder
    event_priority?: SortOrder
    log_id?: SortOrder
    reader_state?: SortOrder
    trigger_cond?: SortOrder
    verify_mode_no?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type pers_personnallist_personCountOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    bio_tbl_id?: SortOrder
    company_id?: SortOrder
    create_time?: SortOrder
    creater_code?: SortOrder
    creater_id?: SortOrder
    creater_name?: SortOrder
    op_version?: SortOrder
    update_time?: SortOrder
    updater_code?: SortOrder
    updater_id?: SortOrder
    updater_name?: SortOrder
    email?: SortOrder
    id_card?: SortOrder
    link_tbl?: SortOrder
    mobile_phone?: SortOrder
    person_birthday?: SortOrder
    person_gender?: SortOrder
    person_id?: SortOrder
    person_name?: SortOrder
    person_pin?: SortOrder
    personnallist_id?: SortOrder
    position_name?: SortOrder
  }

  export type pers_personnallist_personAvgOrderByAggregateInput = {
    op_version?: SortOrder
  }

  export type pers_personnallist_personMaxOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    bio_tbl_id?: SortOrder
    company_id?: SortOrder
    create_time?: SortOrder
    creater_code?: SortOrder
    creater_id?: SortOrder
    creater_name?: SortOrder
    op_version?: SortOrder
    update_time?: SortOrder
    updater_code?: SortOrder
    updater_id?: SortOrder
    updater_name?: SortOrder
    email?: SortOrder
    id_card?: SortOrder
    link_tbl?: SortOrder
    mobile_phone?: SortOrder
    person_birthday?: SortOrder
    person_gender?: SortOrder
    person_id?: SortOrder
    person_name?: SortOrder
    person_pin?: SortOrder
    personnallist_id?: SortOrder
    position_name?: SortOrder
  }

  export type pers_personnallist_personMinOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    bio_tbl_id?: SortOrder
    company_id?: SortOrder
    create_time?: SortOrder
    creater_code?: SortOrder
    creater_id?: SortOrder
    creater_name?: SortOrder
    op_version?: SortOrder
    update_time?: SortOrder
    updater_code?: SortOrder
    updater_id?: SortOrder
    updater_name?: SortOrder
    email?: SortOrder
    id_card?: SortOrder
    link_tbl?: SortOrder
    mobile_phone?: SortOrder
    person_birthday?: SortOrder
    person_gender?: SortOrder
    person_id?: SortOrder
    person_name?: SortOrder
    person_pin?: SortOrder
    personnallist_id?: SortOrder
    position_name?: SortOrder
  }

  export type pers_personnallist_personSumOrderByAggregateInput = {
    op_version?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use acc_transactionDefaultArgs instead
     */
    export type acc_transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = acc_transactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use pers_personnallist_personDefaultArgs instead
     */
    export type pers_personnallist_personArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = pers_personnallist_personDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}