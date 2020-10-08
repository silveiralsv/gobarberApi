import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotenPasswordEmailService';

let fakeUserRepo: FakeUserRepository;
let fakeUserTokenRepo: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let forgotPasswordService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepo = new FakeUserRepository();
    fakeUserTokenRepo = new FakeUserTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    forgotPasswordService = new SendForgotPasswordEmailService(
      fakeUserRepo,
      fakeMailProvider,
      fakeUserTokenRepo,
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

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      forgotPasswordService.execute({
        email: 'silveira.lsv@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokenRepo, 'generate');

    const user = await fakeUserRepo.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password: '123456',
    });

    await forgotPasswordService.execute({ email: user.email });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
