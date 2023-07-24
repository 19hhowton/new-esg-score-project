import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user:', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user:', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user:', this.id);
  }
}
