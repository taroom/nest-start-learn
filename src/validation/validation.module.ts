import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';

/* dynamic module */
@Module({})

export class ValidationModule {
  static forRoot(isGlobal: boolean): DynamicModule {
    return {
      global: isGlobal,
      module: ValidationModule,
      providers: [ValidationService],
      exports: [ValidationService]
    }
  }
}

/* static module */
// @Module({
//   providers: [ValidationService]
// })
// export class ValidationModule {}
