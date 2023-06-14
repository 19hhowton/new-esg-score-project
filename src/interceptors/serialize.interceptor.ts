import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Purpose: Create a Type for dto. The Type is just a class. Replace "(dto: any)" with "(dto: ClassConstructor)"
interface ClassConstructor {
  new (...args: any[]): {};
}

// Purpose: Wrap a long decorator inside of a simpler named decorator, Serialize.
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        // If you face issues here, replace plainToClass to plainToInstance.
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

// export class SerializeInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
//     // Run something before request is handled by request handler
//     console.log('Im running before the handler', context);

//     return handler.handle().pipe(
//       map((data: any) => {
//         console.log('Im running before response is sent out', data);
//       }),
//     );
//   }
// }
