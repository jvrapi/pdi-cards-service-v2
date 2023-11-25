import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import newrelic from 'newrelic';

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context);
    const gqlContext = GqlExecutionContext.create(context);
    newrelic.setTransactionName(gqlContext.getContext().req.body.operationName);
    return next.handle();
  }
}
