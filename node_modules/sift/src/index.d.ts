import { Query, Options, createQueryTester, EqualsOperation, createQueryOperation, createEqualsOperation, createOperationTester } from "./core";
declare const createDefaultQueryOperation: <TItem, TSchema extends TItem = TItem>(query: Query<TSchema>, ownerQuery: any, { compare, operations }?: Partial<Options>) => import("./core").QueryOperation<unknown>;
declare const createDefaultQueryTester: <TItem, TSchema extends TItem = TItem>(query: Query<TSchema>, options?: Partial<Options>) => (item: unknown, key?: import("./utils").Key, owner?: any) => boolean;
export { Query, EqualsOperation, createQueryTester, createOperationTester, createDefaultQueryOperation, createEqualsOperation, createQueryOperation };
export * from "./operations";
export default createDefaultQueryTester;
