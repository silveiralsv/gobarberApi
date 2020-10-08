import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepo: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepo = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepo,
      fakeHashProvider,
    );
  });
  it('should be able to recover the password using the e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUserRepo.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    await forgotPasswordService.execute({ email: user.email });
    expect(sendMail).toHaveBeenCalled();
  });
});
