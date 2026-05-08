import { Injectable, BadRequestException } from '@nestjs/common';
import { CODE_FORMAT, CodeType } from '../constants/code-format';

@Injectable()
export class CodeGeneratorService {
  /**
   * 🔹 generate แบบ custom
   */
  generate(prefix: string, lastCode?: string, pad = 3): string {
    let nextNumber = 1;

    if (lastCode) {
      // ✅ validate prefix
      if (!lastCode.startsWith(prefix)) {
        throw new BadRequestException(
          `Invalid code format: ${lastCode}`,
        );
      }

      const numericPart = lastCode.replace(prefix, '');
      const num = parseInt(numericPart, 10);

      // ✅ validate number
      if (isNaN(num)) {
        throw new BadRequestException(
          `Invalid numeric part in code: ${lastCode}`,
        );
      }

      nextNumber = num + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(pad, '0')}`;
  }

    generateByType(type: CodeType, lastCode?: string): string {
    const config = CODE_FORMAT[type];

    if (!config) {
      throw new BadRequestException(`Unknown code type: ${type}`);
    }

    return this.generate(config.prefix, lastCode, config.pad);
  }

}