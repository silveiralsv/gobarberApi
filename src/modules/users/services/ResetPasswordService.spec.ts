// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepo: FakeUserRepository;
let fakeUserTokenRepo: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepo = new FakeUserRepository();
    fakeUserTokenRepo = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepo,
      fakeUserTokenRepo,
    );
  });
  it('should be able to reset the password using an token', async () => {
    const user = await fakeUserRepo.create({
      name: 'Lucas Silveira Vieira',
      email: 'testunitario@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepo.generate(user.id);

    await resetPasswordService.execute({
      token,
      password: '123123',
    });

    const updatedUser = await fakeUserRepo.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
