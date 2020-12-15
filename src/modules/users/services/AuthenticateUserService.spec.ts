import AuthenticateUserService from './AuthenticateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';

// describe criar como uma "Categoria para os testes"
describe('AuthenticateUser', () => {
  it('should be able to authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new AuthenticateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
