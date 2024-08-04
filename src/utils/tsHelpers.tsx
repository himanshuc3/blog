
export function assertNonNullish<T>(value: T): asserts value is NonNullable<T> {
    if (value == null || value === undefined) {
        throw new Error(`Value is ${value == null ? "null" : "undefined"}`)
    }
}