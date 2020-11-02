export function ValueFormater(value) {
    var finalValue =
        Math.abs(Number(value)) >= 1.0e9
            ? Math.abs(Number(value)) / 1.0e9 + " B"
            : Math.abs(Number(value)) >= 1.0e6
                ? Math.abs(Number(value)) / 1.0e6 + " M"
                : Math.abs(Number(value)) >= 1.0e3
                    ? Math.abs(Number(value)) / 1.0e3 + " K"
                    : Math.abs(Number(value));

    return parseFloat(finalValue).toPrecision(4) + finalValue.replace(/[^ B| M| K]/g, "");
}
