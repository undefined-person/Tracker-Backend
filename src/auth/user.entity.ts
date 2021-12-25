import { hash } from 'argon2'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  hashedRt: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password)
  }
}
