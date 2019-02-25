export function classNames(
    ...classes: Array<null | undefined | string | {[key: string]: (() => boolean) | boolean | null | undefined}>
): string {
    return classes
        .reduce((acc: string[], item) => {
            if (item === undefined || item === null) {
                return acc;
            }

            if (typeof item === 'string') {
                return [...acc, item];
            }

            if (typeof item === 'object') {
                const objClasses = Object.keys(item).reduce((objAcc: string[], key) => {
                    const boolResolver = item[key];
                    const boolResolverResult = typeof boolResolver === 'function' ? boolResolver() : boolResolver;
                    if (!!boolResolverResult) {
                        return [...objAcc, key];
                    }
                    return objAcc;
                }, []);

                return [...acc, ...objClasses];
            }

            return acc;
        }, [])
        .join(' ');
}
