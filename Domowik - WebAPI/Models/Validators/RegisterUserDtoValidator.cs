using Domowik___WebAPI.Data;
using FluentValidation;

namespace Domowik___WebAPI.Models.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserDtoValidator(DomowikDbContext dbContext)
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).MinimumLength(6);
            RuleFor(x => x.ConfirmPassword).Equal(e => e.Password);
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
