export class KpiResultCalculator {

  static calculate(
    numerator: number,
    denominator?: number | null,
    multiplier: number = 1,
  ) {
    const safeDenominator = denominator ?? 0;

    let calculatedValue = 0;

    if (safeDenominator === 0) {
      calculatedValue = numerator * multiplier;
    } else {
      calculatedValue = (numerator / safeDenominator) * multiplier;
    }

    return {
      calculatedValue,
      pass: true, // 🔥 TEMPORARY (Phase 1)
    };
  }
}