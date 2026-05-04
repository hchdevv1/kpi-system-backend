/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  In,
  ObjectLiteral,
} from 'typeorm';

/**
 * Validate single FK reference
 */
export async function validateRefExists<T extends ObjectLiteral>(
  manager: EntityManager,
  entity: EntityTarget<T>,
  id: number | null | undefined,
  fieldName: string,
): Promise<void> {
  if (id === null || id === undefined) return;

  const exists = await manager.findOne(entity, {
    where: { id } as any,
    select: ['id'] as any,
  });

  if (!exists) {
    throw new BadRequestException(`${fieldName} (${id}) not found`);
  }
}

/**
 * Validate multiple FK references (batch)
 */
export async function validateRefsExist<T extends ObjectLiteral>(
  manager: EntityManager,
  entity: EntityTarget<T>,
  ids: number[] | undefined,
  fieldName: string,
): Promise<void> {
  if (!ids?.length) return;

  const uniqueIds = [...new Set(ids)];

  const records = await manager.find(entity, {
    where: { id: In(uniqueIds) } as any,
    select: ['id'] as any,
  });

  const foundIds = records.map((r: any) => r.id);

  const missingIds = uniqueIds.filter((id) => !foundIds.includes(id));

  if (missingIds.length > 0) {
    throw new BadRequestException(
      `${fieldName} not found: [${missingIds.join(', ')}]`,
    );
  }
}

/**
 * Validate nested FK เช่น userRoles[]
 */
export async function validateNestedRefs<T extends ObjectLiteral>(
  manager: EntityManager,
  entity: EntityTarget<T>,
  items: any[] | undefined,
  key: string,
  fieldName: string,
): Promise<void> {
  if (!items?.length) return;

  const ids = items.map((item) => item[key]);

  await validateRefsExist(manager, entity, ids, fieldName);
}