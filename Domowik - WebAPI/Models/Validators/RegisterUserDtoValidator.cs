using Domowik___WebAPI.Data;
using FluentValidation;

namespace Domowik___WebAPI.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(DomowikDbContext dbContext)
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password)
                .MinimumLength(6)
                .WithMessage("Hasło musi zawierać co najmniej 6 znaków");
            RuleFor(x => x.Password).Equal(e => e.ConfirmPassword).WithMessage("Proszę upewnić się, że wprowadzone hasła są takie same");
            RuleFor(x => x.Email).Custom((value, context) =>
            {
               var emailInUse = dbContext.Users.Any(u => u.Email == value);

               if (emailInUse)
                {
                    context.AddFailure("Email", "Podany adres email jest zajęty");
                }
            });
        }
    }
}
