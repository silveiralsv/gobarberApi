import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeuserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createuser = new CreateUserService(
      fakeuserRepository,
      fakeHashProvider,
    );

    const user = await createuser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same e-mail', async () => {
    const fakeuserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createuser = new CreateUserService(
      fakeuserRepository,
      fakeHashProvider,
    );

    await createuser.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@teste.com',
      password: '123456',
    });

    expect(
      createuser.execute({
        name: 'Jhon Doe',
        email: 'jhondoe@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
