import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

// describe criar como uma "Categoria para os testes"
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndow@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndow@example.com');
  });

  it('should not be able to show the for a non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
