import { Model, ModelStatic, WhereOptions, CreationAttributes } from "@sequelize/core";

export interface IBaseRepository<T extends Model> {
  create(data: CreationAttributes<T>): Promise<T>;
  findById(id: number): Promise<T | null>;
  findOne(options: { where?: WhereOptions<T> }): Promise<T | null>;
  findAll(options?: { where?: WhereOptions<T> }): Promise<T[]>;
  update(id: number, data: Partial<T>): Promise<[affectedCount: number]>;
  delete(id: number): Promise<number>;
}

export class BaseRepository<T extends Model> implements IBaseRepository<T> {
  constructor(public model: ModelStatic<T>) {}
  create(data: CreationAttributes<T>): Promise<T> {
    return this.model.create(data);
  }
  findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }
  findOne(options: { where?: WhereOptions<T> }): Promise<T | null> {
    return this.model.findOne(options);
  }
  findAll(options?: { where?: WhereOptions<T> } | undefined): Promise<T[]> {
    return this.model.findAll(options);
  }
  update(id: number, data: Partial<T>): Promise<[number]> {
    return this.model.update(data, { where: { id } as never });
  }

  delete(id: number): Promise<number> {
    return this.model.destroy({ where: { id } as never });
  }
}
