import { Type } from '@nestjs/common';

export type MockType<T> = {
  [K in keyof T]?: jest.Mock;
};

export function mockClass<T>(clazz: Type<T>): MockType<T> {
  const mockValue: MockType<T> = {};
  Reflect.ownKeys(clazz.prototype)
    .filter((key) => key !== 'constructor')
    .forEach((key) => (mockValue[key as any] = jest.fn()));

  return { ...mockValue };
}
